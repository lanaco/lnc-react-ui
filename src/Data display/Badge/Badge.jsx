/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import { forwardRef } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import {
  getBorderRadiusValueWithUnits,
  getColorRgbaValue,
  getComponentTypographyCss,
} from "../../_utils/utils";

const getSize = (size) => {
  if (size == "large") return "2rem";
  if (size == "medium") return "1.75rem";

  return "1.5rem";
};

const StyledBadge = styled.div`
  ${(props) =>
    getComponentTypographyCss(props.theme, "Badge", props.size, "enabled")};
  background-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Badge",
      props.color,
      "enabled",
      "background",
      "backgroundOpacity"
    )};
  color: ${(props) =>
    getColorRgbaValue(props.theme, "Badge", props.color, "enabled", "text")};
  border-radius: ${(props) =>
    getBorderRadiusValueWithUnits(props.theme, props.borderRadius)};
  display: inline-flex;
  min-width: ${(props) => getSize(props.size)};
  min-height: ${(props) => getSize(props.size)};
  max-height: ${(props) => getSize(props.size)};
  justify-content: center;
  align-items: center;
  padding: 0.313rem;

  & i {
    font-size: ${(props) =>
      props.size == "small"
        ? "0.75rem"
        : props.size == "medium"
        ? "0.875rem"
        : "1rem"};
  }
`;

const Badge = forwardRef((props, ref) => {
  const {
    borderRadius = "curved",
    onClick = () => {},
    className = "",
    style = {},
    color = "primary",
    size = "small",
    children,
    ...rest
  } = props;

  const theme = useTheme();

  const themeProps = {
    borderRadius,
    theme,
    size,
    color,
    className: "lnc-ui-badge " + className,
    style,
  };

  return (
    <StyledBadge ref={ref} {...themeProps} onClick={onClick} {...rest}>
      {children}
    </StyledBadge>
  );
});

Badge.propTypes = {
  onClick: PropTypes.func,
  borderRadius: PropTypes.oneOf([
    "slight",
    "regular",
    "edged",
    "curved",
    "none",
  ]),
  //---------------------------
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
    "gray",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default Badge;
