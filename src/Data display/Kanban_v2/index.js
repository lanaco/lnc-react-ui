import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal, unstable_batchedUpdates } from "react-dom";

import {
  CancelDrop,
  closestCenter,
  pointerWithin,
  rectIntersection,
  CollisionDetection,
  DndContext,
  DragOverlay,
  DropAnimation,
  getFirstCollision,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  Modifiers,
  useDroppable,
  useSensors,
  useSensor,
  MeasuringStrategy,
  KeyboardCoordinateGetter,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";

import {
  AnimateLayoutChanges,
  SortableContext,
  useSortable,
  arrayMove,
  defaultAnimateLayoutChanges,
  verticalListSortingStrategy,
  SortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { coordinateGetter as multipleContainersCoordinateGetter } from "./utilities";
import { Item } from "./components/Item/Item";
import { Container } from "./components/Container/Container";
import { createRange } from "./utilities";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { findIndex, cloneDeep } from "lodash";

//============== STYLES ==================================================

const ComponentContainer = styled.div``;

const DragAndDropArea = styled.div`
  display: inline-grid;
  box-sizing: border-box;
  padding: 20px;
  grid-auto-flow: ${(props) => (props.vertical ? "row" : "column")};
`;

//========================================================================

const animateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true });

const dropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

const PLACEHOLDER_ID = "placeholder";

const useMountStatus = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 500);

    return () => clearTimeout(timeout);
  }, []);

  return isMounted;
};

const getColor = (id) => {
  switch (String(id)[0]) {
    case "A":
      return "#7193f1";
    case "B":
      return "#ffda6c";
    case "C":
      return "#00bcd4";
    case "D":
      return "#ef769f";
  }

  return undefined;
};

const DroppableContainer = ({
  children,
  columns = 1,
  disabled,
  id,
  items,
  style,
  ...props
}) => {
  const {
    active,
    attributes,
    isDragging,
    listeners,
    over,
    setNodeRef,
    transition,
    transform,
  } = useSortable({
    id,
    data: {
      type: "container",
      children: items,
    },
    animateLayoutChanges,
  });

  const isOverContainer = over
    ? (id === over.id && active?.data.current?.type !== "container") ||
      items.includes(over.id)
    : false;

  return (
    <Container
      ref={disabled ? undefined : setNodeRef}
      style={{
        ...style,
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : undefined,
      }}
      hover={isOverContainer}
      handleProps={{
        ...attributes,
        ...listeners,
      }}
      columns={columns}
      {...props}
    >
      {children}
    </Container>
  );
};

const SortableItem = ({
  disabled,
  id,
  item,
  index,
  handle,
  renderItem,
  style = {},
  containerId,
  getIndex,
  wrapperStyle,
}) => {
  const {
    setNodeRef,
    setActivatorNodeRef,
    listeners,
    isDragging,
    isSorting,
    over,
    overIndex,
    transform,
    transition,
  } = useSortable({
    id,
  });

  const mounted = useMountStatus();
  const mountedWhileDragging = isDragging && !mounted;

  return (
    <Item
      ref={disabled ? undefined : setNodeRef}
      value={id}
      dragging={isDragging}
      sorting={isSorting}
      handle={handle}
      handleProps={handle ? { ref: setActivatorNodeRef } : undefined}
      index={index}
      item={item}
      wrapperStyle={wrapperStyle({ index })}
      style={{
        ...style,
        index,
        value: id,
        isDragging,
        isSorting,
        overIndex: over ? getIndex(over.id) : overIndex,
        containerId,
      }}
      color={getColor(id)}
      transition={transition}
      transform={transform}
      fadeIn={mountedWhileDragging}
      listeners={listeners}
      renderItem={renderItem}
    />
  );
};

const KanbanV2 = (props) => {
  //================== PROPS =====================

  const theme = useTheme();

  const {
    adjustScale = false,
    itemCount = 5,
    cancelDrop,
    columns,
    handle = false,
    items: initialItems,
    containerStyle,
    coordinateGetter = multipleContainersCoordinateGetter,
    getItemStyles = (s) => ({ ...s }),
    wrapperStyle = (s) => ({ ...s }),
    minimal = false,
    modifiers,
    renderItem,
    strategy = verticalListSortingStrategy,
    vertical = false,
    scrollable,
    //---------------------------
    data = [],
    columnInfo = {},
    onColumnMoved,
    onCardMoved,
    onCardChangedColumns,
    //---------------------------
    size,
    color,
  } = props;

  const themeProps = { theme, size, color };

  //================== STATE =====================

  const [items, setItems] = useState(
    () =>
      data ?? {
        A: createRange(itemCount, (index) => `A${index + 1}`),
        B: createRange(itemCount, (index) => `B${index + 1}`),
      }
  );

  const [containers, setContainers] = useState(Object.keys(items));
  const [activeId, setActiveId] = useState(null);

  const lastOverId = useRef(null);
  const recentlyMovedToNewContainer = useRef(false);

  const isSortingContainer = activeId ? containers.includes(activeId) : false;

  /**
   * Custom collision detection strategy optimized for multiple containers
   *
   * - First, find any droppable containers intersecting with the pointer.
   * - If there are none, find intersecting containers with the active draggable.
   * - If there are no intersecting containers, return the last matched intersection
   *
   */
  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeId && activeId in items) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => container.id in items
          ),
        });
      }

      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args);
      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
            pointerIntersections
          : rectIntersection(args);
      let overId = getFirstCollision(intersections, "id");

      if (overId != null) {
        if (overId in items) {
          const containerItems = items[overId];

          // If a container is matched and it contains items (columns 'A', 'B', 'C')
          if (containerItems.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId &&
                  containerItems.map((x) => x.id).includes(container.id)
              ),
            })[0]?.id;
          }
        }

        lastOverId.current = overId;

        return [{ id: overId }];
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId;
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeId, items]
  );

  const [clonedItems, setClonedItems] = useState([]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter,
    })
  );

  //================== LIFECYCLE =====================

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);

  //================== METHODS =====================

  const findContainer = (id) => {
    if (id in items) return id;

    return Object.keys(items).find((key) =>
      items[key].map((x) => x.id).includes(id)
    );
  };

  const getIndex = (id) => {
    const container = findContainer(id);

    if (!container) return -1;

    return findIndex(items[container], (x) => x.id == id);
  };

  //================== EVENTS =====================

  const onDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containers
      setItems(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  const onDragStart = (event) => {
    setActiveId(event.active.id);
    setClonedItems(items);
  };

  const odDragOver = (event) => {
    const { active, over } = event;

    const overId = over?.id;

    if (overId == null || active.id in items) {
      return;
    }

    const overContainer = findContainer(overId);
    const activeContainer = findContainer(active.id);

    if (!overContainer || !activeContainer) return;

    if (activeContainer !== overContainer) {
      setItems((items) => {
        const activeItems = items[activeContainer];
        const overItems = items[overContainer];
        const overIndex = findIndex(overItems, (x) => x.id == overId);
        const activeIndex = findIndex(activeItems, (x) => x.id == active.id);

        let newIndex;

        if (overId in items) {
          newIndex = overItems.length + 1;
        } else {
          const isBelowOverItem =
            over &&
            active.rect.current.translated &&
            active.rect.current.translated.top >
              over.rect.top + over.rect.height;

          const modifier = isBelowOverItem ? 1 : 0;

          newIndex =
            overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
        }

        onCardChangedColumns(active.id);
        recentlyMovedToNewContainer.current = true;

        return {
          ...items,
          [activeContainer]: items[activeContainer].filter(
            (item) => item.id != active.id
          ),
          [overContainer]: [
            ...items[overContainer].slice(0, newIndex),
            items[activeContainer][activeIndex],
            ...items[overContainer].slice(
              newIndex,
              items[overContainer].length
            ),
          ],
        };
      });
    }
  };

  const onDragEnd = (event) => {
    const { active, over } = event;

    const columnReorder = false;
    var cachedItems = cloneDeep(items);

    if (active.id in items && over?.id) {
      setContainers((containers) => {
        columnReorder = true;
        const activeIndex = containers.indexOf(active.id);
        const overIndex = containers.indexOf(over.id);
        var mewContainers = arrayMove(containers, activeIndex, overIndex);

        if (active.id !== over.id) onColumnMoved(active.id);

        return mewContainers;
      });
    }

    const activeContainer = findContainer(active.id);

    if (!activeContainer) {
      setActiveId(null);
      return;
    }

    const overId = over?.id;

    if (overId == null) {
      setActiveId(null);
      return;
    }

    const overContainer = findContainer(overId);

    if (overContainer) {
      const activeIndex = findIndex(
        items[activeContainer],
        (x) => x.id == active.id
      );

      const overIndex = findIndex(items[overContainer], (x) => x.id == overId);

      if (activeIndex !== overIndex) {
        onCardMoved(active.id);

        cachedItems = {
          ...cachedItems,
          [overContainer]: arrayMove(
            cachedItems[overContainer],
            activeIndex,
            overIndex
          ),
        };

        setItems((items) => ({
          ...items,
          [overContainer]: arrayMove(
            items[overContainer],
            activeIndex,
            overIndex
          ),
        }));
      }
    }

    // Calculate triggering some kind of save method
    if (!columnReorder) {
      var prevCol = null;
      var currCol = null;

      var prevIndex,
        newIndex = -1;

      var clonedItemsKeys = Object.keys(clonedItems);
      var itemsKeys = Object.keys(cachedItems);

      clonedItemsKeys.forEach((c) => {
        if (
          clonedItems[c]
            .map((i) => i.id.toString())
            .includes(active.id.toString())
        ) {
          prevCol = c;
          prevIndex = findIndex(clonedItems[c], (a) => a.id == active.id);
          return;
        }
      });

      itemsKeys.forEach((c) => {
        if (
          cachedItems[c]
            .map((i) => i.id.toString())
            .includes(active.id.toString())
        ) {
          currCol = c;
          newIndex = findIndex(cachedItems[c], (a) => a.id == active.id);
          return;
        }
      });

      if (prevCol == currCol) {
        if (prevIndex !== newIndex) console.log("Just reorder");
      } else {
        console.log("New column");
      }
    }

    setActiveId(null);
  };

  //================== RENDER =====================

  const renderSortableItemDragOverlay = (id) => {
    var item = null;

    containers.forEach((columnId) => {
      items[columnId].forEach((i) => {
        if (i.id == id) {
          item = i;
          return;
        }
      });
    });

    return (
      <Item
        item={item || { name: id }}
        value={id}
        handle={handle}
        style={getItemStyles({
          containerId: findContainer(id),
          overIndex: -1,
          index: getIndex(id),
          value: id,
          isSorting: true,
          isDragging: true,
          isDragOverlay: true,
        })}
        color={getColor(id)}
        wrapperStyle={wrapperStyle({ index: 0 })}
        renderItem={renderItem}
        dragOverlay
      />
    );
  };

  const renderContainerDragOverlay = (containerId) => {
    return (
      <Container
        label={`Column ${containerId}`}
        columns={columns}
        style={{
          height: "100%",
        }}
        shadow
        unstyled={false}
      >
        {items[containerId].map((item, index) => (
          <Item
            item={item}
            key={item.id}
            value={item.id}
            handle={handle}
            style={getItemStyles({
              containerId,
              overIndex: -1,
              index: getIndex(item),
              value: item,
              isDragging: false,
              isSorting: false,
              isDragOverlay: false,
            })}
            color={getColor(item.id)}
            wrapperStyle={wrapperStyle({ index })}
            renderItem={renderItem}
          />
        ))}
      </Container>
    );
  };

  return (
    <ComponentContainer>
      <DndContext
        measuring={{
          droppable: {
            strategy: MeasuringStrategy.Always,
          },
        }}
        sensors={sensors}
        collisionDetection={collisionDetectionStrategy}
        modifiers={modifiers}
        cancelDrop={cancelDrop}
        onDragCancel={onDragCancel}
        onDragStart={onDragStart}
        onDragOver={odDragOver}
        onDragEnd={onDragEnd}
      >
        <DragAndDropArea vertical={vertical}>
          <SortableContext
            items={[...containers]}
            strategy={
              vertical
                ? verticalListSortingStrategy
                : horizontalListSortingStrategy
            }
          >
            {containers.map((containerId) => (
              <DroppableContainer
                key={containerId}
                id={containerId}
                label={minimal ? undefined : `Column ${containerId}`}
                columns={columns}
                items={items[containerId]}
                scrollable={scrollable}
                style={containerStyle}
                unstyled={minimal}
              >
                <SortableContext items={items[containerId]} strategy={strategy}>
                  {items[containerId].map((item, index) => {
                    return (
                      <SortableItem
                        disabled={isSortingContainer}
                        key={item.id}
                        id={item.id}
                        item={item}
                        index={index}
                        handle={handle}
                        style={getItemStyles}
                        wrapperStyle={wrapperStyle}
                        renderItem={renderItem}
                        containerId={containerId}
                        getIndex={getIndex}
                      />
                    );
                  })}
                </SortableContext>
              </DroppableContainer>
            ))}
          </SortableContext>
        </DragAndDropArea>

        {createPortal(
          <DragOverlay adjustScale={adjustScale} dropAnimation={dropAnimation}>
            {activeId
              ? containers.includes(activeId)
                ? renderContainerDragOverlay(activeId)
                : renderSortableItemDragOverlay(activeId)
              : null}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </ComponentContainer>
  );
};

export default KanbanV2;
