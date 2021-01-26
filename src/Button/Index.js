import React from "react";
import "../BaseStyle/BaseStyle.css";
import "../BaseStyle/lnclines.css";
import styles from './styles.module.css';

const Button = (props) => {

  const handleOnClick = (e) => {
    if (props.preventDefault) {
      e.preventDefault();
    }
    props.onClick(props.id, e.target.value);
  };
    
      return (
        <div className={styles.containerButton}>
          <label className={styles.labelButton}></label>
          <button
            onClick={handleOnClick}
            className={(props.className) ? [styles.standardInputButton, props.className].join(" ") : styles.standardInputButton}
            disabled={props.disabled}
            title={props.tooltipText}
          >
            <span>
              <span>{props.label}</span>
              <i className={"lnc lnc-arrow-down-up"}></i>
            </span>
          </button>
          <div className={(props.classNameErrorText) ? (props.classNameErrorText) : styles.errorTextButton}>{props.errorText}</div>
        </div>
      );
    };

 export default (Button);
