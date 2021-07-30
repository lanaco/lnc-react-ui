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
  tooltipText: "Button",
  onClick: () => {},
  size: "medium",
  disabled: false,
};

export const JustIcon = Template.bind({});
JustIcon.args = {
  theme: theme,
  color: "primary",
  tooltipText: "Button",
  onClick: () => {},
  iconClassName: "lnc-refresh",
  size: "medium",
  disabled: false,
};

export const TextAndIconToLeft = Template.bind({});
TextAndIconToLeft.args = {
  theme: theme,
  color: "primary",
  text: "Button",
  tooltipText: "Button",
  onClick: () => {},
  iconClassName: "lnc-refresh",
  iconLocation: "left",
  size: "medium",
  disabled: false,
};

export const TextAndIconToRight = Template.bind({});
TextAndIconToRight.args = {
  theme: theme,
  color: "primary",
  text: "Button",
  tooltipText: "Button",
  onClick: () => {},
  iconClassName: "lnc-refresh",
  iconLocation: "right",
  size: "medium",
  disabled: false,
};
