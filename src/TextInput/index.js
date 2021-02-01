import React from "react";
import baseStyles from "../Base/styles.module.css";
import styles from './styles.module.css';

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
          props.useSideLabel ? baseStyles.baseContainer : baseStyles.baseContainer
        }
      >
      <label className={props.labelCssClass ? [baseStyles.baseLabel, props.labelCssClass].join(" ") : baseStyles.baseLabel}>
        {props.label}
        {props.required ? "*" : ""}
      </label>
        <input
          ref={ref}
          type={"text"}
          value={props.value}
          onChange={handleOnChange}
          disabled={props.disabled}
          className={(props.inputCssClass) ? [styles.standardInputTextInput, props.inputCssClass].join(" ") : styles.standardInputTextInput}
          title={props.tooltipText}
          onKeyDown={props.onKeyDown}
        />
      <div className={props.errorTextCssClass ? [baseStyles.baseErrorText, props.errorTextCssClass].join(" ") : baseStyles.baseErrorText}>{props.errorText}</div>
      </div>
    );
});

export default TextInput;
