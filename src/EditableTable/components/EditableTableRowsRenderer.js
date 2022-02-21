import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../_utils/theme";
import {
  getChildComponentByType,
  renderCustomElement,
} from "../../_utils/utils";

const EditableTableRowsRenderer = (props) => {
  //--------------------------
  const {
    onRowClick,
    onSelectRow,
    RowData,

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

  return (
    <>
      {props.children}

      <div
        style={{
          padding: "8px",
          border: "2px solid green",
          width: "100%",
        }}
      >
        aaaaaaa
      </div>
    </>
  );
};

EditableTableRowsRenderer.defaultProps = {
  __TYPE__: "TABLE_ROWS_RENDERER",
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

EditableTableRowsRenderer.propTypes = {
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

export default EditableTableRowsRenderer;
