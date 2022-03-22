import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../../_utils/theme";

const HtmlCell = styled.td`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: ${(props) => props.width}%;
  padding: 8px 2px 8px 8px;
  color: gray;
  border-right: 1px solid gray;
`;

const CustomTableCell = (props) => {
  //--------------------------
  const { Column, RowData, Index } = props;

  return (
    <HtmlCell width={Column.width} key={Index}>
      {RowData[Column.accessor]}
    </HtmlCell>
  );
};

CustomTableCell.defaultProps = {
  __TYPE__: "TABLE_CELL",
  //----------------------------------
};

CustomTableCell.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------
};

export default CustomTableCell;
