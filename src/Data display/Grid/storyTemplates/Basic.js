import React, { useEffect, useState } from "react";
import Grid from "../index";
import service from "../../../_server_/grid/service";

const Basic = (props) => {
  const Columns = [
    {
      accessor: "id",
      name: "ID",
      sort: true,
    },

    {
      accessor: "name",
      name: "Name",
      sort: true,
    },
    {
      accessor: "age",
      name: "Age",
      sort: true,
    },
  ];

  const [GridState, setGridState] = useState({
    Data: [],
    CurrentPage: 1,
    PageCount: 1,
    PageSize: 10,
    DataCount: 0,
    LoadedDataCount: 0,
  });

  const { loadData } = service;

  useEffect(() => {
    setGridState({ ...GridState, ...loadData({ PageSize: 10000 }) });
  }, []);

  return (
    <div style={{ padding: "15px" }}>
      <Grid Columns={Columns} Data={GridState.Data} />
    </div>
  );
};

export default Basic;
