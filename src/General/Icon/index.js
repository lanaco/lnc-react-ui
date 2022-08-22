import React from "react";
import "../../Base/fontawesome/css/fontawesome.css";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { getColorRgbaValue, getComponentTypographyCss } from "../../_utils/utils";


const Span = styled.span`
  box-sizing: border-box;
  ${(props) => (props.sizeInUnits && props.sizeInUnits != "") ? `font-size: ${props.sizeInUnits}` : getComponentTypographyCss(props.theme, "Icon", props.size, "enabled")};
  ${(props) => props.color && `color: ${getColorRgbaValue(props.theme, "Icon", props.color, "enabled", "icon")}`};
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const Icon = React.forwardRef((props, ref) => {
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

  const theme = useTheme();

  const themeProps = { theme, size, color, sizeInUnits };

  const getIconClass = () => {
    var style = iconStyle === "solid" ? "fas" : "far";
    return `${style} fa-${icon} fa-fw`;
  };

  return (
    <Span ref={ref} {...themeProps} tooltip={tooltip} className={className} style={style} {...rest}>
      <i className={getIconClass()} />
    </Span>
  );
});

Icon.defaultProps = {
  id: "",
  icon: "",
  iconStyle: "solid",
  tooltip: "",
  className: "",
  stlye: {},
  size: "small",
  sizeInUnits: "",
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
    "info",
  ]),
};

export default Icon;
