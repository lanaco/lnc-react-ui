import React from "react";
import CheckboxLookup from "./index";
import theme from "../_utils/theme";

export default {
  title: "Checkbox Lookup",
  component: CheckboxLookup,
  argTypes: {},
};

const Template = (args) => (
  <div>
    <CheckboxLookup {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  theme: theme,
  color: "primary",
  onChange: () => {},
  size: "small",
  disabled: false,
  itemId: "id",
  itemText: "code",
  style: "toggle",
  selectedOptions: [{ id: 2, code: "Option 22" }],
  options: [
    { id: 1, code: "Option 1" },
    { id: 2, code: "Option 22" },
    { id: 3, code: "Option 333" },
  ],
};
