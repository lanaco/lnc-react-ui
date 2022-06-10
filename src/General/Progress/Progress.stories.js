import React from "react";
import Progress from "./index";

export default {
    title: "General/Progress",
    component: Progress,
}
const Template = (args) => (
    <div style={{ width: "350px" }}>
        <Progress {...args} id="progress" />
    </div>
);


export const Default = Template.bind({});
Default.args = {
};

