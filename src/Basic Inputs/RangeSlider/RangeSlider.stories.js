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


export const Disabled = Template.bind({});
Disabled.args = {
  value: null,
  min: 0,
  max: 100,
  disabled: true,
  //------------------
  onChange: (value) => {},
  onInput: (e) => {},
  //------------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
};

export const WiderRange = Template.bind({});
WiderRange.args = {
  value: 400,
  min: -500,
  max: 500,
  disabled: false,
  //------------------
  onChange: (value) => {},
  onInput: (e) => {},
  //------------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
};