import React from "react";
import NumberInput from ".";
import theme from "../_utils/theme";


export default {
  title: "Number Input",
  component: NumberInput,
  argTypes: {
    bgColor: { control: "color" },
    textColor: { control: "color" },
    accentColor: { control: "color" },
  },
};

const Template = (args) => (
  <div>
    <NumberInput {...args} />
  </div>
);

export const IntegerInput = Template.bind({});
IntegerInput.args = {
  theme: theme,
  color: "primary",
  onChange: (id, value) => {},
  size: "medium",
  disabled: false,
  isDecimal: false
};

export const DecimalInput = Template.bind({});
DecimalInput.args = {
  theme: theme,
  color: "primary",
  onChange: (id, value) => {},
  size: "medium",
  disabled: false,
  isDecimal: true
};

export const DisabledNumberInput = Template.bind({});
DisabledNumberInput.args = {
  theme: theme,
  color: "primary",
  onChange: (id, value) => {},
  size: "medium",
  disabled: false,
  isDecimal: true,
  disabled: true
};
