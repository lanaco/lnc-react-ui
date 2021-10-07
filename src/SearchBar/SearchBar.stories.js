import React from "react";
import SearchBar from ".";
import Example from "./Example";
import theme from "../_utils/theme";
import dataTypes from "./DataTypes";
import operationTypes, { getStringOperationTypes } from "./OperationTypes";

export default {
  title: "SearchBar",
  component: SearchBar,
};

const Template = (args) => <Example args={args} />;

export const Primary = Template.bind({});
Primary.args = {
  theme: theme,
  color: "primary",
  size: "small",
};
