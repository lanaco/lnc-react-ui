import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";

const HtmlRow = styled.tr`
  border-radius: 0.5rem 0.5rem 0 0;
`;

const TableHeadRow = (props) => {
  //--------------------------
  const {
    Index,
    //-------------
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
    <HtmlRow {...themeProps} key={Index}>
      {props.children}
    </HtmlRow>
  );
};

TableHeadRow.defaultProps = {
  __TYPE__: "TABLE_HEAD_ROW",
  //--------------------
  Index: 0,
  //--------------------
  className: "",
  size: "small",
  color: "primary",
};

TableHeadRow.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  Index: PropTypes.any,
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
    "gray"
  ]),
};

export default TableHeadRow;
