import React from "react";
import ToggleSwitch from ".";
import theme from "../../_utils/theme";

export default {
  title: "Inputs/Switch",
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
  size: "large",
  value: false,
  disabled: false,
  label: "Toggle",
};
