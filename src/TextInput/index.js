/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, { useState } from "react";

const paddingBySize = (size) => {
  if (size === "small") return "0.2625rem 0.2625rem";
  if (size === "medium") return "0.325rem 0.325rem";
  if (size === "large") return "0.3625rem 0.3625rem";
};

const StyledTextInput = styled.input((props) => {
  return {
    appearance: "none",
    outline: "none",
    border: "none",
    borderBottom: "2px solid " + props.theme.palette[props.color].main,
    transition: "all 250ms",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    cursor: "text",
    padding: paddingBySize(props.size),
    fontSize: props.theme.typography[props.size].fontSize,
    backgroundColor: props.theme.palette["background"].main,
    color: props.theme.palette["background"].text,
    borderRadius: "2px",
    "&:disabled": {
      backgroundColor: props.theme.palette.gray[200],
      borderBottom: "2px solid " + props.theme.palette.gray[900],
      color: props.theme.palette.gray.textLight,
      opacity: 0.7,
      cursor: "default",
    },
    "&:focus": {
      backgroundColor: props.theme.palette["background"].light,
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
    ></StyledTextInput>
  );
};

TextInput.defaultProps = {
  id: "",
  theme: {},
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
