import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { getColorRgbaValue } from "../../../_utils/utils";
import { useTheme } from "@emotion/react";

const HtmlRow = styled.tr`
  border-bottom: ${(props) =>
    "1px solid " +
    getColorRgbaValue(props.theme, "TableRow", null, "enabled", "border")}};

  border-left: ${(props) =>
    "1px solid " +
    getColorRgbaValue(props.theme, "TableRow", null, "enabled", "border")}};

  border-right: ${(props) =>
    "1px solid " +
    getColorRgbaValue(props.theme, "TableRow", null, "enabled", "border")}};

  &:last-of-type > td:first-of-type {
    border-radius: 0 0 0 0.5rem;
  }

  &:last-of-type > td:last-of-type {
    border-radius: 0 0 0.5rem 0;
  }

  ${(props) => {
    if (props.IsSelected !== true)
      return `
       &:hover {
          & > td {
            background-color: ${getColorRgbaValue(
              props.theme,
              "TableRow",
              null,
              "hover",
              "background"
            )};
          }
      }`;
    else return "";
  }}

  ${(props) => {
    if (props.IsSelected === true) {
      return `
        & > td {
          background-color: ${getColorRgbaValue(
            props.theme,
            "TableRow",
            props.color,
            "active",
            "background"
          )};
        }
      `;
    } else return "";
  }}
`;

const TableRow = (props) => {
  //--------------------------
  const {
    onRowClick,
    RowData,
    Index,
    IsSelected,
    //----------------
    className,
    size,
    color,
  } = props;

  const theme = useTheme();
  const themeProps = {
    className,
    size,
    color,
    theme,
  };

  const onClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (onRowClick) onRowClick(e, RowData);
  };

  return (
    <HtmlRow
      {...themeProps}
      IsSelected={IsSelected}
      key={Index}
      onClick={onClick}
    >
      {props.children}
    </HtmlRow>
  );
};

TableRow.defaultProps = {
  __TYPE__: "TABLE_ROW",
  //--------------------
  onRowClick: () => {},
  RowData: {},
  //--------------------
  IsSelected: null,
  //--------------------
  className: "",
  size: "small",
  color: "primary",
};

TableRow.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  onRowClick: PropTypes.func,
  RowData: PropTypes.object,
  //----------------------------------------
  IsSelected: PropTypes.bool,
  //----------------------------------------
  className: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "information",
    "neutral",
  ]),
};

export default TableRow;
