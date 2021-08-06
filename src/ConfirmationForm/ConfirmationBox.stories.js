import React from "react";
import ConfitmationBox from ".";
import ConfitmationBoxExample from "./ConfirmationBoxExample";
import theme from "../_utils/theme";

export default {
  title: "ConfitmationBox",
  component: ConfitmationBox,
  argTypes: {},
};

const Template = (args) => (
  <>
    <ConfitmationBoxExample {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  id: "check",
  disabled: false,
  checked: true,
  onChange: () => alert("aa"),
  color: "secondary",
  size: "small",
  theme: theme,
  label: "Checkbox",
};
