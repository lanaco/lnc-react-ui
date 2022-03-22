import React from "react";
import SearchBar from ".";
import Chip from "../../Data display/Chip/index";
import Example from "./Example";
import theme from "../../_utils/theme";

export default {
  title: "Inputs/SearchBar",
  component: SearchBar,
  subcomponents: { Chip },
};

const Template = (args) => <Example args={args} />;

export const Primary = Template.bind({});
Primary.args = {
  theme: theme,
  color: "primary",
  size: "small",
};
