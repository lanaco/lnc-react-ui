import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import theme from "../_utils/theme";

const paddingBySize = (size) => {
  if (size === "small") return "0.325rem 0.375rem";
  if (size === "medium") return "0.3875rem 0.375rem";
  if (size === "large") return "0.422375rem 0.375rem";
};

const heightBySize = (size, hasText) => {
  if (size === "small") return `1.625rem`;
  if (size === "medium") return `2rem`;
  if (size === "large") return `2.375rem`;
};

const StyledTextInput = styled.input((props) => {
  return {
    appearance: "none",
    outline: "none",
    border: "none",
    borderBottom: `0.125rem solid ${props.theme.palette[props.color].main}`,
    transition: "all 250ms",
    display: "inline-block",
    flexDirection: "row",
    justifyContent: "center",
    cursor: "text",
    padding: paddingBySize(props.size),
    fontSize: props.theme.typography[props.size].fontSize,
    backgroundColor: props.theme.palette[props.color].lighter,
    color: props.theme.palette[props.color].textDark,
    borderRadius: "0.125rem",
    width: "100%",
    boxSizing: "border-box",
    minHeight: heightBySize(props.size),
    maxHeight: heightBySize(props.size),
    fontFamily: props.theme.typography.fontFamily,
    "&:disabled": {
      backgroundColor: props.theme.palette.gray[200],
      borderBottom: `0.125rem solid ${props.theme.palette.gray[900]}`,
      color: props.theme.palette.gray.textLight,
      opacity: 0.7,
      cursor: "default",
    },
    "&:focus": {
      backgroundColor: props.theme.palette.common.white,
      color: props.theme.palette.common.black,
    },
  };
});

//===================================================

const TextInput = (props) => {
  const {
    theme,
    color,
    id,
    disabled,
    preventDefault,
    className,
    size,
    value,
    onChange,
  } = props;

  const [val, setVal] = useState(value ? value : "");

  const handleOnChange = (e) => {
    if (preventDefault) e.preventDefault();
    setVal(e.target.value);
  };

  const handleOnBlur = (e) => {
    if (preventDefault) e.preventDefault();
    onChange(id, val);
  };

  return (
    <StyledTextInput
      {...{ theme, size, color }}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      className={className}
      disabled={disabled}
      value={val}
      type="text"
    />
  );
};

TextInput.defaultProps = {
  id: "",
  theme: theme,
  disabled: false,
  onChange: () => {},
  className: "",
  preventDefault: true,
  size: "small",
  color: "primary",
  value: "",
};

TextInput.propTypes = {
  theme: PropTypes.object.isRequired,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  preventDefault: PropTypes.bool,
  value: PropTypes.string,
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
