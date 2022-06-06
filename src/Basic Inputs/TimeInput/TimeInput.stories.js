import React, { useRef } from "react";
import TimeInput from ".";

export default {
  title: "Basic Inputs/Time Input",
  component: TimeInput,
};

const Template = (args) => <TimeInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: "21:00",
};
