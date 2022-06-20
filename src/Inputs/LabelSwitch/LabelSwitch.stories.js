import React from "react";
import LabelSwitch from ".";
import Story from "./Story";

export default {
  title: "Inputs/Label Switch",
  component: LabelSwitch,
  argTypes: {},
};

// add hidden input
const Template = (args) => <Story {...args} />;

export const Default = Template.bind({});
Default.args = {
  color: "primary",
  colorAlt: "secondary",
  size: "small",
  value: false,
  disabled: false,
  readOnly: false,
  labelWhenFalse: "Option 1",
  labelWhenTrue: "Option 2",
};
