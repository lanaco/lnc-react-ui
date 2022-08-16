import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import Checkbox from "../../../Basic Inputs/CheckBoxInput/index";

const HtmlCell = styled.td`
  padding: 0 0 0 1.25rem;
  background-color: transparent;
  width: ${(props) => props.width}%;
`;

const TableSelectionCell = (props) => {
  //--------------------------
  const {
    RowData,
    onSelectRow,
    IsSelected,
    Index,
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

  const onChange = (e) => {
    onSelectRow(e, RowData, IsSelected);
  };

  const onCellClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    onSelectRow(e, RowData, IsSelected);
  };

  return (
    <HtmlCell
      {...themeProps}
      key={Index}
      width={props.width}
      onClick={onCellClick}
    >
      <Checkbox id={Index} checked={IsSelected} onChange={onChange} />
    </HtmlCell>
  );
};

TableSelectionCell.defaultProps = {
  __TYPE__: "TABLE_SELECTION_CELL",
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
    "danger",
    "warning",
    "information",
    "neutral",
  ]),
};

export default TableSelectionCell;
