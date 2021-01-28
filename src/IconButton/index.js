import React from "react";
import baseStyles from "../Base/styles.module.css";
import styles from './styles.module.css';

const IconButton = (props) => {
  const handleOnClick = (e) => {
    if (props.preventDefault) {
      e.preventDefault();
    }
    props.onClick(props.id, e.target.value);
  };

  return (
    <div className={baseStyles.baseContainer}>
      <label className={props.labelCssClass? [baseStyles.baseLabel, props.labelCssClass].join(" ") : baseStyles.baseLabel}></label>
      <button
        onClick={handleOnClick}
        className={(props.inputCssClass) ? [styles.buttonIconIconButton, props.inputCssClass].join(" ") : styles.buttonIconIconButton}
        disabled={props.disabled}
        title={props.tooltipText}
      >
        <span>
          <i className={props.iconClassName}></i>
        </span>
      </button>
      <div className={props.errorTextCssClass ? [baseStyles.baseErrorText, props.errorTextCssClass].join(" ") : baseStyles.baseErrorText}>{props.errorText}</div>
    </div>
  );
};

export default IconButton;
