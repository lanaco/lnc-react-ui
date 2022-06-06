import React, { useEffect, useCallback, useState } from "react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
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

const SyledInput = styled.input`
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

const TimeInput = React.forwardRef((props, ref) => {
  const {
    id,
    disabled,
    readOnly,
    value,
    debounceTime,
    type,
    //----------------
    onChange,
    //----------------
    className,
    style,
    size,
    color,
    ...rest
  } = props;

  //
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
    <SyledInput
      type="time"
      id={id}
      ref={ref}
      value={inputValue}
      onChange={onValueChange}
      disabled={disabled}
      readOnly={readOnly}
      theme={theme}
      color={color}
      size={size}
      className={className}
      style={style}
      {...rest}
    />
  );
});

TimeInput.defaultProps = {
  id: "",
  value: "",
  disabled: false,
  readOnly: false,
  debounceTime: 180,
  //----------------
  onChange: () => {},
  //----------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
};

TimeInput.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  debounceTime: PropTypes.number,
  //----------------
  onChange: PropTypes.func,
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

export default TimeInput;
