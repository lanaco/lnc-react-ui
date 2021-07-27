import React from "react";

import TagSelector from "./index";

export default {
  title: "TagSelector",
  component: TagSelector,
};
const emptyFunc = () => {};

const Template = (args) => <TagSelector {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  disabled: false,
  tagsData: [
    { code: "test", id: 1 },
    { code: "test2", id: 2 },
    { code: "test", id: 3 },
    { code: "test2", id: 4 },
    { code: "test", id: 5 },
    { code: "test2", id: 6 },
  ],
  toggleTagSelection: emptyFunc,
  selectedTags: [1, 3],
};
