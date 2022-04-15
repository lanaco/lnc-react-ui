import React from "react";
import EmailInput from ".";

export default {
  title: "Basic Inputs/Email Input",
  component: EmailInput
};

const Template = (args) => (
  <div style={{ width: "250px" }}>
    <EmailInput {...args}/>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  color: "primary",
  size: "medium",
  disabled: false,
  readOnly: false,
  // value: "text",
  autoFocus: true,
  onInput: () => { },
  icon: "envelope",
};