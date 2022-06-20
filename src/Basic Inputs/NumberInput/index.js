import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, { useCallback, useState, useEffect } from "react";
import { debounce } from "lodash";

const paddingBySize = (size) => {
  return {
    small: "0.41875rem 0.5rem",
    medium: "0.48125rem 0.6rem",
    large: "0.65625rem 0.7rem",
  }[size];
};

const standardCssFields = ({ theme, size }) => {
  var height = { small: "1.875rem", medium: "2.25rem", large: "2.625rem" }[
    size
  ];

  return `
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography[size].fontSize};
    min-height: ${height};
    max-height: ${height};
  `;
};

const Input = styled.input`
  ${(props) => standardCssFields(props)}
  padding: ${(props) => paddingBySize(props.size)};
  background-color: ${(props) => props.theme.test_palette.light[100]};
  color: ${(props) => props.theme.test_palette.dark[500]};
  border: 0.09375rem solid ${(props) => props.theme.test_palette.light[500]};
  line-height: inherit;
  appearance: none;
  outline: none;
  display: inline-block;
  border-radius: 0.25rem;
  width: 100%;
  box-sizing: border-box;

  &:disabled {
    border: 0.09375rem solid ${(props) => props.theme.test_palette.light[400]};
    color: ${(props) => props.theme.test_palette.light[500]};
    cursor: default;
  }

  &:hover:enabled {
    border: 0.09375rem solid
      ${(props) => props.theme.test_palette[props.color][400]};
  }

  &:focus:enabled {
    border: 0.09375rem solid
      ${(props) => props.theme.test_palette[props.color][400]};
    box-shadow: 0px 0px 0.375rem -0.125rem ${(props) => props.theme.test_palette[props.color][400]};
  }
`;

//===================================================

const NumberInput = React.forwardRef((props, ref) => {
  //
  const {
    id,
    disabled,
    readOnly,
    preventDefault,
    value,
    defaultValue,
    debounceTime,
    step,
    min,
    max,
    placeholder,
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
  const [inputValue, setInputValue] = useState(0);

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

  return (
    <Input
      type={"number"}
      theme={theme}
      color={color}
      size={size}
      className={className}
      style={style}
      disabled={disabled}
      readOnly={readOnly}
      ref={ref}
      step={step}
      value={inputValue}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onValueChange}
      {...rest}
    />
  );
});

NumberInput.defaultProps = {
  id: "",
  value: 0,
  defaultValue: 0,
  disabled: false,
  readOnly: false,
  debounceTime: 180,
  step: 1,
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  placeholder: "",
  //----------------
  onChange: () => {},
  onKeyDown: () => {},
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
  defaultValue: PropTypes.number,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  debounceTime: PropTypes.number,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  placeholder: PropTypes.string,
  //----------------
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
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

export default NumberInput;
