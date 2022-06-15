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
    <DropDown {...args} size={"large"} tabIndex={3} id={"dd3"} />
    <select>
      <option value={1}>1</option>
      <option value={2}>1</option>
      <option value={3}>1</option>
      <option value={4}>1</option>
      <option value={5}>1</option>
      <option value={6}>1</option>
      <option value={7}>1</option>
      <option value={8}>1</option>
      <option value={9}>1</option>
      <option value={10}>1</option>
      <option value={11}>1</option>
      <option value={12}>1</option>
      <option value={13}>1</option>
      <option value={14}>1</option>
      <option value={15}>1</option>
      <option value={16}>1</option>
      <option value={17}>1</option>
      <option value={18}>1</option>
      <option value={19}>1</option>
      <option value={20}>1</option>
      <option value={20}>1</option>
      <option value={20}>1</option>
      <option value={20}>1</option>
      <option value={20}>1</option>
      <option value={20}>1</option>
      <option value={20}>1</option>
      <option value={20}>1</option>
      <option value={20}>1</option>
      <option value={20}>1</option>
      <option value={20}>1</option>
      <option value={20}>1</option>
    </select>
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
