import React from "react";
import styled from "@emotion/styled";
import KanbanV2 from ".";
import { useState, useCallback } from "react";
import update from "immutability-helper";

const Container = styled.div``;

const Story = (props) => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Column 1",
      data: [
        {
          id: 1,
          name: "Card 1",
        },
        {
          id: 2,
          name: "Card 2",
        },
        {
          id: 3,
          name: "Card 3",
        },
      ],
    },
    {
      id: 2,
      name: "Column 2",
      data: [
        {
          id: 4,
          name: "Card 4",
        },

        {
          id: 5,
          name: "Card 5",
        },
      ],
    },
    {
      id: 3,
      name: "Column 3",
      data: [
        {
          id: 6,
          name: "Card 6",
        },
        {
          id: 7,
          name: "Card 7",
        },
        {
          id: 8,
          name: "Card 8",
        },
        {
          id: 9,
          name: "Card 9",
        },
      ],
    },
    {
      id: 4,
      name: "Column 4",
      data: [
        {
          id: 10,
          name: "Card 10",
        },
      ],
    },
  ]);

  const onMoveColumn = useCallback((dragIndex, hoverIndex) => {
    setData((prevColumns) =>
      update(prevColumns, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevColumns[dragIndex]],
        ],
      })
    );
  }, []);

  const onMoveCard = useCallback((dragIndex, hoverIndex) => {
    console.log(dragIndex, hoverIndex);
  }, []);

  return (
    <Container>
      <KanbanV2
        data={data}
        onMoveColumn={onMoveColumn}
        onMoveCard={onMoveCard}
      />
    </Container>
  );
};

export default Story;
