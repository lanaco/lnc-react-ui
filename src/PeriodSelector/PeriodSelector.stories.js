import React from "react";
import PeriodSelector from "./index";
import Story from "./Story";

export default {
  title: "Period selector",
  component: PeriodSelector,
};

const Template = (args) => <Story {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  dateFormat: "dd.MM.yyyy",
  size: "small",
  color: "primary",
  disabled: false,
};
