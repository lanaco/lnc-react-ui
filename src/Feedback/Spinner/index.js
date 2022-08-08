import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { keyframes, useTheme } from "@emotion/react";
import { getColorRgbaValue, getComponentTypographyCss } from "../../_utils/utils";

const heightBySize = (size) => {
  if (size === "small")
    return `
          width: 3.125rem;
          height: 3.125rem;
        `;

  if (size === "medium")
    return `
            width: 4.375rem;
            height: 4.375rem;
        `;

  if (size === "large")
    return `
          width: 6.25rem;
          height: 6.25rem;
        `;
};

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
  position: relative;
  height: max-content;
  width: max-content;
  display: flex;
  & .label-text {
    display: ${props => props.label ? 'unset': 'none'};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    ${(props) =>
      getComponentTypographyCss(props.theme, "Spinner", props.size, "enabled")};
    color: ${(props) =>
      getColorRgbaValue(props.theme, "Spinner", props.color, "enabled", "text")};
  }
`;

const StyledSpinner = styled.div`
  display: inline-block;
  ${(props) => heightBySize(props.size)}
  border: ${props =>  `0.3125rem solid ${getColorRgbaValue(props.theme, "Spinner", props.color, "enabled", "unfilled")}`};
  border-radius: 50%;
  border-top-color: ${(props) =>
    getColorRgbaValue(props.theme, "Spinner", props.color, "enabled", "background")};
  border-right-color: ${(props) =>
    getColorRgbaValue(props.theme, "Spinner", props.color, "enabled", "background")};

  animation: ${spin} 0.8s ease-in-out infinite;
`;

const Spinner = (props) => {
  const { label, className, style, size, color } = props;
  const theme = useTheme();

  const themeProps = { theme, size, color };

  return (
    <SpinnerWrapper {...themeProps} className={className} style={style} label={label}>
      <StyledSpinner {...themeProps}></StyledSpinner>
      <div className="label-text">{label}</div>
    </SpinnerWrapper>
  );
};

Spinner.defaultProps = {
  className: "",
  stlye: {},
  size: "small",
  color: "primary",
};

Spinner.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "information",
  ]),
};

export default Spinner;
