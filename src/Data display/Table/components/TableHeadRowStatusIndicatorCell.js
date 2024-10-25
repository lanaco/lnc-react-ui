import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import { getColorRgbaValue } from "../../../_utils/utils";

const HtmlHeadCell = styled.th`
  padding: 0.125rem;
  width: 8px;

  background-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "TableHeadCell",
      null,
      "enabled",
      "background"
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

const TableHeadRowStatusIndicatorCell = (props) => {
  //--------------------------
  const {
    __TYPE__ = "TABLE_HEAD_ROW_STATUS_INDICATOR_CELL",
    Index,
    //-----------
    className = "",
    size = "small",
    color = "primary",
  } = props;

  const theme = useTheme();

  const themeProps = {
    className,
    size,
    color,
    theme,
  };

  return <HtmlHeadCell {...themeProps} key={Index}></HtmlHeadCell>;
};

// TODO : type
// TableHeadRowStatusIndicatorCell.defaultProps = {
//   __TYPE__: "TABLE_HEAD_ROW_STATUS_INDICATOR_CELL",
//   //--------------------
//   className: "",
//   size: "small",
//   color: "primary",
// };

TableHeadRowStatusIndicatorCell.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  className: PropTypes.string,
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

export default TableHeadRowStatusIndicatorCell;

TableHeadRowStatusIndicatorCell.displayName = 'TABLE_HEAD_ROW_STATUS_INDICATOR_CELL';
