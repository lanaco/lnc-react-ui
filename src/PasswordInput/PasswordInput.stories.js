import React from "react";
import PasswordInput from ".";
import TextIconButton from "../TextIconButton/index";
import theme from "../_utils/theme";

export default {
  title: "Password input",
  component: PasswordInput,
  argTypes: {},
};

var cbArgs = {
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
  marginRight: "10px",
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
        <PasswordInput {...args} />
      </div>
      <div style={divStyle}>
        <TextIconButton {...cbArgs} />
      </div>
    </div>
    {/* <div style={containerStyle}>
      <div style={divStyle}>
        <TextIconButton {...args} size="medium" />
      </div>
      <div style={divStyle}>
        <CheckBox {...cbArgs} size="medium" id="2" />
      </div>
    </div>
    <div style={containerStyle}>
      <div style={divStyle}>
        <TextIconButton {...args} size="large" />
      </div>
      <div style={divStyle}>
        <CheckBox {...cbArgs} size="large" id="3" />
      </div>
    </div> */}
    {/* <p>
      <TextIconButton {...args} />
    </p> */}
  </>
);

export const Password = Template.bind({});
Password.args = {
  theme: theme,
  color: "primary",
  text: "Button",
  tooltipText: "Button",
  onClick: () => {},
  size: "small",
  disabled: false,
};
