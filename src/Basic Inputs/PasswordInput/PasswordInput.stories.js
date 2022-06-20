import React from "react";
import PasswordInput from ".";
import StoryContainer from "../../_utils/StoryContainer";

export default {
  title: "Basic Inputs/Password input",
  component: PasswordInput,
  argTypes: {},
};

const Template = (args) => (
  <StoryContainer>
    <PasswordInput {...args} size={"small"} />
    <PasswordInput {...args} size={"medium"} />
    <PasswordInput {...args} size={"large"} />
  </StoryContainer>
);

export const Primary = Template.bind({});
Primary.args = {
  id: "",
  value: "Password",
  disabled: false,
  readOnly: false,
  debounceTime: 180,
  placeholder: "",
  className: "",
  style: {},
  size: "small",
  color: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  id: "",
  value: "Password",
  disabled: false,
  readOnly: false,
  debounceTime: 180,
  placeholder: "",
  className: "",
  style: {},
  size: "small",
  color: "secondary",
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: "",
  value: "Password",
  disabled: true,
  readOnly: false,
  debounceTime: 180,
  placeholder: "",
  className: "",
  style: {},
  size: "small",
  color: "primary",
};
