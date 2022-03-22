import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../../_utils/theme";
import Checkbox from "../../../Basic Inputs/CheckBox/index";

const HtmlCell = styled.th`
  text-align: left;
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  border-bottom: 1px solid ${(props) => props.theme.palette.transparent.light};
  border-top: 1px solid ${(props) => props.theme.palette.transparent.light};
  width: ${(props) => props.width};
  padding: ${(props) =>
    props.selection ? "2px 2px 2px 6px" : "8px 2px 8px 6px"};
  width: ${(props) => props.width}%;
`;

const TableHeadSelectionCell = (props) => {
  //--------------------------
  const {
    Column,
    RowData,
    SelectedData,
    EnableSelectAll,
    IsSelected,
    Index,
    onSelectAll,
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
    <HtmlCell
      {...themeProps}
      selection={EnableSelectAll}
      key={Index}
      width={props.width}
    >
      {EnableSelectAll && (
        <Checkbox
          id={Index}
          checked={IsSelected}
          onChange={(e) => onSelectAll(e, IsSelected)}
        />
      )}
    </HtmlCell>
  );
};

TableHeadSelectionCell.defaultProps = {
  __TYPE__: "TABLE_HEAD_SELECTION_CELL",
  //--------------------
  Column: {},
  RowData: {},
  Index: 0,
  SelectedData: [],
  IsSelected: null,
  EnableSelectAll: false,
  //--------------------
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
};

TableHeadSelectionCell.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  Column: PropTypes.object.isRequired,
  RowData: PropTypes.object.isRequired,
  Index: PropTypes.number.isRequired,
  SelectedData: PropTypes.array,
  IsSelected: PropTypes.bool,
  EnableSelectAll: PropTypes.bool,
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

export default TableHeadSelectionCell;
