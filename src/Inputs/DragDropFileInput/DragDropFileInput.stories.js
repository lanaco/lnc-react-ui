import React from "react";
import DragDropFileInput from ".";
import theme from "../../_utils/theme";

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
