import React from "react";
import BaseContainer from "../Base/BaseContainer";
import styles from './styles.module.css';

const ToggleSwitch = (props) => {

  function handleChange(e) {
    props.onChange(props.id, e.target.checked);
  }

  if (props.accentColor) {
    const inputStyle = {
      backgroundColor: props.accentColor
    };

    const sliderStyle = {
      border: "1px solid " + props.accentColor
    }

    return (
      <BaseContainer {...props}>
        <label className={styles.switch}>
          <input
            type="checkbox"
            onChange={handleChange}
            checked={props.value}
            disabled={props.disabled}
            className={(props.standardInputToggleSwitch) ? [styles.standardInputToggleSwitch, props.standardInputToggleSwitch].join(" ") : styles.standardInputToggleSwitch}
            style={inputStyle}
          />
          <span className={props.disabled ? styles.sliderDisabledToggleSwitch : styles.slider} style={sliderStyle}></span>
        </label>
      </BaseContainer>
    );
  }

  return (
    <BaseContainer {...props}>
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
    </BaseContainer>
  );
};

export default ToggleSwitch;
