import React from "react";
import DragDropFileInput from ".";
import DragAndDropFile from "../DragAndDropFile";
import UploadedFile from "../../General/UploadedFile";

export default {
  title: "Inputs/Drag & Drop File Input",
  component: DragDropFileInput,
  argTypes: {},
  subcomponents: { DragAndDropFile, UploadedFile }
};

const Template = (args) => (
  <>
      <DragDropFileInput {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {};
