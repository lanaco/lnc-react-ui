import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../../_utils/theme";
import { keyframes } from "@emotion/react";

const heightBySize = (size) => {
  if (size === "small")
    return `
          width: 1.4rem;
          height: 1.4rem;
        `;

  if (size === "medium")
    return `
            width: 1.6rem;
            height: 1.6rem;
        `;

  if (size === "large")
    return `
          width: 1.8rem;
          height: 1.8rem;
        `;
};

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div`
  display: inline-block;
  ${(props) => heightBySize(props.size)}
  border: 0.3125rem solid ${(props) =>
    props.theme.palette[props.color].lighter};
  border-radius: 50%;
  border-top-color: ${(props) => props.theme.palette[props.color].main};
  animation: ${spin} 0.8s ease-in-out infinite;
`;

const Spinner = (props) => {
  const { className, size, color, theme } = props;

  const themeProps = { theme, size, color };

  return <StyledSpinner {...themeProps} className={className}></StyledSpinner>;
};

Spinner.defaultProps = {
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
};

Spinner.propTypes = {
  theme: PropTypes.object.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "gray",
  ]),
};

export default Spinner;
