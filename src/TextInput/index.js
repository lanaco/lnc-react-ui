import React, { useEffect, useState } from "react";
import BaseContainer from "../Base/BaseContainer";
import styles from "./styles.module.css";

const TextInput = React.forwardRef((props, ref) => {
  const [text, setText] = useState("");
  const [isFirst, setIsFirst] = useState(true);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    if (text !== props.value) setText(props.value === null ? "" : props.value);
  }, [props.value]);

  useEffect(() => {
    const timeOutId = setTimeout(() => handleDelayedOnChange(), 350);
    return () => clearTimeout(timeOutId);
  }, [text]);

  const handleDelayedOnChange = () => {
    if (!isFirst) props.onChange(props.id, text);

    if (isFirst) setIsFirst(false);
  };

  const handleOnChange = (e) => {
    if (props.preventDefault) {
      e.preventDefault();
    }

    props.onChange(props.id, e.target.value);
    setText(e.target.value);
  };

  if (props.accentColor) {

    const style = {
      backgroundColor: focus ? "white" : getLighterColor(props.accentColor, 0.75),
      borderBottom: "2px solid " + props.accentColor
    };

    return (
      <BaseContainer {...props}>
        <input
          ref={ref}
          type={"text"}
          value={text}
          onChange={handleOnChange}
          disabled={props.disabled}
          className={
            props.inputCssClass
              ? [styles.standardInputTextInput, props.inputCssClass].join(" ")
              : styles.standardInputTextInput
          }
          title={props.tooltipText}
          onKeyDown={props.onKeyDown}
          style={style}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      </BaseContainer>
    );
  }

  return (
    <BaseContainer {...props}>
      <input
        ref={ref}
        type={"text"}
        value={text}
        onChange={handleOnChange}
        disabled={props.disabled}
        className={
          props.inputCssClass
            ? [styles.standardInputTextInput, props.inputCssClass].join(" ")
            : styles.standardInputTextInput
        }
        title={props.tooltipText}
        onKeyDown={props.onKeyDown}
      />
    </BaseContainer>
  );
});

export default TextInput;
