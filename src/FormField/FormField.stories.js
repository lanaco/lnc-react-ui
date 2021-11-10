import React from "react";
import styled from "@emotion/styled";
import FormField from "./index";
import TextInput from "../TextInput/index";

export default {
  title: "FormField",
  component: FormField,
};

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  & > div {
    margin: 5px;
  }
`;

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
    <FormField {...args} errorMessage="The user must not be an idiot!" required>
      <TextInput value="racicvladan" size={args.size} color={args.color} />
    </FormField>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  errorMessage: "",
  label: "Username",
  required: true,
  size: "small",
  hasContainer: false,
};
