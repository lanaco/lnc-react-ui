import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import { useDrag } from "react-dnd";
import Icon from "../../../General/Icon";

const Card = styled.div`
  border-radius: 8px;
  background-color: white;
  padding: 12px;
  box-sizing: border-box;
  border-top: 1px solid #ededed;
  box-shadow: 0px 5px 10px -5px rgba(0, 0, 0, 0.1),
    0px 10px 10px -5px rgba(0, 0, 0, 0.04);

  min-width: 250px;
  max-width: 250px;
  position: relative;
`;

const DragButton = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 8px;
  position: absolute;
  display: flex;
  align-items: center;

  top: 4px;
  left: 1px;

  cursor: move;
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;

  & i {
    color: gray;
  }

  &:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }
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
    item,
    column,
    onDrop,
    itemType,
    withGripIcon,
  } = props;
  const theme = useTheme();
  const themeProps = { size, color, style, className, theme };

  //==========================================

  const [{ isDragging }, drag, preview] = useDrag({
    type: itemType,
    item,
    end: (item, monitor) => {
      onDrop(item, monitor.getDropResult());
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.3 : 1;

  //==========================================

  return (
    <Card
      ref={withGripIcon ? preview : drag}
      style={{ opacity }}
      isDragging={isDragging}
      withGripIcon={withGripIcon}
    >
      {withGripIcon && (
        <DragButton ref={drag}>
          <Icon sizeInUnits={"12px"} icon="grip-vertical" />
        </DragButton>
      )}

      {React.Children.map(props.children, (child) =>
        React.cloneElement(child, { data: item })
      )}
    </Card>
  );
};

KanbanCard.defaultProps = {
  id: "",
  __TYPE__: "KANBAN_CARD",
  //----------------
  withGripIcon: false,
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
