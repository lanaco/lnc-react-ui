import React from "react";
import ColorInput from ".";
import StoryContainer from "../../_utils/StoryContainer";

export default {
  title: "Basic Inputs/Color Input",
  component: ColorInput,
};

const Template = (args) => (
  <StoryContainer>
    <ColorInput {...args} size={"small"} />
    <ColorInput {...args} size={"medium"} />
    <ColorInput {...args} size={"large"} />
  </StoryContainer>
);

export const Primary = Template.bind({});
Primary.args = {
  id: "color-input",
  value: "#00537a",
  disabled: false,
  readOnly: false,
  preventDefault: true,
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  className: "",
  style: {},
  size: "small",
  color: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  id: "color-input",
  value: "#00a1b4",
  disabled: false,
  readOnly: false,
  preventDefault: true,
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  className: "",
  style: {},
  size: "small",
  color: "secondary",
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: "color-input",
  value: "#00537a",
  disabled: true,
  readOnly: false,
  preventDefault: true,
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  className: "",
  style: {},
  size: "small",
  color: "primary",
};
