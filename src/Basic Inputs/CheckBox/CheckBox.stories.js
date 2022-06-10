import React from "react";
import CheckBox from ".";
import theme from "../../_utils/theme";

export default {
  title: "Basic Inputs/CheckBox",
  component: CheckBox,
  argTypes: {},
};

const Template = (args) => <CheckBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: "check",
  checked: true,
  disabled: false,
  readOnly: false,
  label: "Checkbox",
  indeterminate: false,
  labelPosition: "right",
  icon: null,
  preventDefault: true,
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  className: "",
  style: {},
  size: "small",
  color: "primary",
};
