import React from "react";
import TextArea from "./";
import theme from "../../_utils/theme";

export default {
  title: "Basic Inputs/Text Area",
  component: TextArea,
  argTypes: {
    onInput: { action: "onInput"},
    onChange: { action: "onChange"},
    onBlur: { action: "onBlur"}
  },
};

const Template = (args) => (
  <div style={{ width: "200px" }}>
    <TextArea {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  color: "primary",
  onInput: () => {},
  size: "medium",
  disabled: false,
  readOnly: false,
  rows: 4,
  value: "Text",
};
