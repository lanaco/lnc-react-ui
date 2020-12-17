import React from "react";
import styles from './styles.module.css'

const TransparentTextInput = React.forwardRef((props, ref) => {
  const { className = "", inputClassName = "" } = props;
  const {
    onClick = () => {},
    onInput = () => {},
    onBlur = () => {},
    onFocus = () => {},
  } = props;

  const handleOnChange = (e) => {
    if (props.onChange) props.onChange(props.id, e.target.value);
  };

    return (
      <div className={className}>
        <input
          ref={ref}
          className={["lnc", styles.inputTransparentText, inputClassName].join(" ")}
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
