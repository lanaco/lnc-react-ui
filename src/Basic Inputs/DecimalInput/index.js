import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { debounce } from "lodash";
import { StyledPrefix, StyledSuffix, StyledWrapper } from "./styledComponents";

//===================================================

const DecimalInput = React.forwardRef((props, ref) => {
  //
  const {
    id,
    disabled,
    readOnly,
    preventDefault,
    value,
    defaultValue,
    debounceTime,
    prefix,
    suffix,
    thousandSeparator,
    decimalSeparator,
    decimalScale,
    fixedDecimalScale,
    allowNegative,
    //----------------
    onChange,
    onKeyDown,
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
  const [inputValue, setInputValue] = useState(defaultValue);
  const [refresh, setRefresh] = useState(true);
  const [focused, setFocused] = useState(false);

  useEffect(() => setInputValue(value), [value]);

  const debouncedOnChange = useCallback(
    debounce((e, val) => handleChange(e, val), debounceTime),
    []
  );

  const handleChange = (e, value) => {
    if (onChange) onChange(e, value);
  };

  const forceRefresh = () => setRefresh(!refresh);

  const onValueChange = (valueObject, eventObject) => {
    console.log;

    var triggerRefresh = false;
    var _value = valueObject.floatValue || 0;

    if (defaultValue === null && valueObject.floatValue === undefined) {
      triggerRefresh = true;
      _value = defaultValue === null ? null : 0;
    }

    if (_value === -0) {
      triggerRefresh = true;
      _value = defaultValue === null ? null : 0;
    }

    if (_value === undefined) {
      triggerRefresh = true;
      _value = defaultValue === null ? null : 0;
    }

    if (_value > Number.MAX_SAFE_INTEGER) {
      _value = Number.MAX_SAFE_INTEGER;
      triggerRefresh = true;
    }

    if (_value < Number.MIN_SAFE_INTEGER) {
      _value = Number.MIN_SAFE_INTEGER;
      triggerRefresh = true;
    }

    setInputValue(_value);

    if (_value !== inputValue) debouncedOnChange(eventObject.event, _value);

    if (triggerRefresh) forceRefresh();
  };

  const getDecimalScale = () => {
    if (decimalScale < 0) return 0;
    if (decimalScale > 17) return 17;

    return decimalScale;
  };

  const handleFocus = (e) => {
    setFocused(true);
    onFocus(e);
  };

  const handleBlur = (e) => {
    if (inputValue === 0 && e.target.value.includes("-")) forceRefresh();
    setFocused(false);
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
      prefix={prefix}
      suffix={suffix}
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

      <NumberFormat
        className="lnc-decimal-input"
        disabled={disabled}
        readOnly={readOnly}
        thousandSeparator={thousandSeparator}
        decimalSeparator={decimalSeparator}
        decimalScale={getDecimalScale()}
        fixedDecimalScale={fixedDecimalScale}
        allowNegative={allowNegative}
        value={inputValue}
        defaultValue={defaultValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onValueChange={onValueChange}
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

DecimalInput.defaultProps = {
  id: "",
  value: null,
  defaultValue: null,
  disabled: false,
  readOnly: false,
  debounceTime: 180,
  thousandSeparator: ".",
  decimalSeparator: ",",
  decimalScale: 2,
  fixedDecimalScale: true,
  allowNegative: true,
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

DecimalInput.propTypes = {
  id: PropTypes.string,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  debounceTime: PropTypes.number,
  /**
   * Reserved space before input. Intented to be used with plain text or `Icon` component.
   */
  prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /**
   * Reserved space after input. Intented to be used with plain text or `Icon` component.
   */
  suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  thousandSeparator: PropTypes.oneOf([".", ",", " "]),
  decimalSeparator: PropTypes.oneOf([".", ","]),
  decimalScale: PropTypes.number,
  fixedDecimalScale: PropTypes.bool,
  allowNegative: PropTypes.bool,
  //----------------
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

export default DecimalInput;
