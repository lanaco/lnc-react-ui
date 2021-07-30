import React from "react";

import Icon from "./index";

export default {
  title: "Icon",
  component: Icon,
  //   argTypes: {
  //     backgroundColor: { control: "color" },
  //   },
};

const Template = (args) => <Icon {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  tooltipText: "Normal",
  disabled: false,
  iconClassName: "lnc-bell",
};

export const Disabled = Template.bind({});
Disabled.args = {
  tooltipText: "Disabled",
  disabled: true,
  iconClassName: "lnc-table",
};

export const UpArrow = Template.bind({});
UpArrow.args = {
  tooltipText: "UpArrow",
  disabled: false,
  iconClassName: "lnc-up",
};

export const DownArrow = Template.bind({});
DownArrow.args = {
  tooltipText: "DownArrow",
  disabled: true,
  iconClassName: "lnc-down",
};
