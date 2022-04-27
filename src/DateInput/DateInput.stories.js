import React from "react";
import DateInput from "./index";
import Story from "./Story";

export default {
  title: "Date Input",
  component: DateInput,
};

const Template = (args) => <Story {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  value: "17.08.2021.",
  onChange: (_, value) => console.log(value),
  size: "small",
  color: "primary",
  disabled: false,
};
