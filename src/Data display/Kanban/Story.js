import React, { useState } from "react";
import Kanban from "./index";
import styled from "@emotion/styled";

const StyledCardContent = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Footer = styled.div`
  padding-top: 8px;
`;

const CardContent = (props) => {
  return (
    <StyledCardContent>
      <div>{props.taskName}</div>
      <div>{props.taskDescription}</div>
    </StyledCardContent>
  );
};

const ColumnFooter = (props) => {
  return <Footer>ID: {props.column.value}</Footer>;
};

const Story = (props) => {
  const [columns, setColumns] = useState([
    { name: "Created", accessor: "statusId", value: 1 },
    { name: "In Progress", accessor: "statusId", value: 2 },
    { name: "Done", accessor: "statusId", value: 3 },
  ]);

  const [data, setData] = useState([
    {
      index: 0,
      name: "Created",
      accessor: "statusId",
      value: 1,
      data: [
        {
          id: 1,
          status: "Created",
          statusId: 1,
          taskName: "Task 6",
          taskDescription: "Do something...",
        },
        {
          id: 2,
          status: "Created",
          statusId: 1,
          taskName: "Task 5",
          taskDescription: "Do something...",
        },
        {
          id: 3,
          status: "Created",
          statusId: 1,
          taskName: "Task 4",
          taskDescription: "Do something...",
        },
      ],
    },
    {
      index: 1,
      name: "In Progress",
      accessor: "statusId",
      value: 2,
      data: [
        {
          id: 4,
          status: "In Progress",
          statusId: 2,
          taskName: "Task 3",
          taskDescription: "Do something...",
        },
        {
          id: 5,
          status: "In Progress",
          statusId: 2,
          taskName: "Task 2",
          taskDescription: "Do something...",
        },
      ],
    },
    {
      index: 2,
      name: "Done",
      accessor: "statusId",
      value: 3,
      data: [
        {
          id: 6,
          status: "Done",
          statusId: 3,
          taskName: "Task 1",
          taskDescription: "Do something...",
        },
      ],
    },
  ]);

  return (
    <div>
      <Kanban
        {...props}
        onColumnDrop={(p1, p2) => {
          console.log("onColumnDrop: ", p1, p2);
        }}
        onCardDrop={(p1, p2) => {
          console.log("onCardDrop: ", p1, p2);
        }}
        data={data}
      />
    </div>
  );
};

export default Story;
