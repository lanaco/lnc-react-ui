import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../_utils/theme";
import Alet from "../Alert/index";

const fontSize = (props) => {
  let fontSize = props.theme.typography[props.size].fontSize;
  let newFontSize = "";

  if (fontSize.includes("px")) {
    newFontSize =
      parseFloat(
        props.theme.typography[props.size].fontSize.replace("px", "")
      ) -
      1.5 +
      "px";
  }

  if (fontSize.includes("rem")) {
    newFontSize =
      parseFloat(
        props.theme.typography[props.size].fontSize.replace("rem", "")
      ) -
      0.09375 +
      "rem";
  }

  return newFontSize;
};
const Container = styled.div`
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  font-family: ${(props) => props.theme.typography.fontFamily};
`;

const LabelContainer = styled.div`
  font-size: ${(props) => fontSize(props)};
  font-family: ${(props) => props.theme.typography.fontFamily};
  margin-bottom: 0.1875rem;
  color: #777a80;
`;

const ErrorContainer = styled.div`
  margin-top: ${(props) => (props.hasContainer ? "0.2rem" : "0.05rem")};
`;

const FormField = (props) => {
  const {
    className,
    size,
    color,
    theme,
    children,
    errorMessage,
    label,
    required,
    hasContainer,
  } = props;

  const themeProps = { theme, size, color };

  return (
    <Container {...themeProps} className={className}>
      {label && label !== null && (
        <LabelContainer {...themeProps}>
          {label}
          {required ? "*" : ""}
        </LabelContainer>
      )}

      {children}
      {errorMessage && errorMessage !== "" && (
        <ErrorContainer {...themeProps} hasContainer={hasContainer}>
          <Alet
            {...themeProps}
            color="error"
            message={errorMessage}
            hasContainer={hasContainer}
          />
        </ErrorContainer>
      )}
    </Container>
  );
};

FormField.defaultProps = {
  className: "",
  size: "small",
  theme: theme,
  errorMessage: "",
  label: "",
  required: false,
  hasContainer: true,
};

FormField.propTypes = {
  theme: PropTypes.object.isRequired,
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  hasContainer: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default FormField;
