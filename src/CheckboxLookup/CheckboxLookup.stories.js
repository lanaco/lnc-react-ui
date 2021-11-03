import React from "react";
import CheckboxLookup from "./index";
import theme from "../_utils/theme";

export default {
  title: "Checkbox Lookup",
  component: CheckboxLookup,
  argTypes: {},
};

const Template = (args) => {
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  const onChange = (_, selectedItems) => {
    setSelectedOptions(selectedItems);
  };

  const onSelectDeselectAll = (val) => {
    if (val) setSelectedOptions(args.options);
    if (!val) setSelectedOptions([]);
  };

  return (
    <div>
      <CheckboxLookup
        {...args}
        selectedOptions={selectedOptions}
        onChange={onChange}
        onSelectDeselectAll={onSelectDeselectAll}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  id: "id",
  theme: theme,
  color: "primary",
  onChange: () => {},
  size: "small",
  disabled: false,
  itemId: "id",
  itemText: "code",
  style: "toggle",
  title: "Title",
  pagination: true,
  // height: "150px",
  options: [
    { id: 1, code: "Option 1" },
    { id: 2, code: "Option 22" },
    { id: 3, code: "Option 333" },
    { id: 4, code: "Option 44" },
    { id: 5, code: "Option 5" },
    { id: 6, code: "Option 66" },
    { id: 7, code: "Option 7" },
    { id: 8, code: "Option 88888" },
    { id: 9, code: "Option 999" },
    { id: 10, code: "Option 10" },
    { id: 11, code: "Option 11" },
    { id: 12, code: "Option 121212" },
    { id: 13, code: "Option 1313" },
  ],
};
