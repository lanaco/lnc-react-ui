import React from "react";

import Message from "./index";

export default {
  title: "Message",
  component: Message,
};

const Template = (args) => (
  <div>
    <Message {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  message: "Error message",
  size: "small",
  color: "error",
  container: true,
};
