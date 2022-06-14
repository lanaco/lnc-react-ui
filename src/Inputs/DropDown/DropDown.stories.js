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
    <DropDown {...args} size={"small"} />
    <DropDown {...args} size={"medium"} />
    <DropDown {...args} size={"large"} />
  </StoryContainer>
);

export const Default = Template.bind({});
Default.args = {
  id: "",
  value: -1,
  disabled: false,
  readOnly: false,
  items: [
    { id: 1, value: "Option 1" },
    { id: 2, value: "Option 2" },
    { id: 3, value: "Option 3" },
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
