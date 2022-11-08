import React from "react";
import DateInput from "./index";
import Story from "./Story";

export default {
  title: "Date Input",
  component: DateInput,
};

const Template = (args) => <>
  <div id="portal-root"></div>
  <Story {...args} />
</>;

export const Normal = Template.bind({});
Normal.args = {
  targetID: "portal-root",
  id: "rwar",
  format: "dd.MM.yyyy",
  size: "small",
  color: "primary",
  disabled: false,
  minDate: "01.01.2020",
  maxDate: "31.12.2022",
};
