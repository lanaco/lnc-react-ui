import React from "react";
import {styles} from "./styles.js";

const TextInput = React.forwardRef((props, ref) => {
  const handleOnChange = (e) => {
    if (props.preventDefault) {
      e.preventDefault();
    }

    props.onChange(props.id, e.target.value);
  };

  return (
      <div
        className={
          props.useSideLabel ? styles.containerWithSideLabelTextInput : styles.containerTextInput
        }
      >
        <label className={styles.labelTextInput}>
          {props.label}
          {props.required ? "*" : ""}
        </label>
        <input
          ref={ref}
          type={"text"}
          value={props.value}
          onChange={handleOnChange}
          disabled={props.disabled}
          className={(props.className) ? [styles.standardInputTextInput, props.className].join(" ") : styles.standardInputTextInput}
          title={props.tooltipText}
          onKeyDown={props.onKeyDown}
        />
        <div className={(props.classNameErrorText) ? (props.classNameErrorText) : styles.errorTextTextInput}>{props.errorText}</div>
      </div>
    );
});

export default TextInput;
