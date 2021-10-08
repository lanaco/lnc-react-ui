import React from "react";
import ConfirmationForm from "./index";
import ConfirmationFormExample from "./ConfirmationFormExample";
import theme from "../_utils/theme";

export default {
  title: "ConfirmationForm",
  component: ConfirmationForm,
  argTypes: {},
};

const Template = (args) => (
  <>
    <ConfirmationFormExample {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  color: "primary",
  size: "small",
  theme: theme,
  header: "Are you sure ?",
  clickOutsideToClose: true,
  showHeader: true,
  basic: false,
};
