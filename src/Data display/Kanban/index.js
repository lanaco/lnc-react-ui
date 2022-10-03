import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal, unstable_batchedUpdates } from "react-dom";
import PropTypes from "prop-types";
import {
  getColorRgbaValue,
  getCustomRender,
  getCustomRenderById,
  renderCustomElement,
} from "../../_utils/utils";
import { useTheme } from "@emotion/react";

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
import { findIndex, cloneDeep } from "lodash";
import { useEffectOnce, useUpdate, useUpdateEffect } from "react-use";
import { KanbanHeader } from "./components/KanbanHeader/KanbanHeader";
import { KanbanCard } from "./components/KanbanCard/KanbanCard";

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

const getColor = (color, theme) => {
  if (color) {
    return getColorRgbaValue(
      theme,
      "KanbanCard",
      color,
      "enabled",
      "highlight"
    );
  }
  return undefined;
};

const DroppableContainer = ({
  children,
  containerId,
  columns = 1,
  disabled,
  id,
  items,
  className,
  renderFooterContent,
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
      className={className}
      hover={isOverContainer}
      handleProps={{
        ...attributes,
        ...listeners,
      }}
      // columns={columns}
      containerId={containerId}
      renderFooterContent={renderFooterContent}
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
  // handle,
  renderItem,
  style = {},
  containerId,
  getIndex,
  wrapperStyle,
  cardProps,
  theme,
  renderContent,
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

    attributes,
  } = useSortable({
    id,
  });

  const mounted = useMountStatus();
  const mountedWhileDragging = isDragging && !mounted;

  return (
    <Item
      ref={disabled ? undefined : setNodeRef}
      cardProps={cardProps}
      value={id}
      dragging={isDragging}
      sorting={isSorting}
      handle={cardProps?.handle === false ? false : true}
      handleProps={{
        ...attributes,
        ...listeners,
      }}

      index={index}
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
      color={getColor(item?.color, theme)}
      transition={transition}
      transform={transform}
      fadeIn={mountedWhileDragging}
      listeners={listeners}
      renderItem={renderItem}
    >
      {renderContent(item?.content)}
    </Item>
  );
};

const Kanban = React.forwardRef((props, ref) => {
  //================== PROPS =====================
  const {
    adjustScale = false,
    itemCount = 5,
    cancelDrop,
    columns,
    handle = false,
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

    cardProps,
    headerProps,
    //---------------------------
    data = [],
    columnInfo = {},
    onColumnMoved,
    onCardMoved,
    onCardChangedColumns,
    //---------------------------
    children,
    ...rest
  } = props;

  const theme = useTheme();

  //================== STATE =====================

  const [items, setItems] = useState(
    () =>
      data ?? {
        A: createRange(itemCount, (index) => `A${index + 1}`),
        B: createRange(itemCount, (index) => `B${index + 1}`),
      }
  );

  const [containers, setContainers] = useState(Object.keys(data));
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

  useEffectOnce(() => {
    setItems(data);
    setContainers(Object.keys(data));
  });

  useUpdateEffect(() => {
    setItems(data);
    setContainers(Object.keys(data));
  }, [data]);

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
    var columnReorder = false;
    var cachedItems = cloneDeep(items);

    if (active.id in items && over?.id) {
      setContainers((containers) => {
        columnReorder = true;
        const activeIndex = containers.indexOf(active.id);
        const overIndex = containers.indexOf(over.id);
        var newContainers = arrayMove(containers, activeIndex, overIndex);

        if (active.id !== over.id) {
          onColumnMoved(event, newContainers);
        }

        return newContainers;
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

    if (!columnReorder) {
      var prevCol,
        currCol = null;

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

      if (prevCol === currCol && prevIndex !== newIndex) {
        onCardMoved(event, cachedItems, currCol);
      }

      if (prevCol !== currCol) {
        onCardChangedColumns(event, cachedItems, currCol, prevCol);
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
        value={id}
        handle={handle}
        cardProps={cardProps}
        style={getItemStyles({
          containerId: findContainer(id),
          overIndex: -1,
          index: getIndex(id),
          value: id,
          isSorting: true,
          isDragging: true,
          isDragOverlay: true,
        })}
        color={getColor(item?.color, theme)}
        wrapperStyle={wrapperStyle({ index: 0 })}
        renderItem={renderItem}
        dragOverlay
      >
        {renderKanbanCard(item?.content) || { name: id }}
      </Item>
    );
  };

  const renderContainerDragOverlay = (containerId) => {
    return (
      <Container
        label={renderKanbanHeader(containerId)}
        columns={columns}
        style={{
          height: "100%",
        }}
        shadow
        unstyled={false}
        containerId={containerId}
        renderFooterContent={renderKanbanFooter}
      >
        {items[containerId].map((item, index) => (
          <Item
            cardProps={cardProps}
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
            color={getColor(item?.color, theme)}
            wrapperStyle={wrapperStyle({ index })}
            renderItem={renderItem}
          >
            {renderKanbanCard(item?.content)}
          </Item>
        ))}
      </Container>
    );
  };

  const renderKanbanHeader = (containerId) => {
    return (
      renderCustomElement(
        getCustomRenderById("KANBAN_HEADER", containerId, children),
        {
          ...headerProps,
        },
        null
      ) || renderCustomElement(
        getCustomRenderById("KANBAN_HEADER", null, children),
        {
          ...headerProps,
        },
        null
      ) || (
        <KanbanHeader id={containerId} {...headerProps}>
          {containerId}
        </KanbanHeader>
      )
    );
  };

  const renderKanbanFooter = (containerId) => {
    return (
      renderCustomElement(
        getCustomRenderById("KANBAN_FOOTER", containerId, children),
        {
          ...headerProps,
        },
        null
      ) || renderCustomElement(
        getCustomRenderById("KANBAN_FOOTER", null, children),
        {
          ...headerProps,
        },
        null
      ) 
    );
  };

  const renderKanbanCard = (content) => {
    return (
      renderCustomElement(
          getCustomRender("KANBAN_CARD", children),
          {
            ...cardProps
          },
          content,
          true
        ) || (
          <KanbanCard {...cardProps}>
            {content}
          </KanbanCard>
        )
      );
  };

  return (
    <ComponentContainer ref={ref} {...rest}>
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
                label={minimal ? undefined : renderKanbanHeader(containerId)}
                // columns={columns}
                items={items[containerId]}
                scrollable={scrollable}
                style={containerStyle}
                unstyled={minimal}
                containerId={containerId}
                renderFooterContent={renderKanbanFooter}
                {...headerProps}
              >
                <SortableContext items={items[containerId]} strategy={strategy}>
                  {items[containerId].map((item, index) => {
                    return (
                      <SortableItem
                        disabled={isSortingContainer || item?.disabled}
                        key={item.id}
                        id={item.id}
                        item={item}
                        index={index}
                        // handle={handle}
                        style={getItemStyles}
                        wrapperStyle={wrapperStyle}
                        renderItem={renderItem}
                        containerId={containerId}
                        getIndex={getIndex}
                        cardProps={cardProps}
                        theme={theme}
                        renderContent={renderKanbanCard}
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
});

Kanban.defaultProps = {
  getItemStyles: (s) => ({ ...s }),
  wrapperStyle: (s) => ({ ...s }),
  //---------------------
  onCardChangedColumns: (event, cachedItems, column, previousColumn) => { },
  onColumnMoved: (e, columns) => { },
  onCardMoved: (e, items, column) => { },
  //-----------------------------------------
  className: "",
  stlye: {},
};

Kanban.propTypes = {
  adjustScale: PropTypes.bool,
  //Number of items in container
  itemCount: PropTypes.bool,
  cancelDrop: PropTypes.func,
  // columns,
  handle: PropTypes.bool,
  // containerStyle,
  // coordinateGetter = multipleContainersCoordinateGetter,
  getItemStyles: PropTypes.func,
  wrapperStyle: PropTypes.func,
  minimal: PropTypes.bool,
  // modifiers,
  renderItem: PropTypes.func,
  // strategy = verticalListSortingStrategy,
  vertical: PropTypes.bool,
  scrollable: PropTypes.bool,
  cardProps: PropTypes.any,
  headerProps: PropTypes.any,
  //---------------------------
  /**
   * Type of:
   * { < string | number >:
   * array[{ id< string | number >,
   * name< string >,
   *  content< element >,
   * color< "primary" | "secondary" | "danger" | "warning" | "information" | "neutral" >]}] }
   */
  data: PropTypes.object,
  columnInfo: PropTypes.object,
  onColumnMoved: PropTypes.func,
  onCardMoved: PropTypes.func,
  onCardChangedColumns: PropTypes.func,
  //----------------
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Kanban;
