import React, { useRef } from "react";
import styled from "@emotion/styled";
import Table from "../../Table/index";

export const View = styled.div`
  border-radius: 8px;
  background-color: fcfcfc;
`;

const TableView = (props) => {
  const { Data, Columns, goToUpdate = () => {} } = props;

  return (
    <View>
      <Table
        Data={Data}
        Columns={Columns}
        onRowClick={(_, rowData) => {
          goToUpdate(rowData);
        }}
      />
    </View>
  );
};

TableView.defaultProps = {
  __TYPE__: "TABLE_VIEW",
};

export default TableView;
