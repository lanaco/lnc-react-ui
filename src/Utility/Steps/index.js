import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import { StyledSteps } from "./styledComponent";

const Steps = React.forwardRef((props, ref) => {
  const { vertical, borderRadius, size, color, className, style, children } =
    props;

  const theme = useTheme();

  const themeProps = { theme, vertical, borderRadius, size, color, style };

  const clonedStep = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, themeProps);
    }
  });

  return (
    <StyledSteps
      {...themeProps}
      ref={ref}
      className={`${className} ${vertical ? "vertical" : ""}`}
    >
      {clonedStep}
    </StyledSteps>
  );
});

Steps.defaultProps = {
  vertical: false,
  borderRadius: "curved",
  size: "medium",
  color: "primary",
  className: "",
  style: {},
};

Steps.propTypes = {
  vertical: PropTypes.bool,
  borderRadius: PropTypes.oneOf(["regular", "curved"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "information",
    "neutral",
  ]),
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Steps;
