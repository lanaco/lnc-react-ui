import React from "react";
import FormContainer from "./index";
import FormField from "../FormField/index";
import TextInput from "../TextInput/index";

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
        <TextInput value="racicvladan" />
      </FormField>
      <FormField {...fieldProps}>
        <TextInput value="racicvladan" />
      </FormField>
      <FormField {...fieldProps} errorMessage="The user must not be an idiot!">
        <TextInput value="racicvladan" />
      </FormField>
      <FormField {...fieldProps}>
        <TextInput value="racicvladan" />
      </FormField>
      <FormField {...fieldProps}>
        <TextInput value="racicvladan" />
      </FormField>
    </FormContainer>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  fieldMargin: "0.3125rem",
  columns: 2,
};
