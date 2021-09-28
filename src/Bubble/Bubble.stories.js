import React from "react";

import Bubble from "./index";

export default {
  title: "Bubble",
  component: Bubble,
};

const Template = (args) => (
  <div>
    <Bubble {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  color: "secondary",
  size: "small",
  text: "Bubble",
  inactive: false,
  disabled: false,
};
