import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";

const HtmlHead = styled.thead`
  border-radius: 0.5rem 0.5rem 0 0;
`;

const TableHead = (props) => {
  //--------------------------
  const { className, size, color } = props;
  const theme = useTheme();

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
    "warning",
    "danger",
    "information",
    "neutral",
    "gray"
  ]),
};

export default TableHead;
