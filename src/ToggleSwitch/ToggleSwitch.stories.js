import React from "react";
import ToggleSwitch from ".";
import theme from "../_utils/theme";

export default {
  title: "Switch",
  component: ToggleSwitch,
  argTypes: {},
};

const Template = (args) => (
  <>
    <p>
      <ToggleSwitch {...args} />
    </p>
  </>
);

export const Default = Template.bind({});
Default.args = {
  theme: theme,
  color: "secondary",
  size: "small",
  value: false,
  disabled: false,
};
