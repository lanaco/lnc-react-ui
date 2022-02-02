import React from "react";
import Table from "./";
import StoryTemplate from "./StoryTemplate";
import theme from "../_utils/theme";

export default {
  title: "Standard Table",
  component: Table,
};

const Template = (args) => <StoryTemplate {...args} />;

export const Default = Template.bind({});
Default.args = {
  theme: theme,
  color: "primary",
  size: "medium",
};
