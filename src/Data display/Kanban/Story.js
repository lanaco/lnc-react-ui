import React, { useState } from "react";
import Kanban from ".";

const Story = (props) => {
  const [columns, setColumns] = useState([
    { name: "Created", accessor: "statusId", value: 1 },
    { name: "In Progress", accessor: "statusId", value: 2 },
    { name: "Done", accessor: "statusId", value: 3 },
  ]);

  const [data, setData] = useState([
    {
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

  const updateItem = (item, column) => {
    // if (item && column) {
    //   var dataCopy = [...data];
    //   var existingItem = dataCopy.find((x) => x.id === item.id);
    //   dataCopy = dataCopy.filter((x) => x.id !== item.id);
    //   existingItem.statusId = column.value;
    //   existingItem.status = column.name;
    //   dataCopy.push(existingItem);
    //   setData(dataCopy);
    // }
  };

  return (
    <div>
      <Kanban onDrop={updateItem} {...props} data={data} />
    </div>
  );
};

export default Story;
