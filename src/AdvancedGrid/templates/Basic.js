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
      Columns: [],
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
        <AlternateTable />

        <Table>
          <TableRow />
        </Table>
      </AdvancedGrid>
    </div>
  );
};

export default Basic;
