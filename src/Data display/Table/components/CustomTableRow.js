import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../../_utils/theme";

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
    onRowClick,
    onSelectRow,
    RowData,
    SelectedData,
    Columns,
    ColumnsToRender,
    Index,
    IsSelected,
  } = props;

  return (
    <HtmlRow IsSelected={IsSelected} key={Index}>
      {props.children}
    </HtmlRow>
  );
};

CustomTableRow.defaultProps = {
  __TYPE__: "TABLE_ROW",
  //--------------------

  //--------------------
  size: "small",
  color: "primary",
  theme: theme,
};

CustomTableRow.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------

  //----------------------------------------
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

export default CustomTableRow;