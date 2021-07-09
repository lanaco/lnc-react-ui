import React, { useEffect, useState } from "react";
import BaseContainer from "../Base/BaseContainer";
import { getLighterColor } from "../Base/ColorBlender";
import styles from "./styles.module.css";

const NumberInput = (props) => {
  const emptyFunc = () => {};

  const { onChange = emptyFunc } = props;

  const [val, setVal] = useState(props.value);
  const [focus, setFocus] = useState(false);

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
    onChange(props.id, e.target.value);
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

  const handleContainerFocus = (e) => {
    if (props.onFocus) {
      props.onFocus(e);
    }
  };

  const handleContainerBlur = (e) => {
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  if (props.accentColor) {
    const style = {
      backgroundColor: focus
        ? "white"
        : getLighterColor(props.accentColor, 0.75),
      borderBottom: "2px solid " + props.accentColor,
    };

    return (
      <BaseContainer
        {...props}
        handleContainerBlur={handleContainerBlur}
        handleContainerFocus={handleContainerFocus}
      >
        <input
          type="text"
          value={val ? val : ""}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          onKeyPress={props.isDecimal ? isInputDecimal : isInputInteger}
          onPaste={props.isDecimal ? isInputDecimal : isInputInteger}
          className={
            props.inputCssClass
              ? [styles.standardInputNumberInput, props.inputCssClass].join(" ")
              : styles.standardInputNumberInput
          }
          disabled={props.disabled}
          title={props.tooltipText}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={style}
        />
      </BaseContainer>
    );
  }

  return (
    <BaseContainer
      {...props}
      handleContainerBlur={handleContainerBlur}
      handleContainerFocus={handleContainerFocus}
    >
      <input
        type="text"
        value={val ? val : ""}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onKeyPress={props.isDecimal ? isInputDecimal : isInputInteger}
        onPaste={props.isDecimal ? isInputDecimal : isInputInteger}
        className={
          props.inputCssClass
            ? [styles.standardInputNumberInput, props.inputCssClass].join(" ")
            : styles.standardInputNumberInput
        }
        disabled={props.disabled}
        title={props.tooltipText}
      />
    </BaseContainer>
  );
};

export default NumberInput;
