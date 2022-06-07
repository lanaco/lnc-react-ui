import React from "react";
import Select from ".";
import theme from "../../_utils/theme";

export default {
  title: "Inputs/Select",
  component: Select,
  argTypes: {},
};

const Template = (args) => (
  <>
    <p>
      <Select {...args} />
    </p>
  </>
);

export const Default = Template.bind({});
Default.args = {};
