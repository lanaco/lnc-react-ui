import React from "react";
import TextInput from ".";
import StoryContainer from "../../_utils/StoryContainer";

export default {
  title: "Basic Inputs/Text Input",
  component: TextInput,
  argTypes: {},
};

const Template = (args) => (
  <StoryContainer>
    <TextInput {...args} size={"small"} />
    <TextInput {...args} size={"medium"} />
    <TextInput {...args} size={"large"} />
  </StoryContainer>
);

export const Primary = Template.bind({});
Primary.args = {
  id: "",
  value: "",
  disabled: false,
  readOnly: false,
  debounceTime: 180,
  placeholder: "",
  type: "text",
  className: "",
  style: {},
  size: "small",
  color: "primary",
};

export const SecondaryPlaceholder = Template.bind({});
SecondaryPlaceholder.args = {
  id: "",
  value: "",
  disabled: false,
  readOnly: false,
  debounceTime: 180,
  placeholder: "Type something...",
  type: "text",
  className: "",
  style: {},
  size: "small",
  color: "secondary",
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: "",
  value: "Disabled",
  disabled: true,
  readOnly: false,
  debounceTime: 180,
  placeholder: "",
  type: "text",
  className: "",
  style: {},
  size: "small",
  color: "primary",
};
