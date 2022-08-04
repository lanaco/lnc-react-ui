import React from "react";

import Alert from "./index";

export default {
  title: "Feedback/Alert",
  component: Alert,
};

const Template = (args) => (
  <div>
    <Alert {...args} title={<div>TITLE</div>} actions={<a onClick={() => {alert("HELLO")}}>Click me</a>}>ALERT</Alert>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  message: "Error message",
  size: "small",
  hasContainer: true,
};
