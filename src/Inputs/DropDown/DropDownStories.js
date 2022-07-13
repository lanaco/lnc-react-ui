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
    <DropDown {...args} size={"small"} tabIndex={1} id={"dd1"} />
    <DropDown {...args} size={"medium"} tabIndex={2} id={"dd2"} />
    <DropDown {...args} size={"large"} tabIndex={3} id={"dd3"} value={10} />
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
    { id: 4, value: "Option 4" },
    { id: 5, value: "Option 5" },
    { id: 6, value: "Option 6" },
    { id: 7, value: "Option 7" },
    { id: 8, value: "Option 8" },
    { id: 9, value: "Option 9" },
    { id: 10, value: "Option 10" },
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
