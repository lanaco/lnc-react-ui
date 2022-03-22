import React from "react";
import Pagination from "./index";
import { action } from "@storybook/addon-actions";

export default {
  title: "Utility/Pagination",
  component: Pagination,
};

const Template = (args) => (
  <div>
    <Pagination {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  color: "secondary",
  size: "small",
  withPageInformation: true,
  CanGoToNextPage: true,
  CanGoToLastPage: true,
  goToNextPage: action("goToNextPage"),
  goToLastPage: action("goToLastPage"),
};
