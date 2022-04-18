import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../../_utils/theme";
import Checkbox from "../../../Basic Inputs/CheckBox/index";

const HtmlCell = styled.td`
  padding: 4px 2px 4px 6px;
  background-color: transparent;
  width: ${(props) => props.width}%;
`;

const Inner = styled.div`
  wdith: 100%;
  display: flex;
  flex-direction: row-reverse;
`;

const TableSelectionCell = (props) => {
  //--------------------------
  const {
    Column,
    RowData,
    SelectedData,
    onSelectRow,
    IsSelected,
    RowIdentifier,
    Index,
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

  const calculateRowSelection = (rowData) => {
    // Check if row is selected
    let row = SelectedData.find(
      (x) => String(x[RowIdentifier]) === String(rowData[RowIdentifier])
    );

    if (row !== null && row !== undefined) return true;
    else return false;

    return false;
  };

  const onChange = (e) => {
    console.log(RowData.id);
    onSelectRow(e, RowData, calculateRowSelection(RowData));
  };

  const onCellClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    onSelectRow(e, RowData, calculateRowSelection(RowData));
  };

  return (
    <HtmlCell
      {...themeProps}
      key={Index}
      width={props.width}
      onClick={onCellClick}
    >
      <Inner>
        <Checkbox
          id={Index}
          checked={calculateRowSelection(RowData)}
          onChange={onChange}
        />
      </Inner>
    </HtmlCell>
  );
};

TableSelectionCell.defaultProps = {
  __TYPE__: "ANALYTICAL_TABLE_SELECTION_CELL",
  //--------------------
  Column: {},
  RowData: {},
  onSelectRow: () => {},
  Index: 0,
  SelectedData: [],
  IsSelected: null,
  //--------------------
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
};

TableSelectionCell.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  Column: PropTypes.object.isRequired,
  RowData: PropTypes.object.isRequired,
  onSelectRow: PropTypes.func,
  Index: PropTypes.number.isRequired,
  SelectedData: PropTypes.array,
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

export default TableSelectionCell;
