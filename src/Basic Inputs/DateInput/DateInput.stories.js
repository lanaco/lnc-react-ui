import React from "react";
import DateInput from "./index";
import Story from "./Story";

export default {
  title: "Basic Inputs/Date Input",
  component: DateInput,
};

const Template = (args) => <Story {...args} />;

export const Default = Template.bind({});
Default.args = {
  format: "DD/MM/YYYY",
  size: "small",
  color: "primary",
  disabled: false,
  readOnly: false,
  minDate: "2000-01-01",
  maxDate: "2030-01-01",
};
