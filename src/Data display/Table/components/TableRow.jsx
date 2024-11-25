import styled from "@emotion/styled";
import PropTypes from "prop-types";
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
      "border"
    )};`}
  ${(props) =>
    props.noBorder == false &&
    `border-left: 1px solid ${getColorRgbaValue(
      props.theme,
      "TableRow",
      null,
      "enabled",
      "border"
    )};`}
${(props) =>
    props.noBorder == false &&
    `border-right: 1px solid ${getColorRgbaValue(
      props.theme,
      "TableRow",
      null,
      "enabled",
      "border"
    )};`}
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
    __TYPE__ = "TABLE_ROW",
    onRowClick = () => {},
    RowData = {},
    Index,
    IsSelected = null,
    noBorder = false,
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

TableRow.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  onRowClick: PropTypes.func,
  RowData: PropTypes.object,
  //----------------------------------------
  IsSelected: PropTypes.bool,
  noBorder: PropTypes.bool,
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
    "gray",
  ]),
};

export default TableRow;

TableRow.displayName = "TABLE_ROW";
