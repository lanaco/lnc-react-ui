import React from "react";
import CheckBox from ".";
// import TextIconButton from "../TextIconButton/index";
import theme from "../_utils/theme";

export default {
  title: "CheckBox",
  component: CheckBox,
  argTypes: {},
};

// var btnArgs = {
//   theme: theme,
//   color: "primary",
//   text: "Button",
//   tooltipText: "Button",
//   onClick: () => {},
//   size: "small",
//   disabled: false,
// };

// var divStyle = {
//   margin: "0",
//   padding: "0",
//   display: "inline-block",
//   marginRight: "10px",
// };

// var containerStyle = {
//   display: "flex",
//   flexDirection: "row",
//   alignItems: "center",
//   padding: "10px",
// };

const Template = (args) => (
  <>
    <p>
      <CheckBox {...args} />
    </p>
    {/* <div style={containerStyle}>
      <div style={divStyle}>
        <CheckBox {...args} size="small" id="a" />
      </div>
      <div style={divStyle}>
        <TextIconButton {...btnArgs} size="small" />
      </div>
    </div>
    <div style={containerStyle}>
      <div style={divStyle}>
        <CheckBox {...args} size="medium" id="b" />
      </div>
      <div style={divStyle}>
        <TextIconButton {...btnArgs} size="medium" />
      </div>
    </div>
    <div style={containerStyle}>
      <div style={divStyle}>
        <CheckBox {...args} size="large" id="c" />
      </div>
      <div style={divStyle}>
        <TextIconButton {...btnArgs} size="large" />
      </div>
    </div> */}
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
