import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, { useState } from "react";

const paddingBySize = (size) => {
  if (size === "small") return "6.2px 6.2px";
  if (size === "medium") return "8px 8px";
  if (size === "large") return "10px 10px";
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
    }
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
    value
  } = props;

  const { onChange = emptyFunc } = props;

  const [val, setVal] = useState(value ? value : "");   

  const handleOnChange = (e) => {
    if (preventDefault) {
      e.preventDefault();
    }
    setVal(e.target.value);
    console.log("hendl cejndz: ", val);
  };

  const handleOnBlur = (e) => {
    if (preventDefault) {
      e.preventDefault();
    }
    onChange(id, val);
    console.log("hendl blur: ", val);
  };

  return (
    <StyledTextInput
      {...{ theme, size, color }}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      className={className}
      disabled={disabled}
      value={val}
    >
    </StyledTextInput>
  );
};

StyledTextInput.defaultProps = {
  id: "",
  disabled: false,
  tooltipText: "",
  onClick: () => {},
  iconClassName: "",
  className: "",
  preventDefault: true,
  size: "small",
  iconLocation: "left",
  text: "",
  color: "primary",
  value: ""
};

StyledTextInput.propTypes = {
  id: PropTypes.string,
  disabled: PropTypes.bool,
  tooltipText: PropTypes.string,
  onClick: PropTypes.func,
  iconClassName: PropTypes.string,
  className: PropTypes.string,
  preventDefault: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  iconLocation: PropTypes.oneOf(["left", "right"]),
  text: PropTypes.string,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "gray",
  ]),
  value: PropTypes.string
};

export default TextInput;
