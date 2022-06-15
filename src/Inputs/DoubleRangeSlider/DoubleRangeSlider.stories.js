import React from "react";
import DoubleRangeSlider from ".";

export default {
  title: "Inputs/Double Range Slider",
  component: DoubleRangeSlider,
  argTypes: {},
};

const Template = (args) => (
  <>
    <br />
    <DoubleRangeSlider {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {};
