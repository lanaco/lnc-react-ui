import React from "react";

import TextInput from ".";

export default {
  title: "Text Input",
  component: TextInput,
};

const Template = (args) => <TextInput {...args} />;

export const Primary = Template.bind({});
// Primary.args = {
//   primary: true,
//   label: 'Button',
//   aa: 'a'
// };

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
