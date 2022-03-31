import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../../_utils/theme";

const HtmlHead = styled.thead``;

const TableHead = (props) => {
  //--------------------------
  const { className, size, color, theme } = props;

  const themeProps = {
    className,
    size,
    color,
    theme,
  };

  return <HtmlHead {...themeProps}>{props.children}</HtmlHead>;
};

TableHead.defaultProps = {
  __TYPE__: "TABLE_HEAD",
  //--------------------
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
};

TableHead.propTypes = {
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

export default TableHead;
