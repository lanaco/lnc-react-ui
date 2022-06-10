import React from "react";
import DragDropFileInput from ".";

export default {
  title: "Inputs/Drag & Drop File Input",
  component: DragDropFileInput,
  argTypes: {},
};

const Template = (args) => (
  <>
    <p>
      <DragDropFileInput {...args} />
    </p>
  </>
);

export const Default = Template.bind({});
Default.args = {};
