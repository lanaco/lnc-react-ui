import React from "react";
import PasswordInput from ".";

export default {
  title: "Basic Inputs/Password input",
  component: PasswordInput,
  argTypes: {},
};

const Template = (args) => (
  <div style={{ width: "150px" }}>
    <PasswordInput {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  color: "primary",
  text: "Button",
  tooltip: "Button",
  onClick: () => {},
  size: "small",
  disabled: false,
};
