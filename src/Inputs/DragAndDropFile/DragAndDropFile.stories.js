import React from "react";
import DragAndDropFile from ".";

export default {
  title: "Inputs/Drag & Drop File",
  component: DragAndDropFile,
  argTypes: {},
};

const Template = (args) => (
  <>
    <p>
      <DragAndDropFile {...args} />
    </p>
  </>
);

export const Default = Template.bind({});
Default.args = {};
