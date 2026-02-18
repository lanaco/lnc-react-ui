/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { useEffect, useState, useCallback, useRef, forwardRef } from "react";
import { useTheme } from "@emotion/react";
import debounce from "lodash.debounce";
import Icon from "../../General/Icon/Icon";
import {
  StyledInput,
  StyledLockIcon,
  StyledPrefix,
  StyledSuffix,
  StyledWrapper,
} from "./styledComponents";

//===================================================

const PasswordInput = forwardRef((props, ref) => {
  const {
    wrapperRef,
    disabled,
    readOnly,
    debounceTime = 0,
    placeholder,
    prefix,
    suffix,
    value,
    defaultValue,
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

  const inputRef = useRef();

  const theme = useTheme();
  const [inputValue, setInputValue] = useState(value || defaultValue || "");
  useEffect(() => {
    if (value !== null && value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const [locked, setLocked] = useState(true);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const inputValue = inputRef?.current?.value || "";

    inputRef.current.selectionStart = inputValue?.length
      ? inputValue.length
      : 0;
    inputRef.current.selectionEnd = inputValue?.length ? inputValue.length : 0;
  }, [locked]);

  useEffect(() => {
    if (ref !== null && ref !== undefined) ref.current = inputRef.current;
  }, [ref, inputRef]);

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

  const toggleLocked = () => {
    setLocked(!locked);
    inputRef.current.focus();
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
      ref={wrapperRef}
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
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onValueChange}
        value={inputValue}
        {...rest}
      />
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

// PasswordInput.defaultProps = {
//   id: "",
//   disabled: false,
//   readOnly: false,
//   debounceTime: 180,
//   defaultValue: "",
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

export default PasswordInput;
