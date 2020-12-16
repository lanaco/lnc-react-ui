import React from "react";
import {styles} from "./styles.js";

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
          className={(props.className) ? [styles.buttonIconIconButton, props.className].join(" ") : styles.buttonIconIconButton}
          disabled={props.disabled}
          title={props.tooltipText}
        >
          <i className={props.iconClassName + " " + styles.iconIconButton}></i>
        </button>
        <div className={(props.classNameErrorText) ? (props.classNameErrorText) : styles.errorTextIconButton}>{props.errorText}</div>
      </div>
    );
};

export default IconButton;
