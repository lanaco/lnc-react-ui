import React, { useState } from "react";
import BaseContainer from "../Base/BaseContainer";
import styles from "./styles.module.css";

const PasswordInput = (props) => {
  const [inFocus, setInFocus] = React.useState(false);

  const handleOnChange = (e) => {
    if (props.preventDefault) {
      e.preventDefault();
    }
    props.onChange(props.id, e.target.value);
  };

  const [locked, setLocked] = useState(true);

  const forgotPassword = () => {
    if (props.handleForgotPassword) props.handleForgotPassword();
  };

  const handleLockUnlock = () => {
    setLocked(!locked);
  };

  return (
    <BaseContainer {...props}>
      <div className={styles.inputWithIconButtonPasswordInput}>
        <input
          type={locked ? "password" : "text"}
          autoComplete={props.autoComplete}
          value={props.value}
          onChange={handleOnChange}
          className={
            props.inputCssClass
              ? [styles.standardInputPasswordInput, props.inputCssClass].join(
                " "
              )
              : styles.standardInputPasswordInput
          }
          disabled={props.disabled}
          title={props.tooltipText}
          onKeyDown={props.onKeyDown}
          onBlur={() => {
            setInFocus(false);
          }}
          onFocus={() => {
            setInFocus(true);
          }}
        ></input>
        <span
          className={
            inFocus
              ? styles.iconButtonFocusedPasswordInput
              : styles.iconButtonPasswordInput
          }
          onClick={handleLockUnlock}
          disabled={props.disabled}
        >
          <i className={locked ? [baseStyles.lnc, baseStyles["lnc_eye_no"]].join(" ") : [baseStyles.lnc, baseStyles["lnc_eye_no"]].join(" ")} />
        </span>
      </div>
      {props.dontShowPasswordForgottenOption ? (
        ""
      ) : (
          <div
            className={styles.forgottenPasswordDivPasswordInput}
            onClick={forgotPassword}
            disabled={props.disabled}
          >
            {props.passwordForgottenText
              ? props.passwordForgottenText
              : "Password forgotten"}
          </div>
        )}
    </BaseContainer>
  );
};

export default PasswordInput;
