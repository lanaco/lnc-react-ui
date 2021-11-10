import React from "react";
import DropdownLookup from "./index";
import Example from "./Example";
import theme from "../_utils/theme";

export default {
  title: "DropdownLookup",
  component: DropdownLookup,
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
    { id: 1, value: "prva opcija", key: "prva opcija" },
    { id: 2, value: "druga opcija", key: "druga opcija opcija" },
  ],
};
