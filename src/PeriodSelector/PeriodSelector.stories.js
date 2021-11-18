import React from "react";
import PeriodSelector from "./index";

export default {
  title: "Period selector",
  component: PeriodSelector,
};

const Template = (args) => <PeriodSelector {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  startDate: "17.08.2021.",
  endDate: "01.01.2022.",
  onStartDateChange: (_, value) => console.log(value),
  onEndDateChange: (_, value) => console.log(value),
  size: "small",
  color: "primary",
  disabled: false,
};
