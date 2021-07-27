import debounce from "lodash.debounce";
import PropTypes from "prop-types";
import React, { useMemo, useState } from "react";
import style from "./styles.module.css";

const TextInput = React.forwardRef((props, ref) => {
  //
  const { onChange, onFocus, onBlur } = props;

  const {
    id,
    disabled,
    className,
    delay,
    preventDefault,
    tooltipText,
    size,
    accentColor,
    textColor,
    bgColor,
  } = props;

  const [focused, setFocused] = useState(false);

  //================================================

  const changeHandler = (event) => {
    if (preventDefault) event.preventDefault();

    onChange(id, event.target.value);
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, delay),
    []
  );

  let inputStyle = {
    backgroundColor: bgColor,
    borderBottom: `2px solid ${accentColor}`,
    color: textColor,
  };

  if (disabled) {
    inputStyle = {
      backgroundColor: "#dee1e6",
      borderBottom: "2px solid #777a80",
      color: "#777a80",
      opacity: "0.7",
      cursor: "inherit",
    };
  }

  if (focused) {
    inputStyle.backgroundColor = "white";
  }

  return (
    <input
      ref={ref}
      type={"text"}
      onChange={debouncedChangeHandler}
      disabled={disabled}
      style={inputStyle}
      className={[
        style["text-input"],
        style[`text-input-${size}`],
        className,
      ].join(" ")}
      title={tooltipText}
      onFocus={(e) => {
        setFocused(true);
        onFocus(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur(e);
      }}
    />
  );

  //================================================

  // useEffect(() => {
  //   if (text !== value) setText(value === null ? "" : value);
  // }, [value]);

  // useEffect(() => {
  //   const timeOutId = setTimeout(() => handleDelayedOnChange(), delay);
  //   return () => clearTimeout(timeOutId);
  // }, [text]);

  // const handleDelayedOnChange = () => {
  //   if (!isFirst) onChange(id, text);
  //   if (isFirst) setIsFirst(false);
  // };

  // const handleOnChange = (e) => {
  //   if (props.preventDefault) {
  //     e.preventDefault();
  //   }

  //   // onChange(props.id, e.target.value);
  //   setText(e.target.value);
  // };

  // let inputStyle = {
  //   backgroundColor: bgColor,
  //   borderBottom: `2px solid ${accentColor}`,
  //   color: textColor,
  // };

  // if (disabled) {
  //   inputStyle = {
  //     backgroundColor: "#dee1e6",
  //     borderBottom: "2px solid #777a80",
  //     color: "#777a80",
  //     opacity: "0.7",
  //     cursor: "inherit",
  //   };
  // }

  // if (focused) {
  //   inputStyle.backgroundColor = "white";
  // }

  // return (
  //   <input
  //     ref={ref}
  //     type={"text"}
  //     value={text}
  //     onChange={handleOnChange}
  //     disabled={disabled}
  //     style={inputStyle}
  //     className={[
  //       style["text-input"],
  //       style[`text-input-${size}`],
  //       className,
  //     ].join(" ")}
  //     title={tooltipText}
  //     onKeyDown={onKeyDown}
  //     onFocus={(e) => {
  //       setFocused(true);
  //       onFocus(e);
  //     }}
  //     onBlur={(e) => {
  //       setFocused(false);
  //       onBlur(e);
  //     }}
  //   />
  // );
});

TextInput.defaultProps = {
  id: "",
  disabled: false,
  tooltipText: "",
  onChange: () => {},
  onKeyDown: () => {},
  onFocus: () => {},
  onBlur: () => {},
  className: "",
  preventDefault: true,
  size: "s",
  text: "",
  accentColor: "#00537a",
  bgColor: "#dceff5",
  textColor: "#000000",
  delay: 300,
};

TextInput.propTypes = {
  id: PropTypes.string,
  disabled: PropTypes.bool,
  tooltipText: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  preventDefault: PropTypes.bool,
  size: PropTypes.oneOf(["s", "m", "l"]),
  accentColor: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  delay: PropTypes.number,
};

export default TextInput;
