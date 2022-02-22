import React, { useState, useEffect } from "react";
import EditableTable from ".";
import styled from "@emotion/styled";
import service from "../AdvancedGrid/services/service";
import CustomInput from "./components/CustomInput";
import { inputType } from "./constants/constants";
import TextInput from "../TextInput/index";
import { isEmpty } from "lodash";

const Container = styled.div``;

//============================================

const customRender = React.forwardRef((props, ref) => {
  return <CustomInput {...props} ref={ref} />;
});

//============================================

const StoryTemplate = (props) => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  const config = {
    Columns: [
      {
        id: 1,
        displayName: "Name",
        accessor: "name",
        width: 25,
        editable: true,
        inputType: inputType.STRING,
        // component: CustomInput,
        component: customRender,
      },
      {
        id: 2,
        displayName: "Company",
        accessor: "company",
        width: 15,
        editable: false,
      },
      {
        id: 3,
        displayName: "Address",
        accessor: "address",
        editable: true,
        width: 40,
        inputType: inputType.STRING,
        // component: CustomInput,
        component: customRender,
      },
      {
        id: 4,
        displayName: "Balance",
        accessor: "balance",
        width: 20,
        editable: false,
      },
    ],
    //--------------------
    EmptyDataItem: {
      id: "",
      name: "",
      company: "",
      address: "",
      balance: "$0.00",
    },
    //--------------------
    EnableSelection: false,
    EnableOrdering: false,
    EnableSelectAll: false,
    EnableLoader: true,
  };

  useEffect(() => load(), []);

  const load = () => {
    setLoading(true);
    var result = service.loadData();

    result.data.push(config.EmptyDataItem);

    setTimeout(() => {
      setTableData(result.data);
      setLoading(false);
    }, 1200);
  };

  const onSave = (obj) => {
    if (!isEmpty(obj)) {
      setLoading(true);

      // Save data...
      var result = service.loadData();

      var row = result.data.find((x) => x.id === obj.id);
      result.data[result.data.indexOf(row)] = obj;

      setTableData(result.data);

      setTimeout(() => {
        setLoading(false);
      }, 800);
    }
  };

  return (
    <Container>
      <div style={{ padding: "6px" }}>
        <button onClick={load}>reload</button>
      </div>

      <div style={{ padding: "6px" }}>
        <button
          onClick={() => setTableData([...tableData, config.EmptyDataItem])}
        >
          add
        </button>
      </div>

      <EditableTable
        {...props.args}
        {...config}
        Data={tableData}
        Loading={loading}
        // onSave={onSave}
        //--------------------------
        onCellFocusChange={() => {}}
        //--------------------------
        onRowFocusChange={(e, rowIndex, nextRow) => {
          if (rowIndex !== nextRow) {
            console.log("%c Save handler ", "background: green; color: white");
          }
        }}
        //--------------------------
        onDiscard={(e, rowIndex, cellIndex, inputRef) => {
          console.log("%c Discard handler ", "background: black; color: white");
        }}
        //--------------------------
        onInputChange={(e, value, rowIndex, cellIndex, column, rowData) => {
          console.log(
            "%c Input changed handler ",
            "background: gray; color: white"
          );
        }}
        //--------------------------
      ></EditableTable>
    </Container>
  );
};

export default StoryTemplate;
