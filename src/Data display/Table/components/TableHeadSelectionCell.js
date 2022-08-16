import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import Checkbox from "../../../Basic Inputs/CheckBoxInput/index";
import { getColorRgbaValue } from "../../../_utils/utils";

const HtmlCell = styled.th`
  text-align: left;
  width: ${(props) => props.width};
  padding-left: 1.25rem;

  background-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "TableHeadCell",
      null,
      "enabled",
      "background"
    )}};

  border-top: ${(props) =>
    "1px solid " +
    getColorRgbaValue(
      props.theme,
      "TableHeadCell",
      null,
      "enabled",
      "border"
    )}};
  
  border-bottom: ${(props) =>
    "1px solid " +
    getColorRgbaValue(
      props.theme,
      "TableHeadCell",
      null,
      "enabled",
      "border"
    )}};
  
  border-radius: 0.5rem 0 0 0;
`;

const TableHeadSelectionCell = (props) => {
  //--------------------------
  const {
    EnableSelectAll,
    IsSelected,
    Index,
    onSelectAll,
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
  Index: 0,
  IsSelected: null,
  EnableSelectAll: false,
  //--------------------
  className: "",
  size: "small",
  color: "primary",
};

TableHeadSelectionCell.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  Index: PropTypes.number.isRequired,
  IsSelected: PropTypes.bool,
  EnableSelectAll: PropTypes.bool,
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

export default TableHeadSelectionCell;
