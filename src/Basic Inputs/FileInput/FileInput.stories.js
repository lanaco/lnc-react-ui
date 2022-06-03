import React from "react";
import FileInput from ".";

export default {
  title: "Basic Inputs/File Input",
  component: FileInput,
};

const Template = (args) => <FileInput {...args} id="file" />;

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  size: "small",
  color: "primary",
};
