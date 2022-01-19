import React, { useState } from "react";
import MultiSelectDropdown from "./index";

const Example = (props) => {
  //
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [items, setItems] = useState([
    {
      id: 1,
      value: "Value 1",
    },
    {
      id: 2,
      value: "Value 22",
    },
    {
      id: 3,
      value: "Value 333",
    },
  ]);

  const onChange = (id, items) => {
    setItems(items);
  };

  const onAdd = (item) => {
    setItems([...items, { id: 7, value: item }]);
  };

  const load = (text) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setOptions(
        props.args.options.filter((x) => !items.map((y) => y.id).includes(x.id))
      );
    }, 700);
  };

  const clearOptions = () => setOptions([]);

  return (
    <div style={{ minWidth: "800px", maxWidth: "800px" }}>
      <MultiSelectDropdown
        {...props.args}
        loading={loading}
        load={load}
        clearOptions={clearOptions}
        onChange={onChange}
        onAdd={onAdd}
        items={items}
        options={options}
        addingOptionEnabled={true}
        addOptionText={"Add new tag"}
      />
    </div>
  );
};

export default Example;
