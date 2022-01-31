import React, { useContext, useEffect } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const RowContainer = styled.div`
  padding: 5px 2px;
  border-bottom: 1px solid #80808080;
`;

const Company = styled.span`
  font-weight: bold;
`;

const Status = styled.span`
  font-weight: bold;
  color: ${(props) => (props.status === "active" ? "green" : "gray")};
`;

const TableRow = (props) => {
  const { onClick, rowData, index } = props;

  return (
    <RowContainer key={index}>
      {rowData.id.substr(rowData.id.length - 3) + " --- "}
      {rowData.name + " --- "}
      <Company>{rowData.company}</Company>
      {" --- "}
      <Status status={rowData.status}>{rowData.status.toUpperCase()}</Status>
    </RowContainer>
  );
};

TableRow.defaultProps = {
  __TYPE__: "TABLE_ROW",
};

TableRow.propTypes = {
  __TYPE__: PropTypes.string,
};

export default TableRow;
