import React from "react";
import LabelSwitch from ".";
import theme from "../../_utils/theme";

export default {
  title: "Inputs/Label Switch",
  component: LabelSwitch,
  argTypes: {},
};

const Template = (args) => (
  <>
    <p>
      <LabelSwitch {...args} />
    </p>
  </>
);

export const Default = Template.bind({});
Default.args = {};
