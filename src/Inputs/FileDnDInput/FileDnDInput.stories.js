import React from "react";
import FileDnDInput from "./index";

export default {
  title: "Inputs/File DnD Input",
  component: FileDnDInput,
}
const Template = (args) => (
    <div style={{ width: "350px" }}>
      <FileDnDInput {...args} id="file-dnd" />
    </div>
);

export const Default = Template.bind({});
Default.args = {
};