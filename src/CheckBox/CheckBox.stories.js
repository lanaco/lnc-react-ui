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
    <div style={{ padding: "10px" }} label="" id="check1">
      <CheckBox {...args} />
    </div>
    <div style={{ padding: "10px" }}>
      <CheckBox {...args} label="Checkbox" id="check2" />
    </div>
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
  // label: "Checkbox",
};
