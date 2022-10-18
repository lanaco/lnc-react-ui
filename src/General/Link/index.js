import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { getColorRgbaValue, getComponentTypographyCss } from "../../_utils/utils";

const StlyedLink = styled.a`
  ${(props) =>
    getComponentTypographyCss(
      props.theme,
      "Breadcrumbs",
      props.size,
      "enabled"
    )};
  color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Link",
      props.color,
      "enabled",
      "text"
    )};
    text-decoration: none;

    &:hover {
        color: ${(props) =>
            getColorRgbaValue(
              props.theme,
              "Link",
              props.color,
              "hover",
              "text"
            )};
    }
    &:active {
        color: ${(props) =>
            getColorRgbaValue(
              props.theme,
              "Link",
              props.color,
              "active",
              "text"
            )};
    }
    &:visited {
        color: ${(props) =>
            getColorRgbaValue(
              props.theme,
              "Link",
              props.color,
              "visited",
              "text"
            )};
    }
`;

const Link = React.forwardRef((props, ref) => {
  const {
    //----------------
    className,
    style,
    color,
    size,
    children,
    ...rest
  } = props;

  const theme = useTheme();

  const themeProps = { theme, size, color, className, style };

  return (
    <StlyedLink ref={ref} {...themeProps} {...rest}>
      {children}
    </StlyedLink>
  );
});

Link.defaultProps = {
  //-------------------------
  style: {},
  color: "primary",
  size: "small",
};

Link.propTypes = {
  //---------------------------------------------------------------
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "information",
    "neutral",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default Link;
