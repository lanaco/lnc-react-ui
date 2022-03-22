import React from "react";
import TimeInput from "./index";

export default {
  title: "Inputs/Time Input",
  component: TimeInput,
};

const Template = (args) => <TimeInput {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  value: "1",
  onChange: () => {},
  size: "small",
  color: "primary",
  disabled: false,
  step: "15",
};
