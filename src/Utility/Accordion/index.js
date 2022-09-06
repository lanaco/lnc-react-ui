import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { getColorRgbaValue } from "../../_utils/utils";

const StyledAccordion = styled.div`
color: ${(props) =>
  !props.disabled &&
  getColorRgbaValue(
    props.theme,
    "Accordion",
    props.color,
    "enabled",
    "text"
  )};
background-color: ${(props) =>
  props.type == "regular" || (props.type == "pill" && props.disabled)
    ? "transparent"
    : !props.disabled &&
      getColorRgbaValue(
        props.theme,
        "Accordion",
        props.color,
        "enabled",
        "background",
        "backgroundOpacity"
      )};
`;

const Accordion = React.forwardRef((props, ref) => {
  const { disabled, color, size, className, style, children, ...rest } = props;

  const theme = useTheme();

  const themeProps = { theme, color, size, style, className };

  return <StyledAccordion ref={ref} {...themeProps} disabled={disabled}>{children}</StyledAccordion>;
});

Accordion.defaultProps = {
  disabled: false,
  //-------------------------
  style: {},
  color: "primary",
  size: "small",
};

Accordion.propTypes = {
  disabled: PropTypes.bool,
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

export default Accordion;
