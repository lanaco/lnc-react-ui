import React, { useState } from "react";
import SearchBar from "./index";

const Example = (props) => {
  const [items, setItems] = useState([
    {
      id: 1,
      field: "age",
      description: "Age",
      dataType: "integer",
      operation: "Equals",
      value: "12",
      active: false,
    },
    {
      id: 2,
      field: "firstName",
      description: "First name",
      dataType: "string",
      operation: "Contains",
      value: "Vladan",
      active: true,
    },
  ]);

  const onRemoveItem = (item) => {
    setItems([...items].filter((x) => x.id !== item.id));
  };

  const onAddItem = (item) => {
    item.id = items.map((x) => x.id).reduce((a, b) => Math.max(a, b), 0) + 1;
    setItems([...items, item]);
  };

  const onActivateItem = (item) => {
    let copy = [...items];
    let index = copy.findIndex((x) => x.id === item.id);
    copy[index] = { ...copy[index], active: true };

    setItems(copy);
  };

  const onDeactivateItem = (item) => {
    let copy = [...items];
    let index = copy.findIndex((x) => x.id === item.id);
    copy[index] = { ...copy[index], active: false };

    setItems(copy);
  };

  return (
    <div style={{ minWidth: "500px", maxWidth: "500px" }}>
      <SearchBar
        {...props.args}
        items={items}
        suggestions={[
          {
            id: 1,
            field: "firstName",
            description: "First name",
            dataType: "string",
            operation: "Contains",
          },
          {
            id: 2,
            field: "lastName",
            description: "Last name",
            dataType: "string",
            operation: "Contains",
          },
          {
            id: 3,
            field: "age",
            description: "Age",
            dataType: "integer",
            operation: "Equals",
          },
        ]}
        onRemoveItem={onRemoveItem}
        onAddItem={onAddItem}
        onActivateItem={onActivateItem}
        onDeactivateItem={onDeactivateItem}
      />
    </div>
  );
};

export default Example;
