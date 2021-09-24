import React from "react";
import PasswordInput from ".";
import theme from "../_utils/theme";

export default {
  title: "Password input",
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
  theme: theme,
  color: "primary",
  text: "Button",
  tooltip: "Button",
  onClick: () => {},
  size: "small",
  disabled: false,
};
