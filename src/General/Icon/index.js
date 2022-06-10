import React from "react";
import "../../Base/fontawesome/css/fontawesome.css";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../../_utils/theme";

const Span = styled.span`
  box-sizing: border-box;
  background-color: inherit;
  font-size: ${(props) => (props.sizeInUnits && props.sizeInUnits != "") ? props.sizeInUnits : props.theme.typography[props.size].iconFontSize};
  color: ${(props) => props.theme.test_palette[props.color][400]};

`;

const Icon = (props) => {
  const {
    id,
    icon,
    iconStyle,
    tooltip,
    className,
    style,
    size,
    sizeInUnits,
    color,
    ...rest } = props;

  const themeProps = { theme, size, color, sizeInUnits };

  const getIconClass = () => {
    var style = iconStyle === "solid" ? "fas" : "far";
    return `${style} fa-${icon} fa-fw`;
  };

  return (
    <Span {...themeProps} tooltip={tooltip} className={className} style={style} {...rest}>
      <i className={getIconClass()} />
    </Span>
  );
};

Icon.defaultProps = {
  id: "",
  icon: "",
  iconStyle: "solid",
  tooltip: "",
  className: "",
  stlye: {},
  size: "small",
  sizeInUnits: "",
  color: "primary",
};

Icon.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.string,
  iconStyle: PropTypes.oneOf(["solid", "regular"]),
  tooltip: PropTypes.string,
  //----------------
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /**
    Size in one of the css units (px, rem, em, ... ), sizeInUnits overrides size property
   */
  sizeInUnits: PropTypes.string,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "disabled",
    "white",
  ]),
};

export default Icon;
