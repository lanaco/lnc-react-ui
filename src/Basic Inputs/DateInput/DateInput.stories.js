import React from "react";
import DateInput from "./index";
import StoryContainer from "../../_utils/StoryContainer";

export default {
  title: "Basic Inputs/Date Input",
  component: DateInput,
};

const Template = (args) => (
  <StoryContainer>
    <DateInput {...args} size={"small"} />
    <DateInput {...args} size={"medium"} />
    <DateInput {...args} size={"large"} />
  </StoryContainer>
);

export const PlaceholderValue = Template.bind({});
PlaceholderValue.args = {
  format: "DD.MM.YYYY",
  size: "small",
  color: "primary",
  value: "",
  disabled: false,
  readOnly: false,
};

export const SecondaryMinMax = Template.bind({});
SecondaryMinMax.args = {
  format: "DD.MM.YYYY",
  size: "small",
  color: "secondary",
  value: "2022-01-01",
  disabled: false,
  readOnly: false,
  minDate: "2022-01-01",
  maxDate: "2022-12-31",
};

export const DisabledDifferentFormat = Template.bind({});
DisabledDifferentFormat.args = {
  format: "YYYY-MM-DD",
  size: "small",
  color: "primary",
  value: "2022-01-01",
  disabled: true,
  readOnly: false,
};
