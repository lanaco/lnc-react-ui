import React from "react";
import AdvancedGrid from ".";
import { default as BasicTemplate } from "./templates/Basic";

export default {
  title: "Advanced Grid",
  component: AdvancedGrid,
};

const _Basic = (args) => <BasicTemplate />;
export const Basic = _Basic.bind({});
Basic.args = {
  color: "primary",
};
