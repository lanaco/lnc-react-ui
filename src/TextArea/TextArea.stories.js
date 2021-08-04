import React from "react";
import TextArea from "./";
import theme from "../_utils/theme";

export default {
  title: "Text Area",
  component: TextArea,
  argTypes: {},
};

const Template = (args) => (
  <div>
    <TextArea {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  theme: theme,
  color: "primary",
  onChange: () => {},
  size: "medium",
  disabled: false,
};
