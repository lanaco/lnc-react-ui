import React from "react";
import Button from ".";


export default {
  title: "Button",
  component: Button,
  argTypes: {
    bgColor: { control: "color" },
    textColor: { control: "color" },
  },
};

const Template = (args) => (
  <p>
    <Button {...args} />
  </p>
);

export const JustText = Template.bind({});
JustText.args = {
  text: "Button",
  tooltipText: "Button",
  onClick: () => {},
  bgColor: "#00537a",
  textColor: "#ffffff",
  size: "m",
  disabled: false,
};

export const JustIcon = Template.bind({});
JustIcon.args = {
  tooltipText: "Button",
  onClick: () => {},
  iconClassName: "lnc-refresh",
  bgColor: "#2a963c",
  textColor: "#ffffff",
  size: "m",
  disabled: false,
};

export const TextAndIconToLeft = Template.bind({});
TextAndIconToLeft.args = {
  text: "Button",
  tooltipText: "Button",
  onClick: () => {},
  iconClassName: "lnc-refresh",
  iconLocation: "left",
  bgColor: "#e0223e",
  textColor: "#ffffff",
  size: "m",
  disabled: false,
};

export const TextAndIconToRight = Template.bind({});
TextAndIconToRight.args = {
  text: "Button",
  tooltipText: "Button",
  onClick: () => {},
  iconClassName: "lnc-refresh",
  iconLocation: "right",
  bgColor: "#00537a",
  textColor: "#ffffff",
  size: "m",
  disabled: false,
};
