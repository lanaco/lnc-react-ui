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
      <div className={`${styles.containerIconButton} ${props.className}`}>
        <label className={styles.labelIconButton}></label>
        <button
          onClick={handleOnClick}
          className={(props.inputCssClass) ? [styles.buttonIconIconButton, props.inputCssClass].join(" ") : styles.buttonIconIconButton}
          disabled={props.disabled}
          title={props.tooltipText}
        >
          <i className={props.iconClassName}></i>
        </button>
        <div className={props.errorTextCssClass? [baseStyles.baseErrorText, props.errorTextCssClass].join(" ") : baseStyles.baseErrorText}>{props.errorText}</div>
    </div>
    );
};

export default IconButton;
