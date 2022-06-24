import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { keyframes, useTheme } from "@emotion/react";

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

const standardCssFields = ({ theme, color, size }) => {
  return `
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography[size].fontSize};
    color: ${theme.test_palette[color][400]}
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

  & .label-text {
    display: ${props => props.label ? 'unset': 'none'};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    ${(props) => standardCssFields(props)}
  }
`;

const StyledSpinner = styled.div`
  display: inline-block;
  ${(props) => heightBySize(props.size)}
  border: 0.3125rem solid ${(props) =>
    props.theme.test_palette["disabled"][400]};
  border-radius: 50%;
  border-top-color: ${(props) => props.theme.test_palette[props.color][400]};
  border-right-color: ${(props) => props.theme.test_palette[props.color][400]};

  animation: ${spin} 0.8s ease-in-out infinite;
`;

const Spinner = (props) => {
  const { label, className, style, size, color } = props;
  const theme = useTheme();

  const themeProps = { theme, size, color };

  return (
    <SpinnerWrapper {...themeProps} style={style} label={label}>
      <StyledSpinner {...themeProps} className={className}></StyledSpinner>
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
  id: PropTypes.string,
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
    "info",
  ]),
};

export default Spinner;
