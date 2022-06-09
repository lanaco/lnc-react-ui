import React from "react";
import IconButton from ".";

export default {
  title: "General/Icon Button",
  component: IconButton,
  argTypes: {},
};

const Template = (args) => (
  <div>
    <IconButton {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  color: "primary",
  tooltip: "Button",
  onClick: () => {},
  size: "small",
  disabled: false,
  outline: false,
  icon: "user",
};

export const Outline = Template.bind({});
Outline.args = {
  color: "primary",
  tooltip: "Button",
  onClick: () => {},
  size: "small",
  disabled: false,
  outline: true,
  icon: "user",
};
