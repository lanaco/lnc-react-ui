import React from "react";
import TextInput from ".";
import theme from "../_utils/theme";

export default {
  title: "Text Input",
  component: TextInput,
  argTypes: {},
};

const Template = (args) => (
  <div>
    <TextInput {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  theme: theme,
  color: "primary",
  onChange: () => {},
  size: "medium",
  disabled: false,
  value: "text",
};
