import React from "react";
import TextInput from ".";
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

const Template = (args) => (
  <div>
    <TextInput {...args} />
  </div>
);

export const Input = Template.bind({});
Input.args = {
  theme: theme,
  color: "primary",
  text: "Button",
  tooltipText: "Button",
  onChange: (id, value) => {
    console.log("cejndz hendler:", id, value);
  },
  size: "medium",
  disabled: false,
};
