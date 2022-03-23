import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../../_utils/theme";
import { isFunction, isEmpty } from "lodash";

const HtmlCell = styled.td`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: red !important;
  z-index: 10;
  border-radius: 2px;
  width: ${(props) => props.width};
`;

const TableRowStatusIndicatorCell = (props) => {
  //--------------------------
  const {
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
    return "2px";
  };

  return <HtmlCell {...themeProps} width={getWidth()} key={Index}></HtmlCell>;
};

TableRowStatusIndicatorCell.defaultProps = {
  __TYPE__: "TABLE_ROW_STATUS_INDICATOR_CELL",
  //--------------------
  Column: {},
  RowData: {},
  //--------------------
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
};

TableRowStatusIndicatorCell.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  Column: PropTypes.object.isRequired,
  RowData: PropTypes.object.isRequired,
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

export default TableRowStatusIndicatorCell;
