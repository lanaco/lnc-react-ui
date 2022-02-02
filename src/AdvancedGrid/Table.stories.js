import React from "react";
import Table from ".";
import { default as BasicTemplate } from "./templates/Basic";

export default {
  title: "Table",
  component: Table,
};

const _Basic = (args) => <BasicTemplate />;
export const Basic = _Basic.bind({});
Basic.args = {
  color: "primary",
};
