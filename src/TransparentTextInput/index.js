import React from "react";
import styles from "./styles.module.css";

const TransparentTextInput = React.forwardRef((props, ref) => {
  const emptyFunc = () => {};

  const { className = "", inputClassName = "" } = props;
  const {
    onClick = emptyFunc,
    onInput = emptyFunc,
    onBlur = emptyFunc,
    onFocus = emptyFunc,
    onChange = emptyFunc,
  } = props;

  const handleOnChange = (e) => {
    onChange(props.id, e.target.value);
  };

  return (
    <div className={className}>
      <input
        ref={ref}
        className={["lnc", styles.inputTransparentText, inputClassName].join(
          " "
        )}
        value={props.value}
        onChange={handleOnChange}
        onKeyDown={props.onKeyDown}
        onClick={onClick}
        onInput={onInput}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={props.disabled}
        placeholder={props.placeholder}
      />
    </div>
  );
});

export default TransparentTextInput;
