import React from "react";
import DateInput from ".";

export default {
  title: "Basic Inputs/Date Input",
  component: DateInput
};

const Template = (args) => (
  <DateInput {...args}/>
);

export const Default = Template.bind({});
Default.args = {
  id: "",
  disabled: false,
  onChange: () => { },
  className: "",
  preventDefault: true,
  size: "small",
  color: "primary",
  value: "",
  style: {},
  min: "",
  max: "",
  readOnly: false,
};
