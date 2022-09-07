import React, { useState } from "react";
import styled from "@emotion/styled";
import TextInput from "../../../Basic Inputs/TextInput";
import DecimalInput from "../../../Basic Inputs/DecimalInput";
import FlexGrid from "../../../Layout/FlexGrid";
import FormField from "../../../Layout/FormField";
import FlexGridItem from "../../../Layout/FlexGrid/FlexGridItem";
import { useEffectOnce } from "react-use";
import Button from "../../../General/Button";

const View = styled.div`
  border-radius: 8px;
  background-color: fcfcfc;
  padding: 4px 12px;
`;

const Controls = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 12px 12px 4px 12px;
`;

const ControlsLeft = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const ControlsRight = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 8px;
`;

const CreditCardForm = (props) => {
  const [DataRecordCopy, set] = useState();

  const {
    Loading,
    FormMethod = "READ",
    DataRecord = {},
    onUpdate = () => {},
    onCreate = () => {},
    onDelete = () => {},
    onDiscard = () => {},
  } = props;

  useEffectOnce(() => {
    set(DataRecord);
  });

  return (
    <View>
      <FlexGrid spacing={10}>
        <FlexGridItem col={6}>
          <FormField label={"Full Name"}>
            <TextInput tabIndex={100} value={DataRecord.userName} />
          </FormField>
        </FlexGridItem>
        <FlexGridItem col={6}>
          <FormField label={"Card Number"}>
            <TextInput tabIndex={101} value={DataRecord.cardNumber} />
          </FormField>
        </FlexGridItem>

        <FlexGridItem col={6}>
          <FormField label={"Amount"}>
            <DecimalInput tabIndex={102} value={parseFloat(DataRecord.value)} />
          </FormField>
        </FlexGridItem>
        <FlexGridItem col={6}>
          <FormField label={"Currency"}>
            <TextInput tabIndex={103} value={DataRecord.currency} />
          </FormField>
        </FlexGridItem>
      </FlexGrid>

      <Controls>
        <ControlsLeft>
          <Button
            leadingIcon="chevron-circle-left"
            type="outline"
            text="Previous"
            onClick={() => {}}
            tabIndex={107}
          />
          <Button
            trailingIcon="chevron-circle-right"
            type="outline"
            text="Next"
            onClick={() => {}}
            tabIndex={106}
          />
        </ControlsLeft>

        <ControlsRight>
          <Button
            leadingIcon="floppy-disk"
            type="tinted"
            color="success"
            text="Save"
            onClick={() => {}}
            tabIndex={104}
          />
          <Button
            leadingIcon="eraser"
            type="outline"
            color="warning"
            text="Discard"
            onClick={() => {}}
            tabIndex={105}
          />
        </ControlsRight>
      </Controls>
    </View>
  );
};

CreditCardForm.defaultProps = {
  __TYPE__: "FORM",
};

export default CreditCardForm;
