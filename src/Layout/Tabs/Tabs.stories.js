import React from "react";
import Tabs from "./index";

export default {
  title: "Layout/Tabs",
  component: Tabs,
};

const Template = (args) => (
  <div>
    <Tabs {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  initialActiveTab: { id: 1, render: () => <div>First Tab</div> },
  tabs: [
    {
      id: 1,
      header: "First Tab",
      render: () => <div>First Tab</div>,
    },
    {
      id: 2,
      header: "Second Tab",
      render: () => <div>Second Tab</div>,
    },
    {
      id: 3,
      header: "Third Tab",
      render: () => <div>Third Tab</div>,
    },
  ],
  color: "secondary",
  size: "small",
};
