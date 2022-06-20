import React from "react";
import CheckBox from ".";
import theme from "../../_utils/theme";

export default {
  title: "Basic Inputs/CheckBox",
  component: CheckBox,
  argTypes: {},
};

const Template = (args) => (
  <CheckBox {...args} />
);

export const Default = Template.bind({});
Default.args = {
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  id: "",
  checked: false,
  disabled: false,
  readOnly: false,
  label: "indeterminate checkbox",
  indeterminate: true,
  labelPosition: "right",
  icon: null,
  tabIndex: 0,
  preventDefault: true,
  //-------------------------
  onChange: (e, value) => {},
  onBlur: () => {},
  onFocus: () => {},
  onKeyDown: () => {},
  //-------------------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
  inputProps: { name: "name", id: "krkr", className: "klasa" },
};


export const Disabled = Template.bind({});
Disabled.args = {
  id: "",
  checked: true,
  disabled: true,
  readOnly: false,
  label: "disabled checkbox",
  indeterminate: false,
  labelPosition: "right",
  icon: null,
  tabIndex: 0,
  preventDefault: true,
  //-------------------------
  onChange: (e, value) => {},
  onBlur: () => {},
  onFocus: () => {},
  onKeyDown: () => {},
  //-------------------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
  inputProps: {  },
};

export const Icon = Template.bind({});
Icon.args = {
  id: "",
  checked: true,
  disabled: false,
  readOnly: false,
  label: "icon checkbox",
  indeterminate: false,
  labelPosition: "right",
  icon: "heart",
  tabIndex: 0,
  preventDefault: true,
  //-------------------------
  onChange: (e, value) => {},
  onBlur: () => {},
  onFocus: () => {},
  onKeyDown: () => {},
  //-------------------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
  inputProps: {  },
};

