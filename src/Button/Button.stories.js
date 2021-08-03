import React from "react";
import Button from ".";
import theme from "../_utils/theme";

export default {
  title: "Button",
  component: Button,
  argTypes: {},
};

const Template = (args) => (
  <>
    {/* <p>
      <Button {...args} />
    </p> */}
    <span style={{ padding: "10px" }}>
      <Button {...args} />
    </span>
    <span style={{ padding: "10px" }}>
      <Button {...args} text="Button" />
    </span>
  </>
);

export const JustText = Template.bind({});
JustText.args = {
  theme: theme,
  color: "primary",
  text: "Button",
  tooltip: "Button",
  onClick: () => {},
  size: "medium",
  disabled: false,
};

export const JustIcon = Template.bind({});
JustIcon.args = {
  theme: theme,
  color: "primary",
  tooltip: "Button",
  onClick: () => {},
  size: "medium",
  disabled: false,
  icon: "user",
  iconStyle: "solid",
};

export const TextAndIconToLeft = Template.bind({});
TextAndIconToLeft.args = {
  theme: theme,
  color: "primary",
  text: "Button",
  tooltip: "Button",
  onClick: () => {},
  size: "medium",
  disabled: false,
  icon: "user",
  iconStyle: "solid",
  iconLocation: "left",
};

export const TextAndIconToRight = Template.bind({});
TextAndIconToRight.args = {
  theme: theme,
  color: "primary",
  text: "Button",
  tooltip: "Button",
  onClick: () => {},
  size: "medium",
  disabled: false,
  icon: "user",
  iconStyle: "solid",
  iconLocation: "right",
};
