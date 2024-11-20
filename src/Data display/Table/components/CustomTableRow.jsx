import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useTheme } from "styled-components";

const HtmlRow = styled.tr`
  border-bottom: 1px solid transparent;
  border-top: 1px solid transparent;

  ${(props) => {
    if (props.IsSelected !== true)
      return `
        &:hover {
          & > td {
            background-color: black;
            color: white;
          }
          cursor: pointer;
      }`;
    else return "";
  }}

  ${(props) => {
    if (props.IsSelected === true)
      return `
        background-color: ${theme.palette.primary.lighter};
        cursor: pointer;
      `;
    else return "";
  }}
`;

const CustomTableRow = (props) => {
  //--------------------------
  const {
    __TYPE__ = "TABLE_ROW",
    onRowClick,
    onSelectRow,
    RowData,
    SelectedData,
    Columns,
    ColumnsToRender,
    Index,
    IsSelected,
  } = props;
 
  const theme = useTheme();

  return (
    <HtmlRow IsSelected={IsSelected} key={Index} theme={theme}>
      {props.children}
    </HtmlRow>
  );
};

// TODO : type
// CustomTableRow.defaultProps = {
//   __TYPE__: "TABLE_ROW",
//   //--------------------
// };

CustomTableRow.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  //----------------------------------------
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "information",
    "neutral",
    "gray"
  ]),
};

export default CustomTableRow;

CustomTableRow.displayName = 'TABLE_ROW';