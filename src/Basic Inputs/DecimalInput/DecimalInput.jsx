/* eslint-disable react/display-name */
import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";
import { forwardRef, useCallback, useState } from "react";
import NumberFormat from "react-number-format";
import debounce from "lodash.debounce";
import { StyledPrefix, StyledSuffix, StyledWrapper } from "./styledComponents";

//===================================================

const DecimalInput = forwardRef((props, ref) => {
  //
  const {
    disabled,
    readOnly,
    debounceTime = 0,
    prefix,
    suffix,
    thousandSeparator = ".",
    decimalSeparator = ",",
    decimalScale = 2,
    fixedDecimalScale = true,
    allowNegative = true,
    //----------------
    onChange,
    onBlur,
    onFocus,
    onInputChange,
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
    onInputChange?.(e, value);
  };

  const onValueChange = (valueObject, eventObject) => {
    debouncedOnChange(eventObject.event, valueObject?.floatValue);
  };

  const getDecimalScale = () => {
    if (decimalScale < 0) return 0;
    if (decimalScale > 17) return 17;

    return decimalScale;
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
        getInputRef={ref}
        className="lnc-decimal-input"
        disabled={disabled}
        readOnly={readOnly}
        thousandSeparator={thousandSeparator}
        decimalSeparator={decimalSeparator}
        decimalScale={getDecimalScale()}
        fixedDecimalScale={fixedDecimalScale}
        allowNegative={allowNegative}
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

// DecimalInput.defaultProps = {
//   id: "",
//   value: "",
//   defaultValue: "",
//   disabled: false,
//   readOnly: false,
//   debounceTime: 180,
//   thousandSeparator: ".",
//   decimalSeparator: ",",
//   decimalScale: 2,
//   fixedDecimalScale: true,
//   allowNegative: true,
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
   * `(event, value) => void`
   */
  onInputChange: PropTypes.func,
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

export default DecimalInput;
