import React from "react";
import "../Base/fontawesome/css/fontawesome.css";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../_utils/theme";

const getPadding = (size) => {
  if (size === "small") return "0.4125rem 0.34375rem";
  if (size === "medium") return "0.475rem 0.415625rem";
  if (size === "large") return "0.5375rem 0.44375rem";
};

const heightBySize = (size) => {
  if (size === "small") return `max-height: 1.625rem; min-height: 1.625rem;`;
  if (size === "medium") return `max-height: 2rem; min-height: 2rem;`;
  if (size === "large") return `max-height: 2.375rem; min-height: 2.375rem;`;
};

const Span = styled.span`
  background-color: inherit;
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  padding: ${(props) => getPadding(props.size)};
  color: ${(props) => props.theme.palette[props.color].main};
  ${(props) => heightBySize(props.size)}
`;

const Icon = (props) => {
  const { tooltip, icon, iconStyle, className, size, color, theme } = props;

  const themeProps = { theme, size, color };

  const getIconClass = () => {
    var style = iconStyle === "solid" ? "fas" : "far";
    return `${style} fa-${icon} fa-fw`;
  };

  return (
    <Span {...themeProps} className={className} tooltip={tooltip}>
      <i className={getIconClass()} />
    </Span>
  );
};

Icon.defaultProps = {
  tooltip: "",
  icon: "",
  iconStyle: "solid",
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
};

Icon.propTypes = {
  tooltip: PropTypes.string,
  theme: PropTypes.object.isRequired,
  icon: PropTypes.string,
  iconStyle: PropTypes.oneOf(["solid", "regular"]),
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
  ]),
};

export default Icon;
