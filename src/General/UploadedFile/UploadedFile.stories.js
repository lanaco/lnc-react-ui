import React from "react";
import UploadedFile from "./index";

export default {
    title: "General/UploadedFile",
    component: UploadedFile,
};

const Template = (args) => (
    <div style={{ width: "350px" }}>
        <UploadedFile {...args} />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    id: "file-doc",
};