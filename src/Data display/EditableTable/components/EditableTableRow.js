import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import {
  getBorderRadiusValueWithUnits,
  getColorRgbaValue,
  getComponentTypographyCss,
  getDisabledStateCss,
  getOutlineCss,
  getSizeValueWithUnits,
} from "../../../_utils/utils";

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

const EditableTableRow = (props) => {
  //--------------------------
  const {
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

  return (
    <HtmlRow {...themeProps} key={Index} IsSelected={IsSelected}>
      {props.children}
    </HtmlRow>
  );
};

EditableTableRow.defaultProps = {
  __TYPE__: "TABLE_ROW",
  //--------------------
  RowData: {},
  IsSelected: null,
  //--------------------
  className: "",
  size: "small",
  color: "primary",
};

EditableTableRow.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  RowData: PropTypes.object,
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

export default EditableTableRow;
