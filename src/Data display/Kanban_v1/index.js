import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import KanbanCard from "./components/KanbanCard";
import KanbanColumn from "./components/KanbanColumn";
import KanbanContainer from "./components/KanbanContainer";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { cloneDeep } from "lodash";
import { getCustomRender, renderCustomElement } from "../../_utils/utils";

const Container = styled.div`
  border-radius: 8px;
  padding: 12px;
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
  const {
    size,
    color,
    style,
    className,
    data,
    onColumnDrop,
    onCardDrop,
    itemType,
  } = props;

  const theme = useTheme();

  const themeProps = { size, color, style, className, theme };

  //==========================================

  const renderCard = (cardProps) => {
    return (
      renderCustomElement(
        getCustomRender("KANBAN_CARD_CONTENT", props.children),
        cardProps
      ) || <div></div>
    );
  };

  const renderColumn = (column) => {
    var col = cloneDeep(column);
    delete col.data;

    return (
      <KanbanColumn title={column.name} column={col} itemType={itemType}>
        {props.children}
        {column.data.map((item) => (
          <KanbanCard
            itemType={itemType}
            onDrop={onDrop}
            key={item.id}
            column={col}
            item={item}
            header={item.taskName}
            content={item.taskDescription}
          >
            {renderCard(item)}
          </KanbanCard>
        ))}
      </KanbanColumn>
    );
  };

  //==========================================

  return (
    <Container {...themeProps}>
      <DndProvider backend={HTML5Backend}>
        <KanbanContainer
          data={data}
          onColumnDrop={onColumnDrop}
          onCardDrop={onCardDrop}
        >
          {props.children}
        </KanbanContainer>
      </DndProvider>
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
