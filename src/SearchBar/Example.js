import React, { useState } from "react";
import SearchBar from "./index";

const Example = (props) => {
  const [items, setItems] = useState([
    { id: 1, text: "text 1", active: false },
    { id: 2, text: "text 222", active: true },
    { id: 3, text: "text 33", active: false },
    { id: 4, text: "text 444444", active: false },
    { id: 5, text: "text 55555", active: true },
    { id: 6, text: "text 6", active: false },
    { id: 7, text: "text 77", active: false },
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
    <div style={{ width: "400px" }}>
      <SearchBar
        {...props.args}
        items={items}
        suggestions={[]}
        onRemoveItem={onRemoveItem}
        onAddItem={onAddItem}
        onActivateItem={onActivateItem}
        onDeactivateItem={onDeactivateItem}
      />
    </div>
  );
};

export default Example;
