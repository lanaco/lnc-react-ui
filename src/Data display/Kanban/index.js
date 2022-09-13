import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import KanbanCard from "./components/KanbanCard";
import KanbanColumn from "./components/KanbanColumn";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { cloneDeep } from "lodash";

const Container = styled.div`
  border-radius: 8px;
  padding: 12px;
  border: 1px solid #ededed;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  box-sizing: border-box;
  width: 100%;

  margin-top: 16px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  box-sizing: border-box;
  width: 100%;
`;

const ColumnHeader = styled.div`
  border-radius: 8px;
  padding: 8px;
  border: 2px solid gray;
  background-color: #ededed;
  box-sizing: border-box;
  width: fit-;
`;

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

const Kanban = (props) => {
  //
  const { size, color, style, className, data, onDrop, itemType } = props;

  const theme = useTheme();

  const themeProps = { size, color, style, className, theme };

  //==========================================

  const renderColumn = (column) => {
    var col = cloneDeep(column);
    delete col.data;

    return (
      <KanbanColumn title={column.name} column={col} itemType={itemType}>
        {column.data.map((item) => (
          <KanbanCard
            itemType={itemType}
            onDrop={onDrop}
            key={item.id}
            column={col}
            item={item}
            header={item.taskName}
            content={item.taskDescription}
          />
        ))}
      </KanbanColumn>
    );
  };

  //==========================================

  return (
    <Container {...themeProps}>
      <CardsContainer>
        <DndProvider backend={HTML5Backend}>
          {data.map((x) => renderColumn(x))}
        </DndProvider>
      </CardsContainer>
    </Container>
  );
};

Kanban.defaultProps = {
  id: "",
  //----------------
  itemType: "ITEM",
  columns: [],
  groupBy: null,
  data: [],
  //----------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
};

Kanban.propTypes = {
  id: PropTypes.string,
  //------------------------------------
  columns: PropTypes.arrayOf(PropTypes.object),
  groupBy: PropTypes.string,
  //------------------------------------
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

export default Kanban;
