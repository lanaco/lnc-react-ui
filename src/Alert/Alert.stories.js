import React from "react";

import Alet from "./index";

export default {
  title: "Alet",
  component: Alet,
};

const Template = (args) => (
  <div>
    <Alet {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  message: "Error message",
  size: "small",
  color: "error",
  hasContainer: true,
};
