import React from "react";
import EditableTable from ".";
import Story from "./Story";
import { inputType } from "./constants/constants";
import styled from "@emotion/styled";
import CheckBoxInput from "../../Basic Inputs/CheckBoxInput";
// import CustomInput from "./components/CustomInput";
// import CustomSelectList from "./components/CustomSelectList";
// import CustomCheckbox from "./components/CustomCheckbox";
// import CustomDatePicker from "./components/CustomDatePicker";

//-------------------------------------------------------------------

// const customTextInput = React.forwardRef((props, ref) => {
//   return <CustomInput {...props} ref={ref} />;
// });

// const customSelectList = React.forwardRef((props, ref) => {
//   return <CustomSelectList {...props} ref={ref} />;
// });

// const customRenderSelectedValue = React.forwardRef((props, ref) => {
//   var style = {};

//   if (props.rowData.status_id === 1) {
//     style = {
//       padding: "3px 5px",
//       borderRadius: "3px",
//       backgroundColor: "#8bf7a9",
//       fontWeight: "bold",
//     };
//   }

//   if (props.rowData.status_id === 2) {
//     style = {
//       padding: "3px 5px",
//       borderRadius: "3px",
//       backgroundColor: "salmon",
//       fontWeight: "bold",
//     };
//   }

//   return <span style={style}>{props.rowData.status}</span>;
// });

// const customCheckbox = React.forwardRef((props, ref) => {
//   return (
//     <CustomCheckbox
//       {...props}
//       onChange={(e, value, id) => props.onChange(e, value, id)}
//       checked={props.value}
//       ref={ref}
//     />
//   );
// });

const customRenderCheckbox = React.forwardRef((props, ref) => {
  return (
    <CheckBoxInput
      {...props}
      onChange={() => {}}
      tabIndex={-1}
      disabled={true}
      checked={props.value}
      ref={ref}
    />
  );
});

//-------------------------------------------------------------------

export default {
  title: "Data Display/Editable Table",
  component: EditableTable,
};

const Template = (args) => <Story args={args} />;

export const Default = Template.bind({});
Default.args = {
  color: "primary",
  size: "small",
  //------------------------------------
  SelectedEntirePage: false,
  //-------------------------------------
  Columns: [
    {
      id: 1,
      displayName: "Iban",
      accessor: "company_iban",
      width: 30,
      sortable: true,
      editable: true,
      inputType: inputType.STRING,
      // editComponent: customTextInput,
    },
    {
      id: 2,
      displayName: "Name",
      accessor: "company_name",
      width: 20,
      editable: true,
      inputType: inputType.STRING,
      // editComponent: customTextInput,
    },
    {
      id: 3,
      displayName: "Amount ($)",
      accessor: "amount",
      editable: true,
      width: 17,
      inputType: inputType.STRING,
      // editComponent: customTextInput,
    },
    {
      id: 4,
      displayName: "Date",
      accessor: "date",
      width: 13,
      editable: true,
      inputType: inputType.STRING,
      // editComponent: customTextInput,
    },
    {
      id: 5,
      displayName: "Processed",
      accessor: "processed",
      width: 10,
      editable: true,
      inputType: inputType.BOOLEAN,
      // editComponent: customCheckbox,
      readonlyComponent: customRenderCheckbox,
    },
    {
      id: 6,
      displayName: "Status",
      accessor: "status_id",
      width: 10,
      editable: true,
      inputType: inputType.SELECT,
      // editComponent: customSelectList,
      // readonlyComponent: customRenderSelectedValue,
      // selectItems: [
      //   { id: 1, name: "Approved" },
      //   { id: 2, name: "Rejected" },
      // ],
      // selectProps: {
      //   mapNameTo: "name",
      //   mapValueTo: "id",
      // },
    },
  ],
  //--------------------
  EmptyDataItem: {
    id: "",
    company_iban: "",
    company_name: "",
    amount: 0.0,
    date: "09.03.2022",
    status: "Approved",
    status_id: 1,
    processed: false,
  },
  //--------------------
  SelectedData: [{ id: "7a4ce6b3-36a4-470f-8e93-7a5a1791968f" }],
  Ordering: {
    columnId: 1,
    ascending: false,
    descending: true,
  },
  //--------------------
  EnableSelection: true,
  EnableOrdering: true,
  EnableSelectAll: true,
  EnableLoader: true,
};
