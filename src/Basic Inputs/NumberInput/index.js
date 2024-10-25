import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";
import { debounce } from "lodash";
import {
  StyledInput,
  StyledPrefix,
  StyledSuffix,
  StyledWrapper,
} from "./styledComponents";
import { useEffectOnce, useUpdateEffect } from "react-use";

//===================================================

const NumberInput = React.forwardRef((props, ref) => {
  //
  const {
    disabled,
    readOnly,
    debounceTime = 180,
    step = 1,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    prefix,
    suffix,
    placeholder,
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

  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  const debouncedOnChange = useCallback(
    debounce((e, val) => handleChange(e, val), debounceTime),
    [onChange]
  );

  const handleChange = (e, value) => {
    if (onChange) onChange?.(e, value);
  };

  const onValueChange = (e) => {
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
        // value={inputValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onValueChange}
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

NumberInput.propTypes = {
  id: PropTypes.string,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  /**
   * Time in miliseconds before onChange event fires after it has been triggered.
   */
  debounceTime: PropTypes.number,
  /**
   * The amount that is added to the current value in the input if its incremented using the arrows/spinners.
   */
  step: PropTypes.number,
  /**
   * Minimum number value user can input.
   */
  min: PropTypes.number,
  /**
   * Maximum number value user can input.
   */
  max: PropTypes.number,
  /**
   * Reserved space before input. Intented to be used with plain text or `Icon` component.
   */
  prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /**
   * Reserved space after input. Intented to be used with plain text or `Icon` component.
   */
  suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  /**
   * `(event, value) => void`
   */
  onChange: PropTypes.func,
  /**
   * `(event) => void`
   */
  onBlur: PropTypes.func,
  /**
   * `(event) => void`
   */
  onFocus: PropTypes.func,
  //----------------
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "information",
    "neutral",
    "gray",
  ]),
};

export default NumberInput;
