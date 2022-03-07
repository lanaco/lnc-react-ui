import React from "react";
import TagSelector from "./index";
import theme from "../../_utils/theme";

export default {
  title: "Inputs/TagSelector",
  component: TagSelector,
};

const Template = (args) => (
  <div style={{ width: "500px" }}>
    <TagSelector {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  pagination: true,
  displayedItemsCount: 5,
  tags: [
    { code: "Tag 1", id: 1 },
    { code: "Tag 222", id: 2 },
    { code: "Tag 3", id: 3 },
    { code: "Tag 4444444444", id: 4 },
    { code: "Tag 55", id: 5 },
    { code: "Tag 6", id: 6 },
    { code: "Tag 777", id: 7 },
    { code: "Tag 88", id: 8 },
    { code: "Tag 9999999", id: 9 },
    { code: "Tag 10", id: 10 },
    { code: "Tag 11", id: 11 },
  ],
  toggleTagSelection: () => {},
  selectedTags: [1, 3, 7],
  color: "primary",
  size: "small",
  mapName: "code",
  theme: theme,
};
