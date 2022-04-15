import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, { useState, useRef, useEffect } from "react";

const paddingBySize = (size) => {
  if (size === "small") return "0.3rem 0.375rem";
  if (size === "medium") return "0.3875rem 0.375rem";
  if (size === "large") return "0.426125rem 0.375rem";
};

const heightBySize = (size) => {
  if (size === "small") return `1.625rem`;
  if (size === "medium") return `2rem`;
  if (size === "large") return `2.375rem`;
};

const StyledTextInput = styled.textarea`
    font-family: ${props => props.theme.typography.fontFamily};
    appearance: none;
    outline: none;
    border: none;
    border-bottom: ${props => "0.125rem solid " + props.theme.palette[props.color].main};
    transition: all 250ms ease;
    resize: vertical;
    display: inline-block;
    overflow: hidden;
    cursor: text;
    width: 100%;
    box-sizing: border-box;
    height: ${props => heightBySize(props.size)};
    min-height: ${props => heightBySize(props.size)};
    resize: none;
    white-space: nowrap;
    padding: paddingBySize(props.size);
    font-size: ${props => props.theme.typography[props.size].fontSize};
    background-color: ${props => props.theme.palette[props.color].lighter};
    color: ${props => props.theme.palette[props.color].textDark};
    border-radius: 0.125rem;
    &:disabled {
      background-color: props.theme.palette.gray[200];
      border-bottom: ${props => "0.125rem solid " + props.theme.palette.gray[900]};
      color: ${props => props.theme.palette.gray.textLight};
      opacity: 0.7;
      cursor: default;
    };
    &:focus {
      background-color: ${props => props.theme.palette.common.white};
      color: ${props => props.theme.palette.common.black};
    };
`;

//===================================================

const TextArea = React.forwardRef((props, ref) => {
  const {
    color,
    id,
    disabled,
    readOnly,
    placeholder,
    className,
    style,

    preventDefault,
    size,
    value,
    defaultValue,
    autoFocus,
    onChange,
    onInput,
    onBlur,
    ...rest
  } = props;
  const theme = useTheme();
  const [text, setText] = useState(value ? "" : (defaultValue ? defaultValue : ""));


  useEffect(() => {
    if (value) {
      if (text !== value) setText(value === null ? "" : value);
    }
  }, [value]);

  // useEffect(() => {
  //   const timeOutId = setTimeout(() => handleDelayedOnChange(), 350);
  //   return () => clearTimeout(timeOutId);
  // }, [text]);


  const handleOnChange = (e) => {
    if (preventDefault) e.preventDefault();

    onChange(id, e.target.value);
  };

  const handleOnInput = (e) => {
    if (preventDefault) e.preventDefault();
    
    if(onInput) onInput(id, e);
    if (text != e.target.value)
      setText(e.target.value);
  }

  const handleOnBlur = (e) => {
    if (preventDefault) {
      e.preventDefault();
    }
    if (onChange) handleOnChange(e);
    if (onBlur) onBlur(e);
  };


  return (
    <StyledTextInput
      {...{ theme, size, color }}
      className={className}
      style={style}
      placeholder={placeholder}
      disabled={disabled}
      value={text}
      ref={ref}
      readOnly={readOnly}
      // onFocus={(e) => {
      //   e.target.style.whiteSpace = "inherit";
      //   e.target.style.height = `${e.target.scrollHeight}px`;
      // }}
      onInput={(e) => {
        e.target.style.whiteSpace = "inherit";
        e.target.style.height = `${e.target.scrollHeight}px`;
        handleOnInput(e);
      }}
      onBlur={(e) => {
        e.target.style.height = heightBySize(size);
        e.target.style.whiteSpace = "nowrap";
        handleOnBlur(e);
      }}
      autoFocus={autoFocus}
      {...rest}
    />
  );
});

TextArea.defaultProps = {
  id: "",
  disabled: false,
  readOnly: false,
  className: "",
  preventDefault: true,
  size: "small",
  color: "primary",
  value: "",
  defaultValue: "",
  autoFocus: false, 
  //onChange: () => {},
};

TextArea.propTypes = {
  id: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  preventDefault: PropTypes.bool,
  autoFocus: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "gray",
  ]),
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
};

export default TextArea;
