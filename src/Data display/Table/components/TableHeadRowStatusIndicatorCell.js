import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../../_utils/theme";

const HtmlHeadCell = styled.th`
  text-align: left;
  transition: all 250ms ease;
  font-weight: 900;
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  border-bottom: 1px solid ${(props) => props.theme.palette.transparent.light};
  border-top: 1px solid ${(props) => props.theme.palette.transparent.light};

  &:first-of-type {
    border-radius: 3px 0 0 0;
  }

  &:last-of-type {
    border-radius: 0 3px 0 0;
  }
`;

const TableHeadRowStatusIndicatorCell = (props) => {
  //--------------------------
  const {
    Index,
    //-----------
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

  return <HtmlHeadCell {...themeProps} key={Index}></HtmlHeadCell>;
};

TableHeadRowStatusIndicatorCell.defaultProps = {
  __TYPE__: "TABLE_HEAD_ROW_STATUS_INDICATOR_CELL",
  //--------------------
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
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
    "error",
    "warning",
    "gray",
    "white",
    "black",
  ]),
  theme: PropTypes.object.isRequired,
};

export default TableHeadRowStatusIndicatorCell;
