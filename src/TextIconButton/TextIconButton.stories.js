import React from "react";
import TextIconButton from ".";
import CheckBox from "../CheckBox/index";
import theme from "../_utils/theme";

export default {
  title: "New Button",
  component: TextIconButton,
  argTypes: {},
};

// var cbArgs = {
//   id: "check",
//   disabled: false,
//   checked: true,
//   onChange: () => alert("aa"),
//   color: "secondary",
//   size: "small",
//   theme: theme,
//   label: "Checkbox",
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
    {/* <div style={containerStyle}>
      <div style={divStyle}>
        <TextIconButton {...args} />
      </div>
      <div style={divStyle}>
        <CheckBox {...cbArgs} id="1" />
      </div>
    </div>
    <div style={containerStyle}>
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
    <p>
      <TextIconButton {...args} />
    </p>
  </>
);

export const JustText = Template.bind({});
JustText.args = {
  theme: theme,
  color: "primary",
  text: "Button",
  tooltipText: "Button",
  onClick: () => {},
  size: "small",
  disabled: false,
};

export const JustIcon = Template.bind({});
JustIcon.args = {
  theme: theme,
  color: "primary",
  tooltipText: "Button",
  onClick: () => {},
  iconClassName: "lnc-refresh",
  size: "small",
  disabled: false,
};

export const TextAndIconToLeft = Template.bind({});
TextAndIconToLeft.args = {
  theme: theme,
  color: "primary",
  text: "Button",
  tooltipText: "Button",
  onClick: () => {},
  iconClassName: "lnc-refresh",
  iconLocation: "left",
  size: "small",
  disabled: false,
};

export const TextAndIconToRight = Template.bind({});
TextAndIconToRight.args = {
  theme: theme,
  color: "primary",
  text: "Button",
  tooltipText: "Button",
  onClick: () => {},
  iconClassName: "lnc-refresh",
  iconLocation: "right",
  size: "small",
  disabled: false,
};
