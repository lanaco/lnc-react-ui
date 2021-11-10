import React from "react";
import Test from "./";
import theme from "../_utils/theme";

export default {
  title: "Test",
  component: Test,
};

const Template = (args) => (
  <div>
    <Test {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
