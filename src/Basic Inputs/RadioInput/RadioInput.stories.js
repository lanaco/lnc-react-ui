import React from "react";
import RadioInput from ".";
import StoryContainer from "../../_utils/StoryContainer";

export default {
  title: "Basic Inputs/Radio Input",
  component: RadioInput,
};

const Template = (args) => (
  <StoryContainer>
    <RadioInput {...args} size={"small"} />
    <RadioInput {...args} size={"medium"} />
    <RadioInput {...args} size={"large"} />
  </StoryContainer>
);

export const PrimaryUnchecked = Template.bind({});
PrimaryUnchecked.args = {
  id: "radio",
  checked: false,
  disabled: false,
  readOnly: false,
  tabIndex: 0,
  onChange: () => {},
  color: "primary",
  size: "small",
  label: "Radio input",
  style: {},
};

export const PrimaryChecked = Template.bind({});
PrimaryChecked.args = {
  id: "radio",
  checked: true,
  disabled: false,
  readOnly: false,
  tabIndex: 0,
  onChange: () => {},
  color: "primary",
  size: "small",
  label: "Radio input",
  style: {},
};

export const SecondaryUnchecked = Template.bind({});
SecondaryUnchecked.args = {
  id: "radio",
  checked: false,
  disabled: false,
  readOnly: false,
  tabIndex: 0,
  onChange: () => {},
  color: "secondary",
  size: "small",
  label: "Radio input",
  style: {},
};

export const SecondaryChecked = Template.bind({});
SecondaryChecked.args = {
  id: "radio",
  checked: true,
  disabled: false,
  readOnly: false,
  tabIndex: 0,
  onChange: () => {},
  color: "secondary",
  size: "small",
  label: "Radio input",
  style: {},
};

export const UncheckedDisabled = Template.bind({});
UncheckedDisabled.args = {
  id: "radio",
  checked: false,
  disabled: true,
  readOnly: false,
  tabIndex: 0,
  onChange: () => {},
  color: "primary",
  size: "small",
  label: "Radio input",
  style: {},
};

export const CheckedDisabled = Template.bind({});
CheckedDisabled.args = {
  id: "radio",
  checked: true,
  disabled: true,
  readOnly: false,
  tabIndex: 0,
  onChange: () => {},
  color: "primary",
  size: "small",
  label: "Radio input",
  style: {},
};
