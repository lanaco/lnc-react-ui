import React from "react";

import Chip from "./index";

export default {
  title: "Chip",
  component: Chip,
};

const Template = (args) => (
  <div>
    <Chip {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  color: "secondary",
  size: "small",
  text: "Chip",
  inactive: false,
  disabled: false,
};

export const AdditionalInfo = Template.bind({});
AdditionalInfo.args = {
  color: "secondary",
  size: "small",
  text: "Chip",
  additionalInfo: "123",
  inactive: false,
  disabled: false,
};
