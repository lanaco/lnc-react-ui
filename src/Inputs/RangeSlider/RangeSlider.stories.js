import React from "react";
import RangeSlider from ".";
import theme from "../../_utils/theme";

export default {
  title: "Inputs/Range Slider",
  component: RangeSlider,
  argTypes: {},
};

const Template = (args) => (
  <>
    <p>
      <RangeSlider {...args} />
    </p>
  </>
);

export const Default = Template.bind({});
Default.args = {};
