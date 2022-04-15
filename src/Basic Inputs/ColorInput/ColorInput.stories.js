import React from "react";
import ColorInput from ".";

export default {
  title: "Basic Inputs/Color Input",
  component: ColorInput
};

const Template = (args) => (
  <ColorInput {...args}/>
);

export const Default = Template.bind({});
