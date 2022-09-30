import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import { useDrop, useDrag } from "react-dnd";
import { getCustomRender, renderCustomElement } from "../../../_utils/utils";

const Container = styled.div`
  border-radius: 8px;
  padding: 8px;
  background-color: #f1f5f9;
  border: 1px solid #e2e8f0;
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-height: 50px;
  min-width: 268px;
  transition: all 0.2s ease;

  ${(props) => (props.isOver ? `background-color: #E2E8F0;` : "")}
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  min-height: 50px;
`;

const ColumnHeader = styled.div`
  width: 100%;
  padding: 3px;
`;

const CardsContainer = styled.div``;

const KanbanColumn = (props) => {
  //
  const { size, color, style, className, column, onDrop = () => {} } = props;
  const theme = useTheme();
  const themeProps = { size, color, style, className, theme };

  const ref = React.useRef();

  //======== DRAG ============================

  const [{ isDragging }, drag] = useDrag({
    type: "COLUMN",
    column,
    end: (_, monitor) => {
      onDrop(column, monitor.getDropResult());
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "COLUMN",
    drop: () => ({}),
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      };
    },
  });

  const opacity = isDragging ? 0.3 : 1;

  //======== DROP ============================

  //==========================================

  drag(drop(ref));

  return (
    <Container ref={ref} style={{ opacity }}>
      {column.name}
    </Container>
  );
};

KanbanColumn.defaultProps = {
  __TYPE__: "KANBAN_COLUMN",
  id: "",
  //----------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
};

KanbanColumn.propTypes = {
  __TYPE__: PropTypes.string,
  id: PropTypes.string,
  //----------------
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "information",
  ]),
};

export default KanbanColumn;
