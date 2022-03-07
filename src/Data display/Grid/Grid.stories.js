import React from "react";
import Grid from ".";
import { default as BasicGrid } from "./storyTemplates/Basic";
import { default as PaginationGrid } from "./storyTemplates/Pagination";

export default {
  title: "Data display/Grid",
  component: Grid,
};

const _Basic = (args) => <BasicGrid />;
export const Basic = _Basic.bind({});
Basic.args = {
  color: "primary",
};

const _Pagination = (args) => <PaginationGrid />;
export const Pagination = _Pagination.bind({});
Pagination.args = { color: "primary" };
