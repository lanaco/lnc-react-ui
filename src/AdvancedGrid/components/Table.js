import React, { useContext, useEffect } from "react";
import GridContext from "../context";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const RowContainer = styled.div`
  padding: 5px 2px;
  border-bottom: 1px solid #80808080;
`;

const Name = styled.span`
  font-weight: bold;
`;

const Table = (props) => {
  const GridState = useContext(GridContext);
  const { dispatch } = props;

  const findChildComponentByType = (type, _props) => {
    if (props.children && type) {
      var component = React.Children.toArray(props.children).find(
        (child) => child.props.__TYPE__ === type
      );

      if (React.isValidElement(component)) {
        return React.cloneElement(component, _props);
      }
    }

    return null;
  };

  const renderRow = (rowData, i) => {
    var row = findChildComponentByType("TABLE_ROW", { index: i, rowData });

    if (row !== null) return row;

    console.log("NOOOO");
    return (
      <RowContainer key={i}>
        {rowData.id.substr(rowData.id.length - 5) + " / "}
        <Name>{rowData.name}</Name>
        {" / " + rowData.company}
      </RowContainer>
    );
  };

  return (
    <div>
      {GridState.Data.Data.map((x, i) => (
        <div key={i}>{renderRow(x, i)}</div>
      ))}
    </div>
  );
};

Table.defaultProps = {
  __TYPE__: "TABLE",
};

Table.propTypes = {
  __TYPE__: PropTypes.string,
};

export default Table;
