import React from "react";
import NumberInput from ".";

export default {
  title: "Basic Inputs/Number Input",
  component: NumberInput
};

const Template = (args) => (
  <div style={{ width: "150px" }}>
    <NumberInput {...args}/>
  </div>
);

export const Default = Template.bind({});