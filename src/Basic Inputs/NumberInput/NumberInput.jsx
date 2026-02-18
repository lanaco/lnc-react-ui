/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { useTheme } from "@emotion/react";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import {
  StyledInput,
  StyledPrefix,
  StyledSuffix,
  StyledWrapper,
} from "./styledComponents";

//===================================================

const NumberInput = forwardRef((props, ref) => {
  //
  const {
    disabled,
    readOnly,
    debounceTime = 0,
    step = 1,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    prefix,
    suffix,
    placeholder,
    value,
    defaultValue,
    //----------------
    onChange,
    onBlur,
    onFocus,
    onKeyDown,
    maxDecimalPlaces,
    //----------------
    className = "",
    style = {},
    size = "small",
    color = "primary",
    ...rest
  } = props;

  const theme = useTheme();

  const inputValueRef = useRef(value || defaultValue || "");
  const [inputValue, setInputValue] = useState(value || defaultValue || "");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (value !== null && value !== undefined) {
      inputValueRef.current = value;
      setInputValue(inputValueRef.current);
    }
  }, [value]);

  const debouncedOnChange = useCallback(
    debounce((e, val) => handleChange(e, val), debounceTime),
    [onChange],
  );

  const handleChange = (e, value) => {
    if (onChange) onChange?.(e, value);
  };

  const onValueChange = (e) => {
    inputValueRef.current = e.target.value;
    setInputValue(inputValueRef.current);
    debouncedOnChange(e, e.target.value);
  };

  const handleFocus = (e) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setFocused(false);
    onBlur?.(e);
  };

  const handleKeyDown = (event) => {
    // / Prevent default for '+' and '-' keys

    if (
      event?.target?.value?.length > 0 &&
      (event.key === "+" || event.key === "-")
    ) {
      event.preventDefault();
    }
    if (
      event?.target?.value === "" &&
      (event.key === "+" || event.key === "-")
    ) {
      event.target.value = event.key;
    }
    if (event?.target?.value.includes(".") && maxDecimalPlaces) {
      const decimals = event?.target?.value.split(".")[1];
      if (decimals?.length >= maxDecimalPlaces) {
        event.preventDefault();
      }
    }
    onKeyDown?.(event);
  };

  return (
    <StyledWrapper
      style={style}
      className={className}
      theme={theme}
      color={color}
      size={size}
      focused={focused}
      disabled={disabled}
      readOnly={readOnly}
    >
      {prefix && (
        <StyledPrefix
          theme={theme}
          color={color}
          focused={focused}
          className="lnc-input-prefix"
        >
          {prefix}
        </StyledPrefix>
      )}
      <StyledInput
        ref={ref}
        type="number"
        theme={theme}
        color={color}
        size={size}
        placeholder={placeholder}
        prefix={prefix}
        suffix={suffix}
        disabled={disabled}
        readOnly={readOnly}
        step={step}
        min={min}
        max={max}
        value={inputValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onValueChange}
        onKeyDown={handleKeyDown}
        {...rest}
      />

      {suffix && (
        <StyledSuffix
          theme={theme}
          color={color}
          focused={focused}
          className="lnc-input-suffix"
        >
          {suffix}
        </StyledSuffix>
      )}
    </StyledWrapper>
  );
});

// NumberInput.defaultProps = {
//   id: "",
//   disabled: false,
//   readOnly: false,
//   debounceTime: 180,
//   step: 1,
//   min: Number.MIN_SAFE_INTEGER,
//   max: Number.MAX_SAFE_INTEGER,
//   placeholder: "",
//   tabIndex: 0,
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

export default NumberInput;
