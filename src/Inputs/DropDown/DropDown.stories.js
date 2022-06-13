import React from "react";
import DropDown from ".";
import TextInput from "../../Basic Inputs/TextInput/index";
import theme from "../../_utils/theme";
import StoryContainer from "../../_utils/StoryContainer";

export default {
  title: "Inputs/Dropdown",
  component: DropDown,
  argTypes: {},
};

const Template = (args) => (
  <StoryContainer>
    <DropDown {...args} />
    <TextInput placeholder={"Type..."} />
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {
  theme: theme,
  color: "primary",
  tooltip: "Dropdown",
  onChange: () => {},
  size: "medium",
  disabled: false,
  items: [
    { name: "Name 11", value: 1 },
    { name: "Name 222", value: 2 },
    { name: "Name 333333333", value: 3 },
  ],
};
