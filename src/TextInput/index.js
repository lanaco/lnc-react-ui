import React from "react";
import BaseContainer from "../Base/BaseContainer";
import styles from './styles.module.css';

const TextInput = React.forwardRef((props, ref) => {
  const handleOnChange = (e) => {
    if (props.preventDefault) {
      e.preventDefault();
    }

    props.onChange(props.id, e.target.value);
  };

  return (
    <BaseContainer {...props}>
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
    </BaseContainer>
  );
});

export default TextInput;
