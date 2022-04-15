import React from "react";
import PasswordInput from ".";

export default {
  title: "Basic Inputs/Password input",
  component: PasswordInput,
  argTypes: {},
};

const Template = (args) => (
  <>
    <PasswordInput {...args} />
  </>
);

export const Password = Template.bind({});
Password.args = {
  color: "primary",
  text: "Button",
  tooltip: "Button",
  onClick: () => {},
  size: "small",
  disabled: false,
};
