import React, { useState, useEffect, createRef } from "react";
import AdvancedGrid from "../index";
import service from "../services/service";
import styled from "@emotion/styled";
import AlternateTable from "../components/AlternateTable";
import Table from "../components/Table";
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
          index: [1, 1, 1, 0, 0],
          width: 23,
          size: "S",
        },
        {
          accessor: "company",
          order: false,
          render: null,
          index: [2, 2, 2, 1, 1],
          width: 17,
          size: "S",
        },
        {
          accessor: "address",
          order: false,
          render: null,
          index: [3, 3, 3, 2, 2],
          width: 30,
          size: "M",
        },
        {
          accessor: "email",
          order: false,
          render: null,
          index: [4, 4, 4, 3, 3],
          width: 23,
          size: "L",
        },
        {
          accessor: "status",
          order: false,
          render: null,
          index: [0, 0, 0, 4, 4],
          width: 7,
          size: "XL",
        },
      ],
      Data: state.data,
    },
    Render: {
      renderTable: (args) => <AlternateTable {...args} />,
    },
  };

  return (
    <div>
      <div>
        <button onClick={() => ref.current.log()}>LOG</button>
      </div>
      <AdvancedGrid {...config} ref={ref}>
        {/* <AlternateTable /> */}

        <Table>{/* <TableRow /> */}</Table>
      </AdvancedGrid>
    </div>
  );
};

export default Basic;
