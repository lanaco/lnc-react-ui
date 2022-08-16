import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import { getColorRgbaValue } from "../../../_utils/utils";

const HtmlHeadCellOld = styled.th`
  text-align: left;
  transition: all 250ms ease;
  font-weight: 900;
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  border-bottom: 1px solid ${(props) => props.theme.palette.transparent.light};
  border-top: 1px solid ${(props) => props.theme.palette.transparent.light};

  &:first-of-type {
    border-radius: 8px 0 0 0;
  }

  &:last-of-type {
    border-radius: 0 8px 0 0;
  }
`;

const HtmlHeadCell = styled.th`
  padding: 0.125rem;

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
    Index,
    //-----------
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

  return <HtmlHeadCell {...themeProps} key={Index}></HtmlHeadCell>;
};

TableHeadRowStatusIndicatorCell.defaultProps = {
  __TYPE__: "TABLE_HEAD_ROW_STATUS_INDICATOR_CELL",
  //--------------------
  className: "",
  size: "small",
  color: "primary",
};

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
  ]),
};

export default TableHeadRowStatusIndicatorCell;
