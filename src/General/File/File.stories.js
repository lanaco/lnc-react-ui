import React from "react";
import File from "./index";

export default {
    title: "General/File",
    component: File,
};

const Template = (args) => (
    <div style={{ width: "350px" }}>
        <File {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    id: "file-doc",
};