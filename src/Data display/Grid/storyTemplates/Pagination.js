import React, { useEffect, useState } from "react";
import Grid from "../index";
import service from "../../../_server_/grid/service";

const Pagination = (props) => {
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
    {
      accessor: "subordinates",
      name: "Subordinates",
      sort: false,
      nested: true,
    },
  ];

  const Config = {
    Options: {
      EnablePagination: true,
      EnableSelection: false,
      EnableOrdering: true,
    },
    Ordering: {
      DefaultAccessor: "id",
    },
    Pagination: {
      PageSizes: [10, 20, 50, 100],
      PageSize: 10,
    },
    Table: {
      SelectionIndicator: "id",
      SelectionType: "multiple",
      Actions: [],
    },
    Form: {
      DataItemTemplate: {
        id: 0,
        name: "",
        age: null,
      },
    },
  };

  const [GridState, setGridState] = useState({
    Data: [],
    CurrentPage: 1,
    PageCount: 1,
    PageSize: 10,
    DataCount: 0,
    LoadedDataCount: 0,
  });

  const { loadData } = service;

  const load = (data) => {
    setTimeout(() => {
      setGridState({ ...GridState, ...loadData(data) });
    }, 350);
  };

  useEffect(() => {
    setGridState({ ...GridState, ...loadData() });
  }, []);

  return (
    <div style={{ padding: "15px" }}>
      <Grid
        Config={Config}
        Columns={Columns}
        FooterText={"Report footer text"}
        HeaderText={"Report header text"}
        Data={GridState.Data}
        Pagination={GridState}
        Load={load}
        Hooks={{
          BeforePageChange: () => true,
          AfterPageChanged: () => {},
          //-----------------------------------
          BeforePageSizeChange: () => true,
          AfterPageSizeChanged: () => {},
          //-----------------------------------
        }}
      />
    </div>
  );
};

export default Pagination;
