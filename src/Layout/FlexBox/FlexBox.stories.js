import React from "react";
import FlexBox from ".";

export default {
  title: "Layout/FlexBox",
  component: FlexBox,
};

const Template = (args) => (
  <FlexBox {...args}>
    <div
      style={{
        backgroundColor: "#00628F",
        color: "white",
        padding: "10px",
        height: "100px",
      }}
    >
      Child with height
    </div>
    <div
      style={{
        backgroundColor: "#00628F",
        color: "white",
        padding: "10px",
      }}
    >
      Child
    </div>
    <div
      style={{
        backgroundColor: "#00628F",
        color: "white",
        padding: "10px",
      }}
    >
      Child
    </div>
  </FlexBox>
);

export const Default = Template.bind({});
Default.args = {
  justifyContent: "SpaceEvenly",
  alignItems: "Center",
  direction: "Row",
};
