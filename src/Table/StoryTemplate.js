import React, { useState, useEffect } from "react";
import Table from ".";
import service from "../AdvancedGrid/services/service";

const visibilityPattern = {
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
      id: 1,
      accessor: "name",
      width: 40,
    },

    {
      id: 3,
      accessor: "address",
      width: 60,
    },
  ],
  L: [
    {
      id: 1,
      accessor: "name",
      width: 25,
    },
    {
      id: 2,
      accessor: "company",
      width: 15,
    },
    {
      id: 3,
      accessor: "address",
      width: 60,
    },
  ],
  XL: [
    {
      id: 1,
      accessor: "name",
      width: 20,
    },
    {
      id: 2,
      accessor: "company",
      width: 15,
    },
    {
      id: 3,
      accessor: "address",
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
          },
          {
            id: 2,
            accessor: "company",
            width: 15,
          },
          {
            id: 3,
            accessor: "address",
            width: 60,
          },
        ]}
        VisibilityPattern={visibilityPattern}
      />
    </div>
  );
};

export default StoryTemplate;
