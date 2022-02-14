import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../_utils/theme";
import {
  getChildComponentByType,
  renderCustomElement,
} from "../../_utils/utils";

const HtmlRow = styled.tr`
  border-bottom: 1px solid transparent;
  border-top: 1px solid transparent;

  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  font-family: ${(props) => props.theme.typography.fontFamily};
`;

const EditableTableRow = (props) => {
  //--------------------------
  const {
    onRowClick,
    onSelectRow,
    RowData,
    // SelectedData,
    // Columns,
    // ColumnsToRender,
    Index,
    IsSelected,
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

  const onClick = (e) => {
    // e.stopPropagation();
    // e.nativeEvent.stopImmediatePropagation();
    // onRowClick(e, RowData);
  };

  return (
    <HtmlRow {...themeProps} key={Index} onClick={onClick}>
      {props.children}
    </HtmlRow>
  );
};

EditableTableRow.defaultProps = {
  __TYPE__: "TABLE_ROW",
  //--------------------
  onRowClick: () => {},
  onSelectRow: () => {},
  RowData: {},
  // SelectedData: [],
  // Columns: [],
  // ColumnsToRender: [],
  //--------------------
  IsSelected: null,
  //--------------------
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
};

EditableTableRow.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  onRowClick: PropTypes.func,
  onSelectRow: PropTypes.func,
  RowData: PropTypes.object,
  // SelectedData: PropTypes.array,
  // Columns: PropTypes.arrayOf(PropTypes.object),
  // ColumnsToRender: PropTypes.arrayOf(PropTypes.object),
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
  theme: PropTypes.object.isRequired,
};

export default EditableTableRow;
