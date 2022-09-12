import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import { useDrag } from "react-dnd";

const Card = styled.div`
  border-radius: 8px;
  padding: 8px;
  border: 1px solid gray;
  background-color: white;
`;

const CardHeader = styled.div``;

const CardContent = styled.div``;

const KanbanCard = (props) => {
  //
  const {
    size,
    color,
    style,
    className,
    header,
    content,
    item,
    column,
    onDrop,
  } = props;
  const theme = useTheme();

  const themeProps = { size, color, style, className, theme };

  //==========================================

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item,
    end: (item, monitor) => {
      onDrop(item, monitor.getDropResult());
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  //==========================================

  return (
    <Card ref={drag} style={{ opacity }}>
      <CardHeader>{header}</CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
};

KanbanCard.defaultProps = {
  __TYPE__: "KANBAN_CARD",
  id: "",
  //----------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
};

KanbanCard.propTypes = {
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

export default KanbanCard;
