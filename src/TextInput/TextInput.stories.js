import React from "react";
import TextInput from ".";


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
  disabled: false,
  size: "s",
  value: "aaa",
  onChange: (val) => console.log(val),
};
