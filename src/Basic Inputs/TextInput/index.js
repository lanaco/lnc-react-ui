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
      value={inputValue}
      onFocus={onFocus}
      onBlur={onBlur}
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
