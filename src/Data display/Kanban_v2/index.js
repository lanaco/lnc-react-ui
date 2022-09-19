import React, { useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "@emotion/styled";
import Column from "./components/Column";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  border-radius: 8px;
  padding: 12px;
  background-color: #e6faff60;
  border: 1px solid #ededed;
  min-width: 100%;
  transition: all 0.3s ease;
`;

const KanbanV2 = (props) => {
  const { onMoveColumn = () => {}, onMoveCard = () => {}, data = [] } = props;

  const renderColumn = useCallback((column, index) => {
    return (
      <Column
        key={column.id}
        index={index}
        id={column.id}
        name={column.name}
        cards={column.data}
        onMove={onMoveColumn}
        onMoveCard={onMoveCard}
      />
    );
  }, []);

  return (
    <Container>
      <DndProvider backend={HTML5Backend}>
        {data.map((c, i) => renderColumn(c, i))}
      </DndProvider>
    </Container>
  );
};

export default KanbanV2;
