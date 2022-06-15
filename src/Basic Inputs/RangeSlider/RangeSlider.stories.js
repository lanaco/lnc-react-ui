import React from "react";
import RangeSlider from ".";

export default {
  title: "Basic Inputs/Range Slider",
  component: RangeSlider,
  argTypes: {},
};

const Template = (args) => (
  <>
    <br />
    <RangeSlider {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {};
