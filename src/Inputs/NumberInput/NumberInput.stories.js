import React from "react";
import NumberInput from ".";
import theme from "../../_utils/theme";

export default {
  title: "Inputs/Number Input",
  component: NumberInput,
  argTypes: {},
};

const Template = (args) => (
  <div>
    <NumberInput {...args} />
  </div>
);

var size = "large";

export const IntegerInput = Template.bind({});
IntegerInput.args = {
  theme: theme,
  color: "primary",
  onChange: (id, value) => {},
  size: size,
  disabled: false,
  isDecimal: false,
};

export const DecimalInput = Template.bind({});
DecimalInput.args = {
  theme: theme,
  color: "primary",
  onChange: (id, value) => {},
  size: size,
  disabled: false,
  isDecimal: true,
};

export const DisabledNumberInput = Template.bind({});
DisabledNumberInput.args = {
  theme: theme,
  color: "primary",
  onChange: (id, value) => {},
  size: size,
  disabled: false,
  isDecimal: true,
  disabled: true,
};
