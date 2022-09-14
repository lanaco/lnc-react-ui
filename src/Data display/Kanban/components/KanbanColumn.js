import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import { useDrop } from "react-dnd";
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

const KanbanColumn = (props) => {
  //
  const { size, color, style, className, column, itemType } = props;
  const theme = useTheme();

  const themeProps = { size, color, style, className, theme };

  //==========================================

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: itemType,
    drop: () => column,
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      };
    },
  });

  //==========================================

  const renderColumnHeader = () => {
    return (
      renderCustomElement(
        getCustomRender("KANBAN_COLUMN_HEADER", props.children),
        { column }
      ) || <ColumnHeader>{column.name}</ColumnHeader>
    );
  };

  const renderColumnFooter = () => {
    return (
      renderCustomElement(
        getCustomRender("KANBAN_COLUMN_FOOTER", props.children),
        { column }
      ) || <ColumnHeader>{column.value}</ColumnHeader>
    );
  };

  const getKanbanCardChidlren = () => {
    console.log(React.Children.toArray(props.children));

    return React.Children.map(props.children, (child) => {
      if (child.props.__TYPE__ === "KANBAN_CARD") {
        console.log(column.name, child);
        return React.cloneElement(child, {});
      }

      return <></>;
    });

    // .filter(
    //   (child) => child.props.__TYPE__ === "KANBAN_CARD"
    // );
  };

  //==========================================

  return (
    <Container isOver={isOver}>
      {renderColumnHeader()}
      <Column ref={drop}>
        {/* {props.children} */}
        {getKanbanCardChidlren()}
      </Column>
      {renderColumnFooter()}
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
