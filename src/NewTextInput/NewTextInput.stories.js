import React from "react";

import NewTextInput from ".";
import TextIconButton from "../TextIconButton";

export default {
  title: "New Text Input",
  component: NewTextInput,
  argTypes: {
    bgColor: { control: "color" },
    textColor: { control: "color" },
    accentColor: { control: "color" },
  },
};

const Template = (args) => (
  <div>
    <NewTextInput {...args} />
  </div>
);

export const Input = Template.bind({});
Input.args = {
  disabled: false,
  size: "s",
  value: "aaa",
  onChange: (val) => console.log(val),
};
