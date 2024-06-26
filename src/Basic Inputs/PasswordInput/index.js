import React, { useEffect, useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import { debounce } from "lodash";
import Icon from "../../General/Icon";
import {
  StyledInput,
  StyledLockIcon,
  StyledPrefix,
  StyledSuffix,
  StyledWrapper,
} from "./styledComponents";
import { useEffectOnce, useUpdateEffect } from "react-use";

//===================================================

const PasswordInput = React.forwardRef((props, ref) => {
  const {
    id,
    disabled,
    readOnly,
    value,
    defaultValue,
    debounceTime,
    placeholder,
    tabIndex,
    prefix,
    suffix,
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
  //
  const theme = useTheme();
  const inputRef = useRef();

  const [locked, setLocked] = useState(true);
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value ? value : defaultValue);

  useEffect(() => {
    if (ref !== null && ref !== undefined) ref.current = inputRef.current;
  }, [ref, inputRef]);

  useEffect(() => {
    inputRef.current.selectionStart = inputValue?.length ? inputValue.length : 0;
    inputRef.current.selectionEnd = inputValue?.length ? inputValue.length : 0;
  }, [locked]);

  useUpdateEffect(() => setInputValue(value), [value]);

  const debouncedOnChange = useCallback(
    debounce((e, val) => handleChange(e, val), debounceTime),
    [onChange]
  );

  const handleChange = (e, value) => {
    if (onChange) onChange(e, value);
  };

  const onValueChange = (e) => {
    if (value || value === "") setInputValue(e.target.value);
    debouncedOnChange(e, e.target.value);
  };

  const toggleLocked = () => {
    setLocked(!locked);
    inputRef.current.focus();
  };

  const handleFocus = (e) => {
    setFocused(true);
    onFocus(e);
  };

  const handleBlur = (e) => {
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
      {
        // Controlled input and uncotrolled input must be differentiated because of usage of the value property
        (value == null || value == "undefined") ?
        <StyledInput
        ref={inputRef}
        type={locked ? "password" : "text"}
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
      :
      <StyledInput
        ref={inputRef}
        type={locked ? "password" : "text"}
        theme={theme}
        color={color}
        size={size}
        placeholder={placeholder}
        prefix={prefix}
        suffix={suffix}
        disabled={disabled}
        readOnly={readOnly}
        focused={focused}
        value={inputValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onValueChange}
        tabIndex={tabIndex}
        {...rest}
      />
      }
      <StyledLockIcon
        theme={theme}
        color={color}
        focused={focused}
        onClick={toggleLocked}
      >
        <Icon icon={locked ? "eye-slash" : "eye"} />
      </StyledLockIcon>
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

PasswordInput.defaultProps = {
  id: "",
  disabled: false,
  readOnly: false,
  debounceTime: 180,
  defaultValue: "",
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

PasswordInput.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  debounceTime: PropTypes.number,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  //----------------
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
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
    "gray"
  ]),
};

export default PasswordInput;