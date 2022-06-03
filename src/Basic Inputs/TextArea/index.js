import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import theme from "../../_utils/theme";
import { useTheme } from "@emotion/react";
import { debounce } from "lodash";

const paddingBySize = (size) => {
  return {
    small: "0.41875rem 0.5rem",
    medium: "0.48125rem 0.6rem",
    large: "0.65625rem 0.7rem",
  }[size];
};

const heightBySize = {
  small: "1.875rem",
  medium: "2.25rem",
  large: "2.625rem",
};

const standardCssFields = ({ theme, size }) => {
  var height = heightBySize[size];

  return `
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography[size].fontSize};
    min-height: ${height};
  `;
};

const StyledTextArea = styled.textarea`
  ${(props) => standardCssFields(props)}
  appearance: none;
  outline: none;
  border: none;
  transition: all 250ms ease;
  resize: vertical;
  display: inline-block;
  overflow: hidden;
  cursor: text;
  width: 100%;
  box-sizing: border-box;
  height: ${(props) => heightBySize[props.size]};
  resize: none;
  white-space: nowrap;
  padding: ${(props) => paddingBySize(props.size)};
  background-color: ${(props) => props.theme.test_palette.light[100]};
  color: ${(props) => props.theme.test_palette.dark[500]};
  border: 1.5px solid ${(props) => props.theme.test_palette.light[500]};
  border-radius: 0.25rem;

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

const TextArea = React.forwardRef((props, ref) => {
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
    <StyledTextArea
      ref={ref}
      {...{ theme, size, color, className, style, disabled, readOnly }}
      onChange={onValueChange}
      disabled={disabled}
      value={inputValue}
      onFocus={(e) => {
        e.target.style.whiteSpace = "inherit";
        e.target.style.height = `${e.target.scrollHeight}px`;

        if (onFocus) onFocus(e);
      }}
      onInput={(e) => {
        e.target.style.whiteSpace = "inherit";
        e.target.style.height = `${e.target.scrollHeight}px`;
      }}
      onBlur={(e) => {
        e.target.style.height = heightBySize[size];
        e.target.style.whiteSpace = "nowrap";

        if (onBlur) onBlur(e);
      }}
    />
  );
});

TextArea.defaultProps = {
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

TextArea.propTypes = {
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

export default TextArea;
