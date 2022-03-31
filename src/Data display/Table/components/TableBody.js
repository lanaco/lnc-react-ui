import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../../_utils/theme";

const HtmlBody = styled.tbody``;

const TableBody = (props) => {
  //--------------------------
  const { className, size, color, theme } = props;

  const themeProps = {
    className,
    size,
    color,
    theme,
  };

  return (
    <HtmlBody data-tbody={true} {...themeProps}>
      {props.children}
    </HtmlBody>
  );
};

TableBody.defaultProps = {
  __TYPE__: "TABLE_BODY",
  //--------------------
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
};

TableBody.propTypes = {
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

export default TableBody;
