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

  const onChange = (id, items, changedItem) => {
    setItems(items);
  };

  return (
    <div style={{ minWidth: "800px", maxWidth: "800px" }}>
      <SearchBar
        {...props.args}
        onChange={onChange}
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
      />
    </div>
  );
};

export default Example;
