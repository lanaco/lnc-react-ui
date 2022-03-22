import React from "react";
import Button from ".";
import theme from "../../_utils/theme";

export default {
  title: "General/Button",
  component: Button,
  argTypes: {},
};

const Template = (args) => (
  <>
    <p>
      <Button {...args} />
    </p>
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
  inverted: false,
};

export const JustIcon = Template.bind({});
JustIcon.args = {
  color: "transparent",
  tooltip: "Button",
  onClick: () => {},
  size: "medium",
  disabled: false,
  icon: "user",
  iconStyle: "solid",
  inverted: false,
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
  inverted: false,
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
  inverted: false,
};
