import React from "react";
import TextIconButton from ".";
import theme from "../_utils/theme";

export default {
  title: "New Button",
  component: TextIconButton,
  argTypes: {},
};

const Template = (args) => (
  <>
    <p>
      <TextIconButton {...args} />
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
