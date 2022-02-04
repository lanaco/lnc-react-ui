import React, { useState, useEffect } from "react";
import Table from ".";
import service from "../AdvancedGrid/services/service";
import CustomTableCell from "./components/CustomTableCell";
import CustomTableRow from "./components/CustomTableRow";

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
  const [state, setState] = useState({ data: [] });

  useEffect(() => {
    setTimeout(() => {
      var result = service.loadData();

      setState({
        ...state,
        data: result.data,
      });
    }, 300);
  }, []);

  return (
    <div>
      <Table
        Data={state.data}
        Columns={[
          {
            id: 1,
            accessor: "name",
            width: 25,
            show: true,
          },
          {
            id: 2,
            accessor: "company",
            width: 15,
            show: true,
          },
          {
            id: 3,
            accessor: "address",
            width: 60,
            show: true,
          },
        ]}
        VisibilityPattern={visibilityPattern}
      >
        {/* <CustomTableCell />
        <CustomTableRow /> */}
      </Table>
    </div>
  );
};

export default StoryTemplate;
