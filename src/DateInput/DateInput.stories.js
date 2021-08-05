import React from "react";
import DateInput from "./index";

export default {
  title: "DateInput",
  component: DateInput,
  //   argTypes: {
  //     backgroundColor: { control: "color" },
  //   },
};

const Template = (args) => <DateInput {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
