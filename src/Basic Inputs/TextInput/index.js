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
  border: 1.5px solid ${(props) => props.theme.test_palette.light[500]};
  line-height: inherit;
  appearance: none;
  outline: none;
  display: inline-block;
  border-radius: 0.25rem;
  width: 100%;
  box-sizing: border-box;

  &:disabled {
    border: 1.5px solid ${(props) => props.theme.test_palette.light[400]};
    color: ${(props) => props.theme.test_palette.light[500]};
    cursor: default;
  }

  &:hover:enabled {
    border: 1.5px solid ${(props) => props.theme.test_palette[props.color][400]};
  }

  &:focus:enabled {
    border: 1.5px solid ${(props) => props.theme.test_palette[props.color][400]};
    box-shadow: 0px 0px 6px -2px ${(props) => props.theme.test_palette[props.color][400]};
  }
`;

//===================================================

const TextInput = React.forwardRef((props, ref) => {
  //
  const {
    id,
    disabled,
    readOnly,
    preventDefault,
    value,
    defaultValue,
    debounceTime,
    type,
    placeholder,
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
      type={type}
      theme={theme}
      color={color}
      size={size}
      className={className}
      style={style}
      disabled={disabled}
      readOnly={readOnly}
      ref={ref}
      value={inputValue}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onValueChange}
    />
  );
});

TextInput.defaultProps = {
  id: "",
  value: 0,
  defaultValue: 0,
  disabled: false,
  readOnly: false,
  debounceTime: 180,
  placeholder: "",
  type: "text",
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
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  debounceTime: PropTypes.number,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(["text", "email"]),
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
    "error",
    "warning",
    "gray",
  ]),
};

export default TextInput;
