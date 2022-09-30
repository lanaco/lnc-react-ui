import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import { useDrop } from "react-dnd";
import { getCustomRender, renderCustomElement } from "../../../_utils/utils";
import KanbanColumn from "./KanbanColumn";
import update from "immutability-helper";

const Container = styled.div`
  border-radius: 4px;
  padding: 8px;
  background-color: #e6faff80;
  border: 1px solid #e2e8f0;
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: row;
  gap: 8px;
  min-width: 100%;
  transition: all 0.2s ease;

  ${(props) => (props.isOver ? `background-color: #E2E8F0;` : "")}
`;

const KanbanContainer = (props) => {
  //
  const { size, color, style, className, data, onColumnDrop, onCardDrop } =
    props;
  const theme = useTheme();

  const themeProps = { size, color, style, className, theme };

  //==========================================

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

  //==========================================

  //==========================================

  return (
    <Container ref={drop}>
      {data.map((x, i) => (
        <KanbanColumn
          key={x.id}
          index={i}
          itemType="COLUMN"
          column={x}
          onDrop={onColumnDrop}
        >
          {props.children}
        </KanbanColumn>
      ))}
    </Container>
  );
};

KanbanContainer.defaultProps = {
  __TYPE__: "KANBAN_CONTAINER",
  id: "",
  //----------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
};

KanbanContainer.propTypes = {
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

export default KanbanContainer;
