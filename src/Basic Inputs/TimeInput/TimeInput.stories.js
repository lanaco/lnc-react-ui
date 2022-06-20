import React from "react";
import TimeInput from ".";

export default {
  title: "Basic Inputs/Time Input",
  component: TimeInput,
};

const Template = (args) => (
  <div style={{ width: "150px" }}>
    <TimeInput {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  color: "primary",
  size: "small",
  disabled: false,
  readOnly: false,
  value: "",
};
