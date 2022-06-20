import React from "react";
import RadioGroup from ".";
import StoryContainer from "../../_utils/StoryContainer";

export default {
  title: "Inputs/Radio Group",
  component: RadioGroup,
  argTypes: {},
};

const Template = (args) => (
  <StoryContainer>
    <RadioGroup {...args} size={"small"} id={"rg1"} />
    <RadioGroup {...args} size={"medium"} id={"rg2"} />
    <RadioGroup {...args} size={"large"} id={"rg3"} />
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {
  id: "",
  value: null,
  disabled: false,
  readOnly: false,
  items: [
    { id: "1", value: "Option 1" },
    { id: "2", value: "Option 2" },
    { id: "3", value: "Option 3" },
  ],
  mapId: "id",
  mapValue: "value",
  emptySelectText: "Select...",
  //----------------
  onChange: () => {},
  onBlur: () => {},
  //----------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
};
