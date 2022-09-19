import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Card from "./Card";

const Container = styled.div`
  padding: 8px;
  border-radius: 8px;
  background-color: #ededed;
  width: 200px;
  height: fit-content;
  transition: all 0.3s ease;

  ${(props) =>
    props.isDragging
      ? `
            opacity: 0.1;
        `
      : ""}
`;

const Header = styled.div`
  width: 100%;
  padding: 6px;
  border: 1px solid lightgray;
  border-radius: 8px;
  cursor: grab;
`;

const Column = (props) => {
  const { id, index, name, cards, onMove, onMoveCard } = props;
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "CARD",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      var elementRight = hoverBoundingRect.right - 2;
      var elementLeft = hoverBoundingRect.left + 2;
      var mouseX = clientOffset.x;

      if (mouseX <= elementRight && mouseX >= elementLeft) {
        onMove(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }

      //   var elementTop = hoverBoundingRect.top;
      //   var elementBottom = hoverBoundingRect.bottom;
      //   var mouseY = clientOffset.y;

      //   if (mouseY <= elementBottom && mouseY >= elementTop) {
      //     onMove(dragIndex, hoverIndex);
      //     item.index = hoverIndex;
      //   }
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: "CARD",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const renderCard = useCallback((card, index) => {
    return (
      <Card
        key={card.id}
        index={index}
        id={card.id}
        name={card.name}
        columnId={id}
        cards={card.data}
        onMove={onMoveCard}
      />
    );
  }, []);

  return (
    <Container
      ref={preview}
      isDragging={isDragging}
      data-handler-id={handlerId}
    >
      <Header ref={ref}>{name}</Header>
      {cards.map((c, i) => renderCard(c, i))}
    </Container>
  );
};

export default Column;
