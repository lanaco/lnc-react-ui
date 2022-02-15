import React, { useState, useEffect } from "react";
import EditableTable from ".";
import styled from "@emotion/styled";
import service from "../AdvancedGrid/services/service";

const Container = styled.div``;

const StoryTemplate = (props) => {
  const [tableData, setTableData] = useState({ data: [], loading: false });

  const [state, setState] = useState({
    Columns: [
      {
        id: 1,
        displayName: "Name",
        accessor: "name",
        width: 25,
      },
      {
        id: 2,
        displayName: "Company",
        accessor: "company",
        width: 15,
      },
      {
        id: 3,
        displayName: "Address",
        accessor: "address",
        width: 60,
      },
    ],
    //--------------------
    EnableSelection: false,
    EnableOrdering: false,
    EnableSelectAll: false,
    EnableLoader: true,
  });

  useEffect(() => load(), []);

  const load = () => {
    setTableData({ ...tableData, loading: true });
    var result = service.loadData();

    setTimeout(() => {
      setTableData({
        ...tableData,
        data: result.data,
        loading: false,
      });
    }, 1200);
  };

  return (
    <Container>
      <div style={{ padding: "6px" }}>
        <button onClick={load}>reload</button>
      </div>
      <EditableTable
        {...props.args}
        {...state}
        Data={tableData.data}
        Loading={tableData.loading}
      ></EditableTable>
    </Container>
  );
};

export default StoryTemplate;
