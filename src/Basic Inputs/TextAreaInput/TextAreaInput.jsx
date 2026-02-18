/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { useCallback, useEffect, useState, forwardRef } from "react";
import { useTheme } from "@emotion/react";
import debounce from "lodash.debounce";
import { StyledTextareaWrapper } from "./styledComponents";
import ReactTextareaAutosize from "react-textarea-autosize";

//===================================================

const TextAreaInput = forwardRef((props, ref) => {
  const {
    disabled,
    readOnly,
    value,
    defaultValue,
    debounceTime = 0,
    collapseOnBlur = false,
    minRows = 0,
    maxRows,
    //----------------
    onChange,
    onBlur,
    onFocus,
    //----------------
    className = "",
    style = {},
    size = "small",
    color = "primary",
    ...rest
  } = props;
  const [inputValue, setInputValue] = useState(value || defaultValue || "");

  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const [innerMinRows, setInnerMinRows] = useState(minRows);
  const [innerMaxRows, setInnerMaxRows] = useState(
    collapseOnBlur ? minRows : maxRows,
  );

  useEffect(() => {
    if (value !== null && value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  useEffect(() => {
    setInnerMinRows(minRows);
    if (collapseOnBlur && focused === false) setInnerMaxRows(minRows);
  }, [minRows, maxRows]);

  useEffect(() => {
    if (!collapseOnBlur) setInnerMaxRows(maxRows);
    else setInnerMaxRows(focused === true ? maxRows : minRows);
  }, [collapseOnBlur]);

  const debouncedOnChange = useCallback(
    debounce((e, val) => handleChange(e, val), debounceTime),
    [onChange],
  );

  const handleChange = (e, value) => {
    if (onChange) onChange?.(e, value);
  };

  const onValueChange = (e) => {
    setInputValue(e.target.value);
    debouncedOnChange(e, e.target.value);
  };

  const handleFocus = (e) => {
    setFocused(true);
    if (collapseOnBlur) {
      setInnerMaxRows(maxRows);
    }
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setFocused(false);
    if (collapseOnBlur) {
      setInnerMaxRows(minRows);
    }
    onBlur?.(e);
  };

  return (
    <StyledTextareaWrapper
      style={style}
      className={className}
      theme={theme}
      color={color}
      size={size}
      focused={focused}
      disabled={disabled}
      readOnly={readOnly}
      collapseOnBlur={collapseOnBlur}
    >
      <ReactTextareaAutosize
        ref={ref}
        disabled={disabled}
        value={inputValue}
        readOnly={readOnly}
        minRows={innerMinRows}
        maxRows={innerMaxRows}
        onChange={onValueChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
    </StyledTextareaWrapper>
  );
});

// TextAreaInput.defaultProps = {
//   // defaultValue: "",
//   placeholder: "",
//   disabled: false,
//   readOnly: false,
//   debounceTime: 180,
//   tabIndex: 0,
//   collapseOnBlur: false,
//   minRows: 1,
//   //----------------
//   onChange: () => {},
//   onBlur: () => {},
//   onFocus: () => {},
//   //----------------
//   className: "",
//   style: {},
//   size: "small",
//   color: "primary",
// };

export default TextAreaInput;
