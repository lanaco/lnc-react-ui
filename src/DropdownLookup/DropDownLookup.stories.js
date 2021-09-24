import React from "react";
import DropDownLookup from ".";
import theme from "../_utils/theme";

export default {
  title: "DropDownLookup",
  component: DropDownLookup,
  argTypes: {},
};

const Template = (args) => (
  <>
    <p>
      <DropDownLookup {...args} />
    </p>
  </>
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
  InitializeNamespace: () => {},
  initialValue: "",
  State: {
    Options:[{id: 1, value: "prva opcija"}, {id: 2, value: "druga opcija"}],
    Loading: false
  },
  LoadData: () => {},
  ClearOptions: () => {}
};
