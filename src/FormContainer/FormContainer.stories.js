import React from "react";
import FormContainer from "./index";
import FormField from "../FormField/index";
import TextInput from "../TextInput/index";
import PasswordInput from "../PasswordInput/index";

export default {
  title: "FormContainer",
  component: FormContainer,
};

const fieldProps = {
  errorMessage: "",
  label: "Username",
  required: true,
  size: "small",
};

const Template = (args) => (
  <div
    style={{
      width: "600px",
      margin: "30px",
      border: "1px solid gray",
      borderRadius: "3px",
      padding: "8px",
    }}
  >
    <FormContainer {...args}>
      <FormField {...fieldProps}>
        <TextInput value="racicvladan1" />
      </FormField>
      <FormField {...fieldProps}>
        <TextInput value="racicvladan2" />
      </FormField>
      <FormField {...fieldProps} errorMessage="The user must not be an idiot!">
        <TextInput value="racicvladan3" />
      </FormField>
      <FormField {...fieldProps}>
        <TextInput value="racicvladan4" />
      </FormField>
      <FormField {...fieldProps}>
        <PasswordInput value="racicvladan5" />
      </FormField>

      <FormContainer {...args}>
        <FormField {...fieldProps}>
          <TextInput value="racicvladan1" />
        </FormField>
        <FormField {...fieldProps}>
          <TextInput value="racicvladan2" />
        </FormField>
      </FormContainer>
    </FormContainer>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  fieldMargin: "0.3125rem",
  columns: 2,
};
