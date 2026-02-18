/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import {
  getColorRgbaValue,
  getComponentTypographyCss,
} from "../../_utils/utils";

const Span = styled.span`
  box-sizing: border-box;
  ${(props) =>
    props.sizeInUnits && props.sizeInUnits != ""
      ? `font-size: ${props.sizeInUnits}`
      : getComponentTypographyCss(props.theme, "Icon", props.size, "enabled")};
  ${(props) =>
    props.color &&
    `color: ${getColorRgbaValue(
      props.theme,
      "Icon",
      props.color,
      "enabled",
      "icon",
    )}`};
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

const Icon = forwardRef((props, ref) => {
  const {
    icon = "",
    iconStyle = "solid",
    tooltip = "",
    sizeInUnits = "",
    size = "small",
    color,
    className = "",
    style = {},
    ...rest
  } = props;

  const theme = useTheme();

  const themeProps = { theme, size, color, sizeInUnits };

  const getIconClass = () => {
    var style = iconStyle === "solid" ? "fas" : "far";
    return `${style} fa-${icon} fa-fw`;
  };

  return (
    <Span
      ref={ref}
      {...themeProps}
      tooltip={tooltip}
      className={className}
      style={style}
      {...rest}
    >
      <i
        data-control={props["data-control"] ? true : false}
        className={getIconClass()}
      />
    </Span>
  );
});

// Icon.defaultProps = {
//   id: "",
//   icon: "",
//   iconStyle: "solid",
//   tooltip: "",
//   className: "",
//   style: {},
//   size: "small",
//   sizeInUnits: "",
// };

export default Icon;
