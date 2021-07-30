import React, { useState } from "react";
import BaseContainer from "../Base/BaseContainer";
import { getLighterColor } from "../Base/ColorBlender";
import baseStyles from "../Base/styles.module.css";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import styled from "@emotion/styled";

const Container = styled.div((props) => ({
  display: "flex",
  fontFamily: "inherit",
  outline: "none",
  width: "100%",
  height: "100%",
}));

const Input = styled.input((props) => ({
  fontFamily: "inherit",
  appearance: "none",
  outline: "none",
  backgroundColor: "var(--color-base-backgroud)",
  transition: "220ms",
  fontSize: "var(--font-size-base)",
  border: "0px",
  borderBottom: "2px solid var(--color-base-blue)",
  height: "100%",
  width: "100%",
  padding: "0px",
  boxSizing: "border-box",

  "&:focus": {
    backgroundColor: "var(--color-base-white)",
  },

  "&:disabled": {
    backgroundColor: "var(--color-base-gray-lighter)",
    color: "var(--color-base-gray-darker)",
    cursor: "default",
    borderBottom: "2px solid var(--color-base-gray-darker)",
    opacity: "0.7",
  },
}));

const Span = styled.span((props) => ({}));

const Icon = styled.i((props) => ({}));

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
    onKeyDown,
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
      <Container
        {...themeProps}
        className={styles.inputWithIconButtonPasswordInput}
      >
        <Input
          {...themeProps}
          type={locked ? "password" : "text"}
          autoComplete={autoComplete}
          value={value}
          onChange={handleOnChange}
          className={
            props.inputCssClass
              ? [styles.standardInputPasswordInput, props.inputCssClass].join(
                  " "
                )
              : styles.standardInputPasswordInput
          }
          disabled={disabled}
          title={tooltipText}
          onKeyDown={onKeyDown}
          onBlur={() => {
            setInFocus(false);
          }}
          onFocus={() => {
            setInFocus(true);
          }}
        />
        <Span
          {...themeProps}
          className={
            disabled
              ? styles.iconButtonDisabledPasswordInput
              : inFocus
              ? styles.iconButtonFocusedPasswordInput
              : styles.iconButtonPasswordInput
          }
          onClick={handleLockUnlock}
          disabled={disabled}
        >
          <Icon
            {...themeProps}
            className={
              locked
                ? [
                    baseStyles.lnc,
                    baseStyles["lnc_eye_no"],
                    styles.additionalIconStyle,
                  ].join(" ")
                : [
                    baseStyles.lnc,
                    baseStyles["lnc_eye"],
                    styles.additionalIconStyle,
                  ].join(" ")
            }
          />
        </Span>
      </Container>
      {props.dontShowPasswordForgottenOption ? (
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
      )}
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
