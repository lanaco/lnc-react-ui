import React, { useState } from "react";
import baseStyles from "../Base/styles.module.css";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const paddingBySize = (size) => {
  if (size === "small") return "0.325rem 0.325rem";
  if (size === "medium") return "0.3875rem 0.3875rem";
  if (size === "large") return "0.425rem 0.425rem";
};

const Span = styled.span((props) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  borderBottom: `2px solid ${props.theme.palette[props.color].main}`,
  backgroundColor: props.theme.palette.background.main,
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
  fontSize: props.theme.typography[props.size].iconFontSize,
}));

const Container = styled.div((props) => ({
  display: "flex",
  fontFamily: "inherit",
  outline: "none",
  width: "100%",
  height: "100%",
}));

const Input = styled.input((props) => ({
  appearance: "none",
  outline: "none",
  border: "none",
  borderBottom: `2px solid ${props.theme.palette[props.color].main}`,
  transition: "all 250ms",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  cursor: "text",
  padding: paddingBySize(props.size),
  fontSize: props.theme.typography[props.size].fontSize,
  backgroundColor: props.theme.palette.background.main,
  color: props.theme.palette.background.text,
  borderRadius: "2px 0 0 2px",
  "&:disabled": {
    backgroundColor: props.theme.palette.gray[200],
    borderBottom: "2px solid " + props.theme.palette.gray[900],
    color: props.theme.palette.gray.textLight,
    opacity: 0.7,
    cursor: "default",

    "& ~ span": {
      backgroundColor: props.theme.palette.gray[200],
      borderBottom: "2px solid " + props.theme.palette.gray[900],
      color: props.theme.palette.gray.textLight,
      opacity: 0.7,
      cursor: "default",
    },
  },
  "&:focus": {
    backgroundColor: props.theme.palette.background.light,
  },
}));

const ForgotPassword = styled.div((props) => ({}));

const PasswordInput = (props) => {
  const {
    onChange,
    handleForgotPassword,
    preventDefault,
    id,
    disabled,
    theme,
    size,
    color,
    autoComplete,
    value,
    tooltipText,
    className,
  } = props;

  const [inFocus, setInFocus] = React.useState(false);
  const [locked, setLocked] = useState(true);

  const handleOnChange = (e) => {
    if (preventDefault) {
      e.preventDefault();
    }
    onChange(id, e.target.value);
  };

  const forgotPassword = () => {
    if (handleForgotPassword) handleForgotPassword();
  };

  const handleLockUnlock = () => setLocked(!locked);

  let themeProps = { theme, size, color };

  return (
    <>
      <Container {...themeProps}>
        <Input
          {...themeProps}
          type={locked ? "password" : "text"}
          autoComplete={autoComplete}
          value={value}
          onChange={handleOnChange}
          className={className}
          disabled={disabled}
          title={tooltipText}
        />
        <Span {...themeProps} onClick={disabled ? () => {} : handleLockUnlock}>
          <Icon
            {...themeProps}
            className={[
              baseStyles.lnc,
              baseStyles[locked ? "lnc_eye_no" : "lnc_eye"],
            ].join(" ")}
          />
        </Span>
      </Container>
      {/* {props.dontShowPasswordForgottenOption ? (
        ""
      ) : (
        <ForgotPassword
          className={styles.forgottenPasswordDivPasswordInput}
          onClick={forgotPassword}
          disabled={props.disabled}
        >
          {props.passwordForgottenText
            ? props.passwordForgottenText
            : "Password forgotten"}
        </ForgotPassword>
      )} */}
    </>
  );
};

PasswordInput.defaultProps = {
  theme: {},
  id: "",
  disabled: false,
  onChange: () => {},
  handleForgotPassword: () => {},
  className: "",
  preventDefault: true,
  size: "small",
  color: "primary",
};

PasswordInput.propTypes = {
  theme: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  handleForgotPassword: PropTypes.func,
  className: PropTypes.string,
  preventDefault: PropTypes.bool,
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
