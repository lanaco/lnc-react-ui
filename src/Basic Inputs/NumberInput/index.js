import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";
import React, { useCallback, useState, useEffect } from "react";
import { debounce } from "lodash";
import {
  StyledInput,
  StyledPrefix,
  StyledSuffix,
  StyledWrapper,
} from "./styledComponents";

//===================================================

const NumberInput = React.forwardRef((props, ref) => {
  //
  const {
    id,
    disabled,
    readOnly,
    preventDefault,
    value,
    debounceTime,
    step,
    min,
    max,
    prefix,
    suffix,
    placeholder,
    tabIndex,
    //----------------
    onChange,
    onBlur,
    onFocus,
    //----------------
    className,
    style,
    size,
    color,
    ...rest
  } = props;

  const theme = useTheme();
  const [inputValue, setInputValue] = useState();
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => setInputValue(value), [value]);

  const debouncedOnChange = useCallback(
    debounce((e, val) => handleChange(e, val), debounceTime),
    []
  );

  const handleChange = (e, value) => {
    if (onChange) onChange(e, value);
  };

  const onValueChange = (e) => {
    var _value = e.target.value || 0;

    if (_value === -0) _value = 0;

    if (_value === undefined) _value = 0;

    if (_value > Number.MAX_SAFE_INTEGER) _value = Number.MAX_SAFE_INTEGER;

    if (_value < Number.MIN_SAFE_INTEGER) _value = Number.MIN_SAFE_INTEGER;

    if (min && _value < min) _value = min;
    if (max && _value > max) _value = max;

    setInputValue(_value);
    debouncedOnChange(e, _value);
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur(e);
  };

  return (
    <StyledWrapper
      ref={ref}
      style={style}
      className={className}
      theme={theme}
      color={color}
      size={size}
      isFocused={isFocused}
      isDisabled={disabled}
      isReadOnly={readOnly}
    >
      {prefix && (
        <StyledPrefix
          theme={theme}
          color={color}
          isFocused={isFocused}
          className="lnc-input-prefix"
        >
          {prefix}
        </StyledPrefix>
      )}
      <StyledInput
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
        value={inputValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onValueChange}
        tabIndex={tabIndex}
        {...rest}
      />
      {suffix && (
        <StyledSuffix
          theme={theme}
          color={color}
          isFocused={isFocused}
          className="lnc-input-suffix"
        >
          {suffix}
        </StyledSuffix>
      )}
    </StyledWrapper>
  );
});

NumberInput.defaultProps = {
  id: "",
  disabled: false,
  readOnly: false,
  debounceTime: 180,
  step: 1,
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  placeholder: "",
  tabIndex: 0,
  //----------------
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  //----------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
};

NumberInput.propTypes = {
  id: PropTypes.string,
  value: PropTypes.number,
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
    "info",
  ]),
};

export default NumberInput;
