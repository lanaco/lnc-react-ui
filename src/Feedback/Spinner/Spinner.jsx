import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { keyframes, useTheme } from "@emotion/react";
import {
  getColorRgbaValue,
  getComponentTypographyCss,
} from "../../_utils/utils";


const FontSize = {
  small: "0.6rem",
  medium: "0.7rem",
  large: "0.8rem"
};

const heightBySize = (size, theme) => {
  if (size === "small")
    return `
          width: ${theme.sizes.small};
          height: ${theme.sizes.small};
        `;

  if (size === "medium")
    return `
            width: ${theme.sizes.medium};
            height: ${theme.sizes.medium};
        `;

  if (size === "large")
    return `
          width: ${theme.sizes.large};
          height: ${theme.sizes.large};
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
    display: ${(props) => (props.label ? "unset" : "none")};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    ${(props) =>
      getComponentTypographyCss(props.theme, "Spinner", props.size, "enabled")};
    font-size: ${(props) => FontSize[props.size]};
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Spinner",
        props.color,
        "enabled",
        "text"
      )};
  }
`;

const StyledSpinner = styled.div`
  display: inline-block;
  ${(props) => heightBySize(props.size, props.theme)}
  border: ${(props) =>
    `0.3125rem solid ${getColorRgbaValue(
      props.theme,
      "Spinner",
      props.color,
      "enabled",
      "unfilled"
    )}`};
  border-radius: 50%;
  border-top-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Spinner",
      props.color,
      "enabled",
      "background"
    )};
  border-right-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Spinner",
      props.color,
      "enabled",
      "background"
    )};

  animation: ${spin} 0.8s ease-in-out infinite;
`;

const Spinner = (props) => {
  const { label, className = "", style = {}, size = "small", color = "primary" } = props;
  const theme = useTheme();

  const themeProps = { theme, size, color };

  return (
    <SpinnerWrapper
      {...themeProps}
      className={"lnc-ui-spinner " + className}
      style={style}
      label={label}
    >
      <StyledSpinner {...themeProps}></StyledSpinner>
      <div className="label-text">{label}</div>
    </SpinnerWrapper>
  );
};

// Spinner.defaultProps = {
//   className: "",
//   stlye: {},
//   size: "small",
//   color: "primary",
// };

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
    "neutral",
    "gray"
  ]),
};

export default Spinner;
