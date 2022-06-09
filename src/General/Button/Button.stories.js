import React from "react";
import Button from ".";
import theme from "../../_utils/theme";

export default {
  title: "General/Button",
  component: Button,
  argTypes: {},
};

const Template = (args) => (
  <div style={{ width: "150px" }}>
    <Button {...args} />
  </div>
);

export const JustText = Template.bind({});
JustText.args = {
  color: "primary",
  text: "Button",
  tooltip: "Button",
  onClick: () => {},
  size: "small",
  disabled: false,
  outline: false,
};

export const TextAndIconToLeft = Template.bind({});
TextAndIconToLeft.args = {
  color: "primary",
  text: "Button",
  tooltip: "Button",
  onClick: () => {},
  size: "medium",
  disabled: false,
  icon: "user",
  iconStyle: "solid",
  iconLocation: "left",
  outline: false,
};

export const TextAndIconToRight = Template.bind({});
TextAndIconToRight.args = {
  color: "primary",
  text: "Button",
  tooltip: "Button",
  onClick: () => {},
  size: "medium",
  disabled: false,
  icon: "user",
  iconStyle: "solid",
  iconLocation: "left",
  outline: true,
};
