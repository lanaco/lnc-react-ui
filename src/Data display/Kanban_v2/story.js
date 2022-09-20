import React from "react";
import styled from "@emotion/styled";
import KanbanV2 from ".";
import { useState, useCallback } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { findIndex } from "lodash";

const Container = styled.div``;

const Story = (props) => {
  const [data, setData] = useState({
    A: [
      { id: 1, name: "Card 1" },
      { id: 2, name: "Card 2" },
      { id: 3, name: "Card 3" },
    ],
    B: [
      { id: 4, name: "Card 4" },
      { id: 5, name: "Card 5" },
      { id: 6, name: "Card 6" },
    ],
    C: [
      { id: 7, name: "Card 7" },
      { id: 8, name: "Card 8" },
      { id: 9, name: "Card 9" },
    ],
  });

  const onColumnMoved = (id) => {
    console.log(`Column ${id} moved!`);
  };

  const onCardMoved = (id) => {
    // console.log(`Card ${id} moved!`);
  };

  const onCardChangedColumns = (id) => {
    // console.log(`Card ${id} changed to new column!`);
  };

  return (
    <Container>
      <KanbanV2
        onColumnMoved={onColumnMoved}
        onCardMoved={onCardMoved}
        onCardChangedColumns={onCardChangedColumns}
        data={data}
        columnInfo={{
          A: {
            id: 1,
            name: "Column A",
          },
          B: {
            id: 2,
            name: "Column B",
          },
          C: {
            id: 3,
            name: "Column C",
          },
        }}
      />
    </Container>
  );
};

export default Story;
