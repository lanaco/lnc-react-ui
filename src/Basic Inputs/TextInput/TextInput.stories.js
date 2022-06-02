import React, { useRef } from "react";
import TextInput from ".";
import theme from "../../_utils/theme";

export default {
  title: "Basic Inputs/Text Input",
  component: TextInput,
  argTypes: {
    onInput: { action: "onInput" },
    onChange: { action: "onChange" },
    onBlur: { action: "onBlur" },
  },
};

const Template = (args) => (
  <div style={{ width: "150px" }}>
    <TextInput {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  color: "primary",
  size: "medium",
  disabled: false,
  readOnly: false,
  value: "",
  type: "text",
};
