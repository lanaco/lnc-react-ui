import React, { useEffect, useState } from "react";
import baseStyles from "../Base/styles.module.css";
import styles from './styles.module.css';

const NumberInput = (props) => {
  const [val, setVal] = useState(props.value);

  useEffect(() => {
    setVal(props.value);
  }, [props.value]);

  const handleOnChange = (e) => {
    if (props.preventDefault) {
      e.preventDefault();
    }
    setVal(e.target.value);
  };

  const handleOnBlur = (e) => {
    if (props.preventDefault) {
      e.preventDefault();
    }
    props.onChange(props.id, e.target.value);
  };

  const isInputInteger = (evt) => {
    var ch = String.fromCharCode(evt.which);
    var oldValue = evt.target.value;
    if (
      (ch === "-" && oldValue === undefined) ||
      (ch === "-" && oldValue.length === 0)
    ) {
      return;
    }
    if (!/[0-9]/.test(ch)) {
      evt.preventDefault();
    }
  };


  let numberOfDecimalPlaces =
    props.numberOfDecimalPlaces !== undefined ? props.numberOfDecimalPlaces : 2;

  const isInputDecimal = (evt) => {
    var ch = String.fromCharCode(evt.which);
    var oldValue = evt.target.value;
    if (
      (ch === "-" && oldValue === undefined) ||
      (ch === "-" && oldValue.length === 0)
    ) {
      return;
    }
    if (!/^\d*\.?\d*$/.test(ch)) {
      evt.preventDefault();
    } else {
      if ("." === ch) {
        if (oldValue.includes(".")) {
          evt.preventDefault();
        }
      } else {
        if (oldValue.includes(".")) {
          var numOfDecimalPlaces = oldValue.split(".")[1].length;
          if (numOfDecimalPlaces >= numberOfDecimalPlaces) {
            evt.preventDefault();
          }
        }
      }
    }
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
      <input
        type="text"
        value={val ? val : ""}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onKeyPress={(props.isDecimal) ? isInputDecimal : isInputInteger}
        onPaste={(props.isDecimal) ? isInputDecimal : isInputInteger}
        className={styles.standardInputNumberInput}
        disabled={props.disabled}
        title={props.tooltipText}
      />
      <div className={props.errorTextCssClass ? [baseStyles.baseErrorText, props.errorTextCssClass].join(" ") : baseStyles.baseErrorText}>{props.errorText}</div>
    </div>
  );
};

export default NumberInput;