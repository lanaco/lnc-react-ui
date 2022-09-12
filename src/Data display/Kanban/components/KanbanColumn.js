import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import { useDrop } from "react-dnd";

const Column = styled.div`
  border-radius: 8px;
  padding: 8px;
  border: 2px solid gray;
  background-color: #ededed;
  box-sizing: border-box;
  width: 33.3%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const KanbanColumn = (props) => {
  //
  const { size, color, style, className, column } = props;
  const theme = useTheme();

  const themeProps = { size, color, style, className, theme };

  //==========================================

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "CARD",
    drop: () => column,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  //==========================================

  return <Column ref={drop}>{props.children}</Column>;
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
