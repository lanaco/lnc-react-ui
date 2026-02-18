/* eslint-disable react/prop-types */
import styled from "@emotion/styled";
import { getColorRgbaValue } from "../../../_utils/utils";
import { useTheme } from "@emotion/react";

const HtmlRow = styled.tr`
  ${(props) =>
    props.noBorder == false &&
    `border-bottom: 1px solid ${getColorRgbaValue(
      props.theme,
      "TableRow",
      null,
      "enabled",
      "border",
    )};`}
  ${(props) =>
    props.noBorder == false &&
    `border-left: 1px solid ${getColorRgbaValue(
      props.theme,
      "TableRow",
      null,
      "enabled",
      "border",
    )};`}
${(props) =>
    props.noBorder == false &&
    `border-right: 1px solid ${getColorRgbaValue(
      props.theme,
      "TableRow",
      null,
      "enabled",
      "border",
    )};`}

  ${(props) => props.rowCss || ""}
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
              "background",
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
            "background",
          )};
        }
      `;
    } else return "";
  }}
`;

const TableRow = (props) => {
  //--------------------------
  const {
    onRowClick = () => {},
    RowData = {},
    Index,
    IsSelected = null,
    noBorder = false,
    rowCss = "",
    //----------------
    className = "",
    size = "small",
    color = "primary",
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
      noBorder={noBorder}
      rowCss={rowCss}
    >
      {props.children}
    </HtmlRow>
  );
};

// TODO : type
// TableRow.defaultProps = {
//   __TYPE__: "TABLE_ROW",
//   //--------------------
//   onRowClick: () => {},
//   RowData: {},
//   noBorder: false,
//   //--------------------
//   IsSelected: null,
//   //--------------------
//   className: "",
//   size: "small",
//   color: "primary",
// };

export default TableRow;

TableRow.displayName = "TABLE_ROW";
