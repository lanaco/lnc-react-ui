import React, { useState, useEffect } from "react";
import Table from ".";
import styled from "@emotion/styled";
import service from "../AdvancedGrid/services/service";
import CustomTableCell from "./components/CustomTableCell";
import CustomTableRow from "./components/CustomTableRow";
import CustomTableHeader from "./components/CustomTableHeader";
import CustomTableFooter from "./components/CustomTableFooter";
import CustomTableContainer from "./components/CustomTableContainer";
import CellRender from "./components/CellRender";

var visibilityPattern = {
  XS: [
    {
      id: 1,
      accessor: "name",
      width: 70,
    },
    {
      id: 2,
      accessor: "company",
      width: 30,
    },
  ],
  S: [
    {
      id: 2,
      accessor: "company",
      width: 40,
    },
    {
      id: 1,
      accessor: "name",
      width: 60,
    },
  ],
  M: [
    {
      id: 3,
      accessor: "address",
      width: 10,
    },

    {
      id: 1,
      accessor: "name",
      width: 90,
    },
  ],
  L: [
    {
      id: 3,
      accessor: "address",
      width: 25,
    },
    {
      id: 2,
      accessor: "company",
      width: 15,
    },
    {
      id: 1,
      accessor: "name",
      width: 60,
    },
  ],
  XL: [
    {
      id: 3,
      accessor: "address",
      width: 20,
    },
    {
      id: 2,
      accessor: "company",
      width: 15,
    },
    {
      id: 1,
      accessor: "name",
      width: 65,
    },
  ],
};

const Container = styled.div``;

const Header = styled.div`
  margin-bottom: 10px;
`;

const StoryTemplate = (props) => {
  const [tableData, setTableData] = useState({ data: [], loading: false });

  const [state, setState] = useState({
    Columns: [
      {
        id: 1,
        displayName: "Name",
        accessor: "name",
        width: 25,
        render: (props) => <CellRender {...props} />,
        sortable: true,
      },
      {
        id: 2,
        displayName: "Company",
        accessor: "company",
        width: 15,
        sortable: false,
      },
      {
        id: 3,
        displayName: "Address",
        accessor: "address",
        width: 60,
        sortable: true,
      },
    ],
    VisibilityPattern: visibilityPattern,
    //--------------------
    EnableSelection: false,
    EnableOrdering: false,
    EnableSelectAll: false,
    EnableLoader: false,
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
      <Header></Header>
      <Table
        Loading={tableData.loading}
        EnableLoader={true}
        {...state}
        onRowClick={(e, props) => {
          console.log("onRowClick");
        }}
        onSelectRow={(data, selected) => {
          console.log(selected, data);
        }}
        {...props.args}
        Data={tableData.data}
      >
        {/* <CustomTableCell />
        <CustomTableRow /> */}

        {/* <CustomTableContainer /> */}
        {/* <CustomTableHeader /> */}
        {/* <CustomTableFooter /> */}
      </Table>
    </Container>
  );
};

export default StoryTemplate;
