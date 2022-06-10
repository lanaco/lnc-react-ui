import React from "react";
import ColorInput from ".";
import theme from "../../_utils/theme";

export default {
  title: "Basic Inputs/Color Input",
  component: ColorInput,
};

const Template = (args) => (
  <div style={{ width: "70px" }}>
    <ColorInput {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  id: "color-input",
  disabled: false,
  readOnly: false,
  preventDefault: true,
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  className: "",
  style: {},
  size: "small",
  color: "primary",
};
