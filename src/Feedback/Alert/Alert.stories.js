import React from "react";

import Alert from "./index";

export default {
  title: "Feedback/Alert",
  component: Alert,
};

const Template = (args) => (
  <div>
    <Alert {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  message: "Error message",
  size: "small",
  color: "error",
  hasContainer: true,
};
