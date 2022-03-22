import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../../_utils/theme";

const Container = styled.div`
  padding: 10px;
  margin: 2px;
  border: 1px solid red;
  border-radius: 2px;
  overflow-x: auto;
  white-space: nowrap;
  font-size: ${theme.typography.small.fontSize};
  font-family: ${theme.typography.fontFamily};
  position: relative;
`;

const CustomTableContainer = (props) => {
  //--------------------------
  const { className, size, color, theme } = props;

  const themeProps = {
    className,
    size,
    color,
    theme,
  };

  return <Container {...themeProps}>{props.children}</Container>;
};

CustomTableContainer.defaultProps = {
  __TYPE__: "TABLE_CONTAINER",
  //--------------------
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
};

CustomTableContainer.propTypes = {
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

export default CustomTableContainer;
