import React from "react";
import MultiSelectDropdown from "./index";
import Example from "./Example";
import theme from "../_utils/theme";

export default {
  title: "MultiSelectDropdown",
  component: MultiSelectDropdown,
  argTypes: {},
};

const Template = (args) => (
  <>
    <Example args={args} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  theme: theme,
  color: "primary",
  size: "small",
  options: [
    { id: 4, value: "prva opcija" },
    { id: 5, value: "druga opcija" },
  ],
};
