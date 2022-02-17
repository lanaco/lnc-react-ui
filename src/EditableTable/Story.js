import React, { useState, useEffect } from "react";
import EditableTable from ".";
import styled from "@emotion/styled";
import service from "../AdvancedGrid/services/service";
import CustomInput from "./components/CustomInput";
import { inputType } from "./constants/constants";
import TextInput from "../TextInput/index";
import { isEmpty } from "lodash";

const Container = styled.div``;

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
        component: React.forwardRef((props, ref) => {
          return (
            <TextInput
              {...props}
              onChange={(_, value) =>
                props.onChange({
                  target: {
                    value: value,
                  },
                })
              }
              ref={ref}
            />
          );
        }),
        component: CustomInput,
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
        component: CustomInput,
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
    EnableSelection: false,
    EnableOrdering: false,
    EnableSelectAll: false,
    EnableLoader: true,
  };

  useEffect(() => load(), []);

  const load = () => {
    setLoading(true);
    var result = service.loadData();

    setTimeout(() => {
      setTableData(result.data);
      setLoading(false);
    }, 1200);
  };

  const onCellDataChanged = (newRowData, previousRowData) => {
    newRowData.balance = "$69,420.00";

    return newRowData;
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
        <button onClick={() => console.log(tableData)}>log</button>
        <button onClick={onSave}>save</button>
      </div>
      <EditableTable
        {...props.args}
        {...config}
        Data={tableData}
        Loading={loading}
        onSave={onSave}
        cellDataChanged={onCellDataChanged}
      ></EditableTable>
    </Container>
  );
};

export default StoryTemplate;
