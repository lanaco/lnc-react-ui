import React from "react";
import BaseContainer from "../Base/BaseContainer";
import styles from "./styles.module.css";

const TextInput = React.forwardRef((props, ref) => {
  const [text, setText] = useState("");
  const [isFirst, setIsFirst] = useState(true);

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

  return (
    <BaseContainer {...props}>
      <input
        ref={ref}
        type={"text"}
        value={text}
        onChange={(e) => setText(e.target.value)}
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
