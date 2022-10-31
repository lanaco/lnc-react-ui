import React from "react";
import Tooltip from ".";
import SimpleTooltipExample from "./SimpleTooltipExample";

export default {
    title: "Tooltip",
    component: Tooltip,
    argTypes: {},
};


const Template = (args) => (
    <>
        <div id="modal-root"></div>
        <SimpleTooltipExample {...args} />
    </>
);

export const SimpleTooltip = Template.bind({});
SimpleTooltip.args = {
    targetID: "modal-root",
};