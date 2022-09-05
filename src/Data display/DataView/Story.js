import React, { useRef } from "react";
import DataView from ".";
import styled from "@emotion/styled";
import Button from "../../General/Button";

export const View = styled.div`
  padding: 10px;
  border-radius: 8px;
  background-color: ${(props) => props.color};
`;

export const TableView = () => {
  return <View color={"rgba(0,185,189,20%)"}>Table view</View>;
};

export const FormView = () => {
  return <View color={"rgba(50,132,203,20%)"}>Form view</View>;
};

const Story = (props) => {
  const dw = useRef();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      <Button
        text="Toggle Loading"
        type="tinted"
        leadingIcon="arrow-right-rotate"
        onClick={() => {
          dw.current.toggleLoading();
        }}
      />
      <DataView
        {...props}
        ref={dw}
        defaultCurrentView={{
          id: 1,
          name: "Table View",
          type: "TABLE_VIEW",
        }}
        views={[
          {
            id: 1,
            name: "Table View",
            type: "TABLE_VIEW",
            disabled: false,
          },
          {
            id: 2,
            name: "Form View",
            type: "FORM_VIEW",
            disabled: false,
          },
        ]}
      >
        <TableView __TYPE__="TABLE_VIEW" />
        <FormView __TYPE__="FORM_VIEW" />
      </DataView>
    </div>
  );
};

export default Story;
