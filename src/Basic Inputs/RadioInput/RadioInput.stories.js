import React from "react";
import RadioInput from ".";
import CheckBox from "../CheckBox";

export default {
  title: "Basic Inputs/Radio Input",
  component: RadioInput
};

const Template = (args) => (
  <div style={{width: '150px'}}>
    <RadioInput {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  id: "radio",
  checked: false,
  disabled: false,
  readOnly: false,
  onChange: () => { },
  color: "secondary",
  size: "small",
  label: "Radio button",
  labelPosition: "right",
  style: {},
};