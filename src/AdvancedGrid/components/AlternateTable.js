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

const AlternateTable = (props) => {
  const GridState = useContext(GridContext);
  const { dispatch } = props;

  return (
    <div>
      {GridState.Data.Data.map((x, i) => {
        return (
          <RowContainer key={i}>
            <Name>{x.name}</Name>
          </RowContainer>
        );
      })}
    </div>
  );
};

AlternateTable.defaultProps = {
  __TYPE__: "TABLE",
};

AlternateTable.propTypes = {
  __TYPE__: PropTypes.string,
};

export default AlternateTable;
