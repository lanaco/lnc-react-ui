import React from "react";
import DecimalInput from ".";
import StoryContainer from "../../_utils/StoryContainer";

export default {
  title: "Basic Inputs/Decimal Input",
  component: DecimalInput,
};

const Template = (args) => (
  <StoryContainer>
    <DecimalInput {...args} size={"small"} />
    <DecimalInput {...args} size={"medium"} />
    <DecimalInput {...args} size={"large"} />
  </StoryContainer>
);

export const PrimaryNegative = Template.bind({});
PrimaryNegative.args = {
  disabled: false,
  readOnly: false,
  defaultValue: 0,
  value: -1234.56,
  debounceTime: 180,
  prefix: "",
  thousandSeparator: ".",
  decimalSeparator: ",",
  decimalScale: 2,
  fixedDecimalScale: true,
  allowNegative: true,
  color: "primary",
  size: "medium",
};

export const SecondaryDifferentFormat = Template.bind({});
SecondaryDifferentFormat.args = {
  disabled: false,
  readOnly: false,
  defaultValue: 0,
  value: 2345.6789,
  debounceTime: 180,
  prefix: "",
  thousandSeparator: " ",
  decimalSeparator: ".",
  decimalScale: 4,
  fixedDecimalScale: true,
  allowNegative: true,
  color: "secondary",
  size: "medium",
};

export const DisabledWithPrefix = Template.bind({});
DisabledWithPrefix.args = {
  disabled: true,
  readOnly: false,
  defaultValue: 0,
  value: 3456.78,
  debounceTime: 180,
  prefix: "$ ",
  thousandSeparator: ".",
  decimalSeparator: ",",
  decimalScale: 2,
  fixedDecimalScale: true,
  allowNegative: true,
  color: "primary",
  size: "medium",
};
