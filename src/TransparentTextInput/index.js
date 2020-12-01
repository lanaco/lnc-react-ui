import React from "react";
import styles from './styles.module.css'

const TransparentTextInput = React.forwardRef((props, ref) => {
  const { className = "" } = props;
  const { onChange, onKeyDown, value, id } = props;
  const {
    onClick = () => {},
    onInput = () => {},
    onBlur = () => {},
    onFocus = () => {},
  } = props;

  const handleOnChange = (e) => {
    if (onChange) onChange(props.id, e.target.value);
  };

    return (
      <div className={props.className}>
        <input
          ref={ref}
          className={className + " " + styles.inputTransparentText}
          value={value}
          onChange={handleOnChange}
          onKeyDown={onKeyDown}
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
