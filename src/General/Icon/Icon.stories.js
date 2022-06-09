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
    <Icon {...args} id="icon" />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  id: "icon",
  icon: "user",
  iconStyle: "solid",
  size: "small",
};
