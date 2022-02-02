import React, { useState, useEffect, createRef } from "react";
import Table from "../index";
import service from "../services/service";
import styled from "@emotion/styled";
import { default as TableTable } from "../components/Table";
import TableRow from "../components/TableRow";

const Basic = () => {
  var ref = createRef();
  const [state, setState] = useState({ data: [] });

  useEffect(() => {
    setTimeout(() => {
      var result = service.loadData();

      setState({
        ...state,
        data: result.data,
      });
    }, 700);
  }, []);

  var config = {
    Data: {
      Columns: [
        {
          accessor: "name",
          order: false,
          render: null,
          width: 23,
          size: "S",
        },
        {
          accessor: "company",
          order: false,
          render: null,
          width: 17,
          size: "S",
        },
        {
          accessor: "address",
          order: false,
          render: null,
          width: 30,
          size: "M",
        },
        {
          accessor: "email",
          order: false,
          render: null,
          width: 23,
          size: "L",
        },
        {
          accessor: "status",
          order: false,
          render: null,
          width: 7,
          size: "XL",
        },
      ],
      Data: state.data,
    },
  };

  return (
    <div>
      <div>
        <button onClick={() => ref.current.log()}>LOG</button>
      </div>
      <Table {...config} ref={ref}>
        <TableTable>{/* <TableRow /> */}</TableTable>
      </Table>
    </div>
  );
};

export default Basic;
