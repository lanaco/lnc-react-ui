import React from "react";
import NumberInput from ".";
import StoryContainer from "../../_utils/StoryContainer";

export default {
  title: "Basic Inputs/Number Input",
  component: NumberInput,
};

const Template = (args) => (
  <StoryContainer>
    <NumberInput {...args} size={"small"} />
    <NumberInput {...args} size={"medium"} />
    <NumberInput {...args} size={"large"} />
  </StoryContainer>
);

export const Primary = Template.bind({});
Primary.args = {
  id: "",
  value: 1,
  defaultValue: 0,
  disabled: false,
  readOnly: false,
  debounceTime: 180,
  step: 1,
  min: -10,
  max: 10,
  placeholder: "",
  className: "",
  style: {},
  size: "small",
  color: "primary",
};

export const SecondaryStep = Template.bind({});
SecondaryStep.args = {
  id: "",
  value: 2,
  defaultValue: 0,
  disabled: false,
  readOnly: false,
  debounceTime: 180,
  step: 2,
  min: -20,
  max: 20,
  placeholder: "",
  className: "",
  style: {},
  size: "small",
  color: "secondary",
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: "",
  value: 0,
  defaultValue: 0,
  disabled: true,
  readOnly: false,
  debounceTime: 180,
  step: 1,
  min: -10,
  max: 10,
  placeholder: "",
  className: "",
  style: {},
  size: "small",
  color: "primary",
};
