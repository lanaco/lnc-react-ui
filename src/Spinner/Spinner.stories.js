import React from "react";
import Spinner from "./index";

export default {
  title: "Spinner",
  component: Spinner,
};

const Template = (args) => (
  <div>
    <Spinner {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  color: "secondary",
  size: "small",
};
