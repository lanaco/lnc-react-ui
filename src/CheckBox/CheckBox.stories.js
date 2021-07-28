import React from "react";
import CheckBox from ".";
import theme from "../_utils/theme";

export default {
  title: "CheckBox",
  component: CheckBox,
  argTypes: {},
};

const Template = (args) => (
  <div>
    <CheckBox {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  checked: true,
  onChange: () => {},
  color: "secondary",
  size: "large",
  theme: theme,
};
