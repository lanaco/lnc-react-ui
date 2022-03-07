import React from "react";
import ItemCounter from "./index";

export default {
  title: "Data display/Item counter",
  component: ItemCounter,
};

const Template = (args) => <ItemCounter {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  Items: [
    {
      key: "Item1",
      number: 2,
      color: "success",
      description: "Project",
    },
    {
      key: "Item2",
      number: 34,
      color: "error",
      description: "Resources",
    },
    {
      key: "Item3",
      number: 314,
      color: "warning",
      description: "Days",
    },
  ],
  size: "medium",
  color: "primary",
};
