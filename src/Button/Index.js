import React from "react";
import {styles} from "./styles.js";

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
              <i className={props.icon + ((props.classNameIcon) ? (props.classNameIcon) : styles.standardInputIconButton)}></i>
            </span>
          </button>
          <div className={(props.classNameErrorText) ? (props.classNameErrorText) : styles.errorTextButton}>{props.errorText}</div>
        </div>
      );
    };

 export default (Button);
