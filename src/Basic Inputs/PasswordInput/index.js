import React, { useState } from "react";
import "../../Base/fontawesome/css/fontawesome.css";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../../_utils/theme";

const paddingBySize = (size) => {
  if (size === "small") return "0.325rem 0.375rem";
  if (size === "medium") return "0.3875rem 0.375rem";
  if (size === "large") return "0.425rem 0.375rem";
};

const heightBySize = (size, hasText) => {
  if (size === "small") return `1.625rem`;
  if (size === "medium") return `2rem`;
  if (size === "large") return `2.375rem`;
};

const Span = styled.span((props) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  borderBottom: `2px solid ${props.theme.palette[props.color].main}`,
  backgroundColor: props.theme.palette[props.color].lighter,
  color: props.theme.palette[props.color].textDark,
  padding: paddingBySize(props.size),
  borderRadius: "0 2px 2px 0",
  cursor: "pointer",

  "&:disabled": {
    backgroundColor: props.theme.palette.gray[200],
    borderBottom: "2px solid " + props.theme.palette.gray[900],
    color: props.theme.palette.gray.textLight,
    opacity: 0.7,
    cursor: "default",
  },
}));

const Icon = styled.i((props) => ({
  fontSize: props.theme.typography[props.size].fontSize,
}));

const Container = styled.div((props) => ({
  display: "flex",
  fontFamily: props.theme.typography.fontFamily,
  outline: "none",
  width: "100%",
}));

const Input = styled.input((props) => ({
  appearance: "none",
  outline: "none",
  border: "none",
  fontFamily: "inherit",
  borderBottom: `0.125rem solid ${props.theme.palette[props.color].main}`,
  transition: "all 250ms",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  cursor: "text",
  padding: paddingBySize(props.size),
  fontSize: props.theme.typography[props.size].fontSize,
  backgroundColor: props.theme.palette[props.color].lighter,
  color: props.theme.palette[props.color].textDark,
  borderRadius: "0.125rem 0 0 0.125rem",
  width: "100%",
  boxSizing: "border-box",
  minHeight: heightBySize(props.size),
  maxHeight: heightBySize(props.size),
  "&:disabled": {
    backgroundColor: props.theme.palette.gray[200],
    borderBottom: `0.125rem solid ${props.theme.palette.gray[900]}`,
    color: props.theme.palette.gray.textLight,
    opacity: 0.7,
    cursor: "default",

    "& ~ span": {
      backgroundColor: props.theme.palette.gray[200],
      borderBottom: `0.125rem solid ${props.theme.palette.gray[900]}`,
      color: props.theme.palette.gray.textLight,
      opacity: 0.7,
      cursor: "default",
    },
  },
  "&:focus": {
    backgroundColor: props.theme.palette.common.white,
    color: props.theme.palette.common.black,
  },
}));

const PasswordInput = React.forwardRef((props, ref) => {
  const {
    onChange,
    preventDefault,
    id,
    disabled,
    theme,
    size,
    color,
    autoComplete,
    value,
    tooltip,
    className,
  } = props;

  const [locked, setLocked] = useState(true);

  const handleOnChange = (e) => {
    if (preventDefault) {
      e.preventDefault();
    }
    onChange(id, e.target.value);
  };

  const handleLockUnlock = () => setLocked(!locked);

  let themeProps = { theme, size, color };

  return (
    <>
      <Container {...themeProps}>
        <Input
          {...themeProps}
          type={locked ? "password" : "text"}
          autoComplete={autoComplete ? "true" : "false"}
          value={value}
          onChange={handleOnChange}
          className={className}
          disabled={disabled}
          title={tooltip}
          ref={ref}
        />
        <Span {...themeProps} onClick={disabled ? () => {} : handleLockUnlock}>
          <Icon
            {...themeProps}
            className={`fas ${locked ? "fa-eye" : "fa-eye-slash"} fa-fw`}
          />
        </Span>
      </Container>
    </>
  );
});

PasswordInput.defaultProps = {
  theme: theme,
  id: "",
  disabled: false,
  onChange: () => {},
  handleForgotPassword: () => {},
  className: "",
  preventDefault: true,
  size: "small",
  color: "primary",
  autoComplete: false,
  tooltip: "",
  value: "",
};

PasswordInput.propTypes = {
  theme: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  handleForgotPassword: PropTypes.func,
  className: PropTypes.string,
  tooltip: PropTypes.string,
  value: PropTypes.string,
  preventDefault: PropTypes.bool,
  autoComplete: PropTypes.bool,
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

export default PasswordInput;
