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

const TextInput = React.forwardRef((props, ref) => {
  //
  const {
    id,
    disabled,
    readOnly,
    value,
    debounceTime,
    type,
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

  const theme = useTheme();
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => setInputValue(value ? value : ""), [value]);

  const debouncedOnChange = useCallback(
    debounce((e, val) => handleChange(e, val), debounceTime),
    []
  );

  const handleChange = (e, value) => {
    if (onChange) onChange(e, value);
  };

  const onValueChange = (e) => {
    setInputValue(e.target.value);
    debouncedOnChange(e, e.target.value);
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
        type={type}
        theme={theme}
        color={color}
        size={size}
        placeholder={placeholder}
        prefix={prefix}
        suffix={suffix}
        style={style}
        disabled={disabled}
        readOnly={readOnly}
        isFocused={isFocused}
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

TextInput.defaultProps = {
  id: "",
  value: "",
  disabled: false,
  readOnly: false,
  debounceTime: 180,
  placeholder: "",
  type: "text",
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

TextInput.propTypes = {
  id: PropTypes.string,
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
    "info",
  ]),
};

export default TextInput;
