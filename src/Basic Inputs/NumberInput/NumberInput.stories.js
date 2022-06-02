import React from "react";
import NumberInput from ".";

export default {
  title: "Basic Inputs/Number Input",
  component: NumberInput,
};

const Template = (args) => (
  <div style={{ width: "150px" }}>
    <NumberInput {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  readOnly: false,
  defaultValue: 0,
  debounceTime: 180,
  step: 1,
  min: -100,
  max: 100,
  placeholder: "",
  color: "primary",
  size: "medium",
};
