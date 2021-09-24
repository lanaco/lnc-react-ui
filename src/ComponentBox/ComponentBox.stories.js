import React from "react";
import ComponentBox from ".";
import ComponentBoxExample from "./ComponentBoxExample";
import theme from "../_utils/theme";

export default {
  title: "ComponentBox",
  component: ComponentBox,
  argTypes: {},
};

const Template = (args) => (
  <>
    <ComponentBoxExample {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  color: "primary",
  size: "small",
  theme: theme,
  header: "Component box header",
  clickOutsideToClose: true,
  showHeader: true,
  basic: true,
};
