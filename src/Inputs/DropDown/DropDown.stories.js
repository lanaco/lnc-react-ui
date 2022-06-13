import React from "react";
import DropDown from ".";
import theme from "../../_utils/theme";

export default {
  title: "Inputs/Dropdown",
  component: DropDown,
  argTypes: {},
};

const Template = (args) => <DropDown {...args} />;

export const Default = Template.bind({});
Default.args = {
  theme: theme,
  color: "primary",
  tooltip: "Dropdown",
  onChange: () => {},
  size: "medium",
  disabled: false,
  items: [
    { name: "Name 11", value: 1 },
    { name: "Name 222", value: 2 },
    { name: "Name 333333333", value: 3 },
  ],
};
