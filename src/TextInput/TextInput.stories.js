import React from "react";
import TextInput from ".";
// import TextIconButton from "../TextIconButton/index";
import theme from "../_utils/theme";

export default {
  title: "Text Input",
  component: TextInput,
  argTypes: {
    bgColor: { control: "color" },
    textColor: { control: "color" },
    accentColor: { control: "color" },
  },
};

// var btnArgs = {
//   theme: theme,
//   color: "primary",
//   text: "Button",
//   tooltipText: "Button",
//   onClick: () => {},
//   size: "large",
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
  // <>
  //   <div style={containerStyle}>
  //     <div style={divStyle}>
  //       <TextInput {...args} />
  //     </div>
  //     <div style={divStyle}>
  //       <TextIconButton {...btnArgs} />
  //     </div>
  //   </div>
  //   <div style={containerStyle}>
  //     <div style={divStyle}>
  //       <TextInput {...args} />
  //     </div>
  //     <div style={divStyle}>
  //       <TextIconButton {...btnArgs} />
  //     </div>
  //   </div>
  //   <div style={containerStyle}>
  //     <div style={divStyle}>
  //       <TextInput {...args} />
  //     </div>
  //     <div style={divStyle}>
  //       <TextIconButton {...btnArgs} />
  //     </div>
  //   </div>
  // </>
  <div>
    <TextInput {...args} />
  </div>
);

export const Input = Template.bind({});
Input.args = {
  theme: theme,
  color: "primary",
  onChange: () => {},
  size: "medium",
  disabled: false,
};
