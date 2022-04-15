import React from "react";
import DecimalInput from ".";

export default {
  title: "Basic Inputs/Decimal Input",
  component: DecimalInput
};

const Template = (args) => (
  <div style={{ width: "150px" }}>
    <DecimalInput {...args}/>
  </div>
);

export const Default = Template.bind({});
