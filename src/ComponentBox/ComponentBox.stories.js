import React from "react";
import ComponentBox from ".";
import ComponentBoxExample from "./ComponentBoxExample";
import theme from "../_utils/theme";

export default {
  title: "ComponentBox",
  component: ComponentBox,
  argTypes: {},
};

const Template = (args) => (
  <>
    <ComponentBoxExample {...args} />
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
