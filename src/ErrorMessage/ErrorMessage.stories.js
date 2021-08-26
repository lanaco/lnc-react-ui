import React from "react";

import ErrorMessage from "./index";

export default {
  title: "ErrorMessage",
  component: ErrorMessage,
};

const Template = (args) => (
  <div>
    <ErrorMessage {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  message: "Error message",
  size: "small",
};
