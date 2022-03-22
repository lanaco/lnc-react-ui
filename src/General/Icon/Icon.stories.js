import React from "react";

import Icon from "./index";

export default {
  title: "General/Icon",
  component: Icon,
};

const Template = (args) => (
  <div>
    {/* <div style={{ padding: "10px" }}>
      <Icon {...args} />
    </div>
    <div style={{ padding: "10px" }}>
      <Icon {...args} size="medium" />
    </div>
    <div style={{ padding: "10px" }}>
      <Icon {...args} size="large" />
    </div> */}
    <Icon {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  icon: "user",
  iconStyle: "solid",
  color: "secondary",
  size: "small",
};
