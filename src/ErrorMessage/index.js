import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../_utils/theme";

const fontSize = (props) => {
  var fontSize =
    parseFloat(props.theme.typography[props.size].fontSize.replace("px", "")) -
    1.5 +
    "px";

  return fontSize;
};

const paddingBySize = (size) => {
  if (size === "small") return `0.1875rem 0.3rem`;
  if (size === "medium") return `0.25rem 0.4rem`;
  if (size === "large") return `0.3125rem 0.5rem`;
};

// const heightBySize = (size) => {
//   if (size === "small") return `max-height: 1.25rem; min-height: 1.25rem;`;
//   if (size === "medium") return `max-height: 1.625rem; min-height: 1.625rem;`;
//   if (size === "large") return `max-height: 2rem; min-height: 2rem;`;
// };

const Container = styled.div`
  border: 0.0625rem solid ${(props) => props.theme.palette.error.dark};
  border-radius: 0.15625rem;
  background-color: ${(props) => props.theme.palette.error.lighter};
  color: ${(props) => props.theme.palette.error.dark};
  font-size: ${(props) => fontSize(props)};
  font-family: ${(props) => props.theme.typography.fontFamily};
  padding: ${(props) => paddingBySize(props.size)};
  word-wrap: break-word;
  box-sizing: border-box;
`;

const ErrorMessage = (props) => {
  const { className, size, color, theme, message } = props;

  const themeProps = { theme, size, color };

  return (
    <Container {...themeProps} className={className}>
      {message}
    </Container>
  );
};

ErrorMessage.defaultProps = {
  className: "",
  size: "small",
  theme: theme,
};

ErrorMessage.propTypes = {
  theme: PropTypes.object.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default ErrorMessage;
