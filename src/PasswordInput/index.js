import React, { useState } from "react";
import baseStyles from "../Base/styles.module.css";
import styles from './styles.module.css';

const PasswordInput = (props) => {

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
    <div
      className={
        props.useSideLabel ? baseStyles.baseContainer : baseStyles.baseContainer
      }
    >
      <label className={props.labelCssClass ? [baseStyles.baseLabel, props.labelCssClass].join(" ") : baseStyles.baseLabel}>
        {props.label}
        {props.required ? "*" : ""}
      </label>
      <div className={styles.inputWithIconButtonPasswordInput}>
        <input
          type={locked ? "password" : "text"}
          value={props.value}
          onChange={handleOnChange}
          className={(props.inputCssClass) ? [styles.standardInputPasswordInput, props.inputCssClass].join(" ") : styles.standardInputPasswordInput}
          disabled={props.disabled}
          title={props.tooltipText}
          onKeyDown={props.onKeyDown}
        ></input>
        <span
          className={styles.iconButtonPasswordInput}
          onClick={handleLockUnlock}
          disabled={props.disabled}
        >
          <i className={locked ? "lnc lnc-eye-no" : "lnc lnc-eye"} />
        </span>
      </div>
      <div className={props.errorTextCssClass ? [baseStyles.baseErrorText, props.errorTextCssClass].join(" ") : baseStyles.baseErrorText}>
        {props.errorText}{" "}
        {props.dontShowPasswordForgottenOption ? (
          ""
        ) : (
            <div
              className={styles.forgottenPasswordDivPasswordInput}
              onClick={forgotPassword}
              disabled={props.disabled}
            >
              {props.passwordForgottenText ? props.passwordForgottenText : "Password forgotten"}
            </div>
          )}
      </div>
    </div>
  );
};

export default PasswordInput;
