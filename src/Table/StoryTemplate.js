import React, { useState, useEffect } from "react";
import Table from ".";
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

const StoryTemplate = (props) => {
  const [state, setState] = useState({ data: [], loading: false });

  useEffect(() => load(), []);

  const load = () => {
    setState({ ...state, loading: true });
    var result = service.loadData();

    setTimeout(() => {
      setState({
        ...state,
        data: result.data,
        loading: false,
      });
    }, 1200);
  };

  return (
    <div>
      <div
        style={{
          padding: "10px",
        }}
      >
        <button onClick={load}>LOAD</button>
      </div>
      <Table
        Loading={state.loading}
        EnableLoader={true}
        Data={state.data}
        Columns={[
          {
            id: 1,
            displayName: "Name",
            accessor: "name",
            width: 25,
            show: true,
            render: (props) => <CellRender {...props} />,
            // render: (props) => false,
          },
          {
            id: 2,
            displayName: "Company",
            accessor: "company",
            width: 15,
            show: true,
          },
          {
            id: 3,
            displayName: "Address",
            accessor: "address",
            width: 60,
            show: true,
          },
        ]}
        VisibilityPattern={visibilityPattern}
        onRowClick={(e, props) => {
          console.log("onRowClick");
        }}
        EnableSelection={true}
        onSelectRow={(data, selected) => {
          console.log(selected, data);
        }}
      >
        {/* <CustomTableCell />
        <CustomTableRow /> */}

        {/* <CustomTableContainer /> */}
        {/* <CustomTableHeader /> */}
        {/* <CustomTableFooter /> */}
      </Table>
    </div>
  );
};

export default StoryTemplate;
