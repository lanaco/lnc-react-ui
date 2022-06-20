import React from "react";
import ToggleSwitch from ".";
import Story from "./Story";

export default {
  title: "Inputs/Switch",
  component: ToggleSwitch,
  argTypes: {},
};

const Template = (args) => <Story {...args} />;

export const Default = Template.bind({});
Default.args = {
  color: "primary",
  size: "medium",
  value: null,
  disabled: false,
  readOnly: false,
  label: "Switch",
};
