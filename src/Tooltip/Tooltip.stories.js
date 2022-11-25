import React from "react";
import Tooltip from ".";

export default {
    title: "Tooltip",
    component: Tooltip,
    argTypes: {},
};

const GetTooltipContent = () => {
    return (<div><h3>TOOLTIP</h3><p>This is simple tooltip content</p></div>);
}


const Template = (args) => (
    <>
        <div id="modal-root"></div>
        <div style={{ height: "100vh", width: "100vw", display: "grid", gridTemplateRows: "1fr 1fr", gridTemplateColumns: "1fr 1fr" }}>
            <Tooltip {...args}>
                <div style={{ border: "1px solid red" }}>
                    Hover here to show tooltip
                </div>
            </Tooltip>
            <Tooltip {...args}>
                <div>
                    Or here
                </div>
            </Tooltip>
            <Tooltip {...args}>
                <div>
                    Or here :)
                </div>
            </Tooltip>
            <Tooltip {...args}>
                <div>
                    Or here
                </div>
            </Tooltip>
        </div>
    </>
);

export const SimpleTooltip = Template.bind({});
SimpleTooltip.args = {
    targetID: "#modal-root",
    renderContent: GetTooltipContent
};