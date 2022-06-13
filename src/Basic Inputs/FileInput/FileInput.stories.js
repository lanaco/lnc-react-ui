import React from "react";
import FileInput from ".";
import StoryContainer from "../../_utils/StoryContainer";

export default {
  title: "Basic Inputs/File Input",
  component: FileInput,
};

const Template = (args) => (
  <StoryContainer>
    <FileInput {...args} id="file1" size={"small"} />
    <FileInput {...args} id="file2" size={"medium"} />
    <FileInput {...args} id="file3" size={"large"} />
  </StoryContainer>
);

export const Primary = Template.bind({});
Primary.args = {
  id: "",
  disabled: false,
  readOnly: false,
  accept: "",
  chooseFileText: "Choose file",
  className: "",
  style: {},
  size: "small",
  color: "primary",
};

export const SecondaryOnlyTxt = Template.bind({});
SecondaryOnlyTxt.args = {
  id: "",
  disabled: false,
  readOnly: false,
  accept: ".txt",
  chooseFileText: "Izaberi fajl",
  className: "",
  style: {},
  size: "small",
  color: "secondary",
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: "",
  disabled: true,
  readOnly: false,
  accept: "",
  chooseFileText: "Choose file",
  className: "",
  style: {},
  size: "small",
  color: "primary",
};
