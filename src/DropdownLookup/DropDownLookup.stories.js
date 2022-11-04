import React from "react";
import theme from "../_utils/theme";
import Example from "./Example";
import DropdownLookup from "./index";

export default {
  title: "DropdownLookup",
  component: DropdownLookup,
  argTypes: {},
};

const Template = (args) => (
  <>
    <div id="portal-root"></div>
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
