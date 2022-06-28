import React, { useEffect, useState, useCallback, useRef } from "react";
import "../../Base/fontawesome/css/fontawesome.css";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { debounce } from "lodash";

const heightBySize = (size) => {
  return { small: `1.875rem`, medium: `2.25rem`, large: `2.625rem` }[size];
};

const paddingBySize = (size) => {
  if (size === "small") return "0.41875rem 0.375rem";
  if (size === "medium") return "0.475rem 0.4rem";
  if (size === "large") return "0.5625rem 0.425rem";
};

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  border-radius: 0.25rem;
  box-sizing: border-box;
  min-height: ${(props) => heightBySize(props.size)};
  max-height: ${(props) => heightBySize(props.size)};
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  font-family: ${(props) => props.theme.typography.fontFamily};
  color: ${(props) => props.theme.test_palette.dark[500]};

  border: 0.09375rem solid
    ${(props) =>
      props.disabled
        ? props.theme.test_palette.light[400]
        : props.focused
        ? props.theme.test_palette[props.color][400]
        : props.theme.test_palette.light[500]};

  box-shadow: ${(props) =>
    props.focused
      ? "0px 0px 0.375rem -0.125rem " +
        props.theme.test_palette[props.color][400]
      : "none"};

  &:hover {
    border: 0.09375rem solid
      ${(props) =>
        props.disabled
          ? props.theme.test_palette.light[400]
          : props.theme.test_palette[props.color][400]};
  }

  &:hover i {
    color: ${(props) =>
      props.disabled
        ? props.theme.test_palette.light[400]
        : props.theme.test_palette[props.color][400]};
  }
`;

const IconButton = styled.div`
  margin-left: auto;
  cursor: ${(props) => (props.disabled || props.readOnly ? "auto" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0
    ${(props) =>
      ({ small: "0.4rem", medium: "0.5rem", large: "0.6rem" }[props.size])};
`;

const Icon = styled.i`
  font-size: ${(props) => props.theme.typography[props.size].fontSize};

  color: ${(props) =>
    props.disabled
      ? props.theme.test_palette.light[400]
      : props.focused
      ? props.theme.test_palette[props.color][400]
      : props.theme.test_palette.light[500]};
`;

const Input = styled.input`
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  font-family: ${(props) => props.theme.typography.fontFamily};
  color: ${(props) => props.theme.test_palette.dark[500]};
  appearance: none;
  outline: none;
  border: none;
  box-sizing: border-box;
  width: 100%;

  padding: ${(props) => paddingBySize(props.size)};
  transition: all 250ms ease;

  &:disabled {
    color: ${(props) => props.theme.test_palette.light[500]};
    background-color: white;
    cursor: auto;
  }
`;

//===================================================

const PasswordInput = React.forwardRef((props, ref) => {
  const {
    id,
    disabled,
    readOnly,
    value,
    debounceTime,
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
  //
  const theme = useTheme();

  const [locked, setLocked] = useState(true);
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef();

  var themeProps = { theme, size, color, disabled, readOnly, focused };

  useEffect(() => {
    if (ref !== null && ref !== undefined) ref.current = inputRef.current;
  }, [ref, inputRef]);

  useEffect(() => {
    inputRef.current.selectionStart = inputValue.length;
    inputRef.current.selectionEnd = inputValue.length;
  }, [locked]);

  useEffect(() => {
    if (value) {
      if (inputValue !== value) setInputValue(value === null ? "" : value);
    }
  }, [value]);

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

  const toggleLocked = () => {
    setLocked(!locked);
    inputRef.current.focus();
  };

  return (
    <Container {...themeProps} className={className} style={style}>
      <Input
        ref={inputRef}
        {...themeProps}
        type={locked ? "password" : "text"}
        onChange={onValueChange}
        value={inputValue || ""}
        onFocus={(e) => {
          setFocused(true);
          if (onFocus) onFocus(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          if (onBlur) onBlur(e);
        }}
        tabIndex={tabIndex}
        {...rest}
      />

      <IconButton {...themeProps} onClick={toggleLocked}>
        <Icon
          {...themeProps}
          className={`fas fa-${locked ? "eye-slash" : "eye"} fa-fw`}
        />
      </IconButton>
    </Container>
  );
});

PasswordInput.defaultProps = {
  id: "",
  value: 0,
  disabled: false,
  readOnly: false,
  debounceTime: 180,
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
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  debounceTime: PropTypes.number,
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

export default PasswordInput;
