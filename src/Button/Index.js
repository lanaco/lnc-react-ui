import React from "react";
import baseStyles from "../Base/styles.module.css";
import styles from './styles.module.css';

const Button = (props) => {

  const handleOnClick = (e) => {
    if (props.preventDefault) {
      e.preventDefault();
    }
    props.onClick(props.id, e.target.value);
  };

  let iconClassName = "";

  if (props.iconClassName && props.iconClassName !== "") {
    iconClassName = props.iconClassName.replace("-", "_");
  }

  return (
    <div className={baseStyles.baseContainer}>
      <label className={props.labelCssClass ? [baseStyles.baseLabel, props.labelCssClass].join(" ") : baseStyles.baseLabel}>
      </label>
      <button
        onClick={handleOnClick}
        className={(props.inputCssClass) ? [styles.standardInputButton, props.inputCssClass].join(" ") : styles.standardInputButton}
        disabled={props.disabled}
        title={props.tooltipText}
      >
        <span>
          <span>{props.label}</span>
          {iconClassName !== "" ? <i className={[baseStyles.lnc, baseStyles[iconClassName]].join(" ")}></i> : ""}
        </span>
      </button>
      <div className={props.errorTextCssClass ? [baseStyles.baseErrorText, props.errorTextCssClass].join(" ") : baseStyles.baseErrorText}>{props.errorText}</div>
    </div>
  );
};

export default (Button);
