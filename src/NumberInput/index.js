import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, { useState } from "react";

const paddingBySize = (size) => {
  if (size === "small") return "0.325rem 0.375rem";
  if (size === "medium") return "0.3875rem 0.375rem";
  if (size === "large") return "0.425rem 0.375rem";
};

const heightBySize = (size, hasText) => {
  if (size === "small") return `1.625rem`;
  if (size === "medium") return `2rem`;
  if (size === "large") return `2.375rem`;
};

const StyledNumberInput = styled.input((props) => {
  return {
    appearance: "none",
    outline: "none",
    border: "none",
    borderBottom: `0.125rem solid ${props.theme.palette[props.color].main}`,
    transition: "all 250ms",
    display: "inline-block",
    cursor: "text",
    width: "100%",
    boxSizing: "border-box",
    minHeight: heightBySize(props.size),
    maxHeight: heightBySize(props.size),
    padding: paddingBySize(props.size),
    fontFamily: props.theme.typography.fontFamily,
    fontSize: props.theme.typography[props.size].fontSize,
    backgroundColor: props.theme.palette[props.color].lighter,
    color: props.theme.palette[props.color].textDark,
    borderRadius: "0.125rem",
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

const NumberInput = (props) => {
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
    isDecimal,
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

  const isInputInteger = (evt) => {
    var ch = String.fromCharCode(evt.which);
    var oldValue = evt.target.value;

    if (ch === "-" && (oldValue == undefined || oldValue.length === 0)) return;

    if (!/[0-9]/.test(ch)) evt.preventDefault();
  };

  let decimalSeparator =
    props.decimalSeparator !== undefined && props.decimalSeparator.length === 1
      ? props.decimalSeparator
      : ".";

  let numberOfDecimalPlaces =
    props.numberOfDecimalPlaces !== undefined ? props.numberOfDecimalPlaces : 2;

  const isInputDecimal = (evt) => {
    var ch = String.fromCharCode(evt.which);
    var oldValue = evt.target.value;

    if (ch === "-" && (oldValue == undefined || oldValue.length === 0)) return;

    var regex = new RegExp("^\\d*\\" + decimalSeparator + "?\\d*$");
    if (!regex.test(ch)) {
      evt.preventDefault();
    } else {
      if (decimalSeparator === ch) {
        if (oldValue.includes(decimalSeparator)) {
          evt.preventDefault();
        }
      } else {
        if (oldValue.includes(decimalSeparator)) {
          var numOfDecimalPlaces = oldValue.split(decimalSeparator)[1].length;
          if (numOfDecimalPlaces >= numberOfDecimalPlaces) {
            evt.preventDefault();
          }
        }
      }
    }
  };

  return (
    <StyledNumberInput
      {...{ theme, size, color }}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      className={className}
      disabled={disabled}
      value={val}
      type="text"
      onKeyPress={isDecimal ? isInputDecimal : isInputInteger}
      onPaste={isDecimal ? isInputDecimal : isInputInteger}
    />
  );
};

StyledNumberInput.defaultProps = {
  id: "",
  disabled: false,
  onChange: () => {},
  iconClassName: "",
  className: "",
  preventDefault: true,
  size: "small",
  color: "primary",
  value: "",
  isDecimal: false,
};

StyledNumberInput.propTypes = {
  id: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  preventDefault: PropTypes.bool,
  isDecimal: PropTypes.bool,
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

export default NumberInput;
