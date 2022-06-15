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

export const AcceptsImages = Template.bind({});
AcceptsImages.args = {
  id: "",
  disabled: false,
  preventDefault: false,
  accept: {'image/jpeg': [], 'image/jpg': [], 'image/png': ['.png'],},
  multiple: true,
  selectFileText: "Select file",
  dndFileText: "Drag and drop file here or",
  showFileSize: true,
  files: [],
  //------------------
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onDropAccepted: () => {},
  onDrop: () => {},
  onFileClick: () => {},
  onCancel: () => {},
  //------------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
};

export const WithUploadedFiles = Template.bind({});
WithUploadedFiles.args = {
  id: "",
  disabled: false,
  preventDefault: false,
  accept: {},
  multiple: true,
  selectFileText: "Select file",
  dndFileText: "Drag and drop file here or",
  showFileSize: true,
  files: [{name: "File 1", size: 2000}, {name: "File 2", size: 1500}],
  //------------------
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onDropAccepted: () => {},
  onDrop: () => {},
  onFileClick: () => {},
  onCancel: () => {},
  //------------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
};