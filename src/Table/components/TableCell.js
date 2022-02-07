import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../_utils/theme";

const HtmlCell = styled.td`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: ${(props) => props.width};
  padding: 4px 2px 4px 6px;
`;

const TableCell = (props) => {
  //--------------------------
  const {
    Column,
    RowData,
    Index,
    //----------------
    className,
    size,
    color,
    theme,
  } = props;

  const themeProps = {
    className,
    size,
    color,
    theme,
  };

  const getWidth = () => {
    if (Column && Column.width) {
      return Column.width + "%";
    }

    return "auto";
  };

  return (
    <HtmlCell {...themeProps} width={getWidth()} key={Index}>
      {RowData[Column.accessor]}
    </HtmlCell>
  );
};

TableCell.defaultProps = {
  __TYPE__: "TABLE_CELL",
  //--------------------
  Column: {},
  RowData: {},
  Index: 0,
  //--------------------
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
};

TableCell.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  Column: PropTypes.object.isRequired,
  RowData: PropTypes.object.isRequired,
  Index: PropTypes.number.isRequired,
  //----------------------------------------
  className: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "gray",
    "white",
    "black",
  ]),
  theme: PropTypes.object.isRequired,
};

export default TableCell;
