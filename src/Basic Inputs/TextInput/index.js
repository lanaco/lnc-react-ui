import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, { useCallback, useState, useEffect } from "react";
import { debounce } from "lodash";
import {
  getBorderRadiusValueWithUnits,
  getColorRgbaValue,
  getComponentTypographyCss,
  getDisabledStateCss,
  getOutlineCss,
  getSizeValueWithUnits,
} from "../../_utils/utils";

const Input = styled.input`
  ${(props) =>
    getComponentTypographyCss(props.theme, "Input", props.size, "enabled")}
  min-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
  max-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
  background-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Input",
      props.color,
      "enabled",
      "background"
    )};
  color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Input",
      props.isFocused ? "primary" : props.color,
      "enabled",
      "text"
    )};
  border: 1px solid
    ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Input",
        props.isFocused ? "primary" : props.color,
        "enabled",
        "border"
      )};
  caret-color: ${(props) =>
    getColorRgbaValue(props.theme, "Input", props.color, "enabled", "caret")};
  border-radius: ${(props) =>
    getBorderRadiusValueWithUnits(props.theme, "regular")};
  padding: 0.625rem 0.75rem;
  width: 100%;

  &::placeholder {
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Input",
        props.color,
        "enabled",
        "placeholder"
      )};
  }

  &:focus {
    ${(props) => getOutlineCss(props.theme)}
  }

  &:disabled {
    ${(props) => getDisabledStateCss(props.theme)}
    border: 1px solid ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Input",
        props.color,
        "disabled",
        "border"
      )};
  }
`;

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
    <Input
      ref={ref}
      type={type}
      theme={theme}
      color={color}
      size={size}
      className={className}
      placeholder={placeholder}
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
  debounceTime: PropTypes.number,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(["text", "email"]),
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
    "info",
  ]),
};

export default TextInput;
