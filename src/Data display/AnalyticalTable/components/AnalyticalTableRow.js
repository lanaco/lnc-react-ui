import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";

const HtmlRow = styled.tr`
  border-bottom: 1px solid transparent;
  border-top: 1px solid transparent;

  ${(props) => {
    if (props.IsSelected !== true)
      return `
       &:hover {
          & > td {
            // background-color: whitesmoke ;
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

//================================================================================

const AnalyticalTableRow = (props) => {
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

    onRowClick(e, RowData);
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

AnalyticalTableRow.defaultProps = {
  __TYPE__: "ANALYTICAL_TABLE_ROW",
  //--------------------
  onRowClick: () => {},
  onSelectRow: () => {},
  RowData: {},
  SelectedData: [],
  Columns: [],
  ColumnsToRender: [],
  //--------------------
  IsSelected: null,
  //--------------------
  className: "",
  size: "small",
  color: "primary",
};

AnalyticalTableRow.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  onRowClick: PropTypes.func,
  onSelectRow: PropTypes.func,
  RowData: PropTypes.object,
  SelectedData: PropTypes.array,
  Columns: PropTypes.arrayOf(PropTypes.object),
  ColumnsToRender: PropTypes.arrayOf(PropTypes.object),
  //----------------------------------------
  IsSelected: PropTypes.bool,
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
};

export default AnalyticalTableRow;
