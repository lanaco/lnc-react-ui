import React from "react";
import DecimalInput from ".";
import Story from "./Story";

export default {
  title: "Basic Inputs/Decimal Input",
  component: DecimalInput,
};

const Template = (args) => (
  <div style={{ width: "150px" }}>
    <Story {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  readOnly: false,
  defaultValue: 0,
  debounceTime: 180,
  prefix: "",
  thousandSeparator: ".",
  decimalSeparator: ",",
  decimalScale: 2,
  fixedDecimalScale: true,
  allowNegative: true,
};
