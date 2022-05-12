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
  format: "dd.mm.yyyy",
  size: "small",
  color: "primary",
  disabled: false,
  minDate: "01.01.2020",
  maxDate: "31.12.2022",
};
