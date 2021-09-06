import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../_utils/theme";
import Message from "../Message/index";

const fontSize = (props) => {
  var fontSize =
    parseFloat(props.theme.typography[props.size].fontSize.replace("px", "")) -
    1.5 +
    "px";

  return fontSize;
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
  margin-top: 0.25rem;
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
        <ErrorContainer {...themeProps}>
          <Message {...themeProps} color="error" message={errorMessage} />
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
};

FormField.propTypes = {
  theme: PropTypes.object.isRequired,
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default FormField;
