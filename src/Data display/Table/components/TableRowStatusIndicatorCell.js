import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../../_utils/theme";
import { statusColor } from "../constants/constants";

const HtmlCell = styled.td`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${(props) => props.bgColor} !important;
  padding-right: 2px;
  border-radius: 2px;
  width: ${(props) => props.width};
`;

const TableRowStatusIndicatorCell = (props) => {
  //--------------------------
  const {
    RowData,
    Index,
    GetRowStatusIndicatorColor,
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

  const isColor = (strColor) => {
    const s = new Option().style;
    s.color = strColor;
    return s.color !== "";
  };

  return (
    <HtmlCell
      {...themeProps}
      width={getWidth()}
      key={Index}
      bgColor={() => {
        var color = GetRowStatusIndicatorColor(RowData);

        if (isColor(color)) return color;

        return statusColor.NONE;
      }}
    ></HtmlCell>
  );
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
