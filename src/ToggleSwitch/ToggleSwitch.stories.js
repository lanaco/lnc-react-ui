import React from "react";
import ToggleSwitch from ".";
import Button from "../Button/index";
import theme from "../_utils/theme";

export default {
  title: "Switch",
  component: ToggleSwitch,
  argTypes: {},
};

var btnArgs = {
  theme: theme,
  color: "primary",
  text: "Button",
  tooltipText: "Button",
  onClick: () => {},
  size: "small",
  disabled: false,
};

var divStyle = {
  margin: "0",
  padding: "0",
  display: "inline-block",
  marginRight: "50px",
};

var containerStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "10px",
};

const Template = (args) => (
  <>
    <div style={containerStyle}>
      <div style={divStyle}>
        <ToggleSwitch {...args} />
      </div>
      <div style={divStyle}>
        <Button {...btnArgs} />
      </div>
    </div>
  </>
);

export const Switch = Template.bind({});
Switch.args = {
  theme: theme,
  color: "primary",
  size: "small",
};
