import React from "react";
import styles from './styles.module.css'

const ToggleSwitch = (props) => {
  
  function handleChange(e) {
    props.onChange(props.id, e.target.checked);
  }

    return (
      <div
        className={
          props.useSideLabel ? styles.containerWithSideLabelToggleSwitch : styles.containerToggleSwitch
        }
      >
        <label className={styles.labelToggleSwitch}>
          {props.label}
          {props.required ? "*" : ""}
        </label>
        <label className={styles.switch}>
          <input
            type="checkbox"
            onChange={handleChange}
            checked={props.value}
            disabled={props.disabled}
            className={(props.standardInputToggleSwitch) ? [styles.standardInputToggleSwitch, props.standardInputToggleSwitch].join(" ") : styles.standardInputToggleSwitch}
          />
          <span className={props.disabled ? styles.sliderDisabledToggleSwitch : styles.slider}></span>
        </label>
        <div className={(props.classNameErrorText) ? (props.classNameErrorText) : styles.errorTextToggleSwitch}>{props.errorTextToggleSwitch}</div>
      </div>
    );
};

export default ToggleSwitch;
