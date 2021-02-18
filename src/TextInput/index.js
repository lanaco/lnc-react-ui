import React from "react";
import BaseContainer from "../Base/BaseContainer";

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
        // className={(props.inputCssClass) ? [styles.standardInputTextInput, props.inputCssClass].join(" ") : styles.standardInputTextInput}
        title={props.tooltipText}
        onKeyDown={props.onKeyDown}
        style={{
          fontFamily: "inherit",
          outline: "none",
          backgroundColor: " #dceff5",
          transition: "400ms",
          fontSize: "1em",
          borderBottom: "3px solid red",
          padding: "5px 5px",
          minHeight: "60%",
          width: "min-content",
          width: "100%"
        }}
      />
    </BaseContainer>
  );
});

export default TextInput;
