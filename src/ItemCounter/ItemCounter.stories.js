import React from "react";
import ItemCounter from "./index";
import theme from "../_utils/theme";

export default {
  title: "Item counter",
  component: ItemCounter,
};

const Template = (args) => <ItemCounter {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  Items: [
    {
      key: "Item1",
      number: 2,
      type: { id: 1, code: "Success" },
      description: "Project",
    },
    {
      key: "Item2",
      number: 34,
      type: { id: 2, code: "Danger" },
      description: "Resources",
    },
    {
      key: "Item3",
      number: 314,
      type: { id: 3, code: "Warning" },
      description: "Days",
    },
  ],
  size: "small",
  color: "primary",
  disabled: false,
  theme: theme,
};
