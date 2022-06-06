import React from "react";
import FileInput from ".";

export default {
  title: "Basic Inputs/File Input",
  component: FileInput,
};

const Template = (args) => (
  <div style={{ width: "200px" }}>
    <FileInput {...args} id="file" />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  size: "small",
  color: "primary",
};
