import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../_utils/theme";
import Checkbox from "../../CheckBox/index";

const HtmlCell = styled.td`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 2px 4px 6px;
  width: ${(props) => props.width}%;
`;

const TableSelectionCell = (props) => {
  //--------------------------
  const {
    Column,
    RowData,
    SelectedData,
    IsSelected,
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

  return (
    <HtmlCell {...themeProps} key={Index} width={props.width}>
      <Checkbox id={Index} checked={IsSelected} onChange={() => {}} />
    </HtmlCell>
  );
};

TableSelectionCell.defaultProps = {
  __TYPE__: "TABLE_SELECTION_CELL",
  //--------------------
  Column: {},
  RowData: {},
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
