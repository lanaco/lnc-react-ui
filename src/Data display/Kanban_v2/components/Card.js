import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const Container = styled.div`
  background-color: white;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid gray;
  margin: 6px;

  ${(props) =>
    props.isDragging
      ? `
            opacity: 0.1;
        `
      : ""}
`;

const Header = styled.div`
  width: 100%;
  cursor: grab;
`;

const Card = (props) => {
  const { id, index, name, onMove } = props;
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "CARD1",
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
        return;
      }

      var elementTop = hoverBoundingRect.top;
      var elementBottom = hoverBoundingRect.bottom;
      var mouseY = clientOffset.y;

      if (mouseY <= elementBottom && mouseY >= elementTop) {
        onMove(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: "CARD1",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <Container
      ref={preview}
      isDragging={isDragging}
      data-handler-id={handlerId}
    >
      <Header ref={ref}>{name}</Header>
    </Container>
  );
};

export default Card;
