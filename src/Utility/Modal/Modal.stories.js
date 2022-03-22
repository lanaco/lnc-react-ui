import React from "react";
import Modal from ".";
import ModalExample from "./ModalExample";
import theme from "../../_utils/theme";

export default {
  title: "Utility/Modal",
  component: Modal,
  argTypes: {},
};

const Template = (args) => (
  <>
    <ModalExample {...args} />
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
