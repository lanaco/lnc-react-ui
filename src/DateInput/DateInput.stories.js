import React from "react";
import DateInput from "./index";

export default {
  title: "Date Input",
  component: DateInput,
};

const Template = (args) => <DateInput {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  value: "17.08.2021.",
  onChange: (_, value) => console.log(value),
  size: "small",
  color: "secondary",
  disabled: false,
};
