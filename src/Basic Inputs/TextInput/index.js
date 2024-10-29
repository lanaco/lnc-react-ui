import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import {
  StyledInput,
  StyledPrefix,
  StyledSuffix,
  StyledWrapper,
} from "./styledComponents";
import { useUpdateEffect } from "react-use";

//===================================================

const TextInput = React.forwardRef((props, ref) => {
  //
  const {
    disabled,
    readOnly,
    defaultValue,
    value,
    debounceTime = 180,
    type = "text",
    placeholder,
    tabIndex,
    prefix,
    suffix,
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
  const [inputValue, setInputValue] = useState(value || defaultValue || "");
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    if (value !== null && value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const debouncedOnChange = useCallback(
    debounce((e, val) => handleChange(e, val), debounceTime),
    [onChange]
  );

  const handleChange = (e, value) => {
    if (onChange) onChange?.(e, value);
  };

  const onValueChange = (e) => {
    // if (value || value === "") 
    setInputValue(e.target.value);
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
        type={type}
        theme={theme}
        color={color}
        size={size}
        placeholder={placeholder}
        prefix={prefix}
        suffix={suffix}
        disabled={disabled}
        readOnly={readOnly}
        focused={focused}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onValueChange}
        tabIndex={tabIndex}
        value={inputValue}
        {...rest}
      />

      {/* {
        // Controlled input and uncotrolled input must be differentiated because of usage of the value property
        value == null || value == "undefined" ? (
          <StyledInput
            ref={ref}
            type={type}
            theme={theme}
            color={color}
            size={size}
            placeholder={placeholder}
            prefix={prefix}
            suffix={suffix}
            disabled={disabled}
            readOnly={readOnly}
            focused={focused}
            defaultValue={defaultValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={onValueChange}
            tabIndex={tabIndex}
            {...rest}
          />
        ) : (
          <StyledInput
            ref={ref}
            type={type}
            theme={theme}
            color={color}
            size={size}
            placeholder={placeholder}
            prefix={prefix}
            suffix={suffix}
            disabled={disabled}
            readOnly={readOnly}
            focused={focused}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={onValueChange}
            tabIndex={tabIndex}
            value={inputValue}
            {...rest}
          />
        )
      } */}
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

// TextInput.defaultProps = {
//   defaultValue: "",
//   disabled: false,
//   readOnly: false,
//   debounceTime: 180,
//   placeholder: "",
//   type: "text",
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

TextInput.propTypes = {
  id: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  /**
   * Time in miliseconds before onChange event fires after it has been triggered.
   */
  debounceTime: PropTypes.number,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(["text", "email"]),
  tabIndex: PropTypes.number,
  /**
   * Reserved space before input. Intented to be used with plain text or `Icon` component.
   */
  prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /**
   * Reserved space after input. Intented to be used with plain text or `Icon` component.
   */
  suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
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

export default TextInput;
