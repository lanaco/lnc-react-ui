import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import { StyledStep } from "./styledComponent";

const Step = React.forwardRef((props, ref) => {
  const {
    content,
    title,
    done,
    active,
    vertical,
    borderRadius,
    size,
    color,
    className,
    style,
  } = props;

  const theme = useTheme();

  const themeProps = { theme, borderRadius, size, color, style };

  return (
    <StyledStep
      {...themeProps}
      ref={ref}
      className={`${className} ${size} ${done ? "done" : ""} ${
        active ? "active" : ""
      } ${vertical ? "vertical" : ""}`}
      content={content}
    >
      <span>{title}</span>
    </StyledStep>
  );
});

Step.defaultProps = {
  done: false,
  active: false,
  className: "",
  style: {},
};

Step.propTypes = {
  content: PropTypes.string,
  title: PropTypes.string,
  done: PropTypes.bool,
  active: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Step;
