import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";

const HtmlBody = styled.tbody``;

const TableBody = (props) => {
  //--------------------------
  const {
    __TYPE__ = "TABLE_BODY",
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

  return (
    <HtmlBody data-tbody={true} {...themeProps}>
      {props.children}
    </HtmlBody>
  );
};

// TODO : type
// TableBody.defaultProps = {
//   __TYPE__: "TABLE_BODY",
//   //--------------------
//   className: "",
//   size: "small",
//   color: "primary",
// };

TableBody.propTypes = {
  __TYPE__: PropTypes.string,
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
    "gray",
  ]),
};

export default TableBody;

TableBody.displayName = "TABLE_BODY";
