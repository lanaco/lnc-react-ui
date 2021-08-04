import React from "react";
import CheckBox from ".";
import theme from "../_utils/theme";

export default {
  title: "CheckBox",
  component: CheckBox,
  argTypes: {},
};

const Template = (args) => (
  <>
    <p>
      <CheckBox {...args} />
    </p>
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
