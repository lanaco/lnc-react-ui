import React from "react";
import DatePicker from "./index";
import Story from "./Story";

export default {
  title: "Date Picker",
  component: DatePicker,
};

const Template = (args) => <Story {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  format: "dd.MM.yyyy",
  size: "small",
  color: "primary",
  disabled: false,
};
