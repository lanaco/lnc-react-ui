import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, { useCallback, useRef, useState } from "react";
import NumberFormat from "react-number-format";
import { debounce } from "lodash";

const paddingBySize = (size, hasIcon, iconPosition) => {
  if (size === "small") {
    if (hasIcon) {
      if (iconPosition == "right") return "0.325rem 2rem 0.325rem 0.375rem";

      return "0.325rem 0.375rem 0.325rem 2rem";
    }
    return "0.325rem 0.375rem";
  }
  if (size === "medium") {
    if (hasIcon) {
      if (iconPosition == "right")
        return "0.375rem 2.375rem 0.375rem 0.3875rem";

      return "0.375rem 0.3875rem 0.375rem 2.475rem";
    }
    return "0.3875rem 0.375rem";
  }
  if (size === "large") {
    if (hasIcon) {
      if (iconPosition == "right")
        return "0.375rem 2.75rem 0.375rem 0.422375rem";

      return "0.375rem 0.422375rem 0.375rem 2.85rem";
    }
    return "0.422375rem 0.375rem";
  }
};

const heightBySize = (size) => {
  if (size === "small") return `1.625rem`;
  if (size === "medium") return `2rem`;
  if (size === "large") return `2.375rem`;
};

const Container = styled.div`
  width: 100%;

  & input {
    appearance: none;
    outline: none;
    border: none;
    border-bottom: ${(props) =>
      "0.125rem solid " + props.theme.palette[props.color].main};
    transition: all 250ms;
    display: inline-block;
    justify-content: center;
    cursor: text;
    padding: ${(props) =>
      paddingBySize(props.size, props.icon ? true : false, props.iconPosition)};
    font-size: ${(props) => props.theme.typography[props.size].fontSize};
    background-color: ${(props) => props.theme.palette[props.color].lighter};
    color: ${(props) => props.theme.palette[props.color].textDark};
    border-radius: 0.125rem;
    width: 100%;
    box-sizing: border-box;
    min-height: ${(props) => heightBySize(props.size)};
    max-height: ${(props) => heightBySize(props.size)};
    font-family: ${(props) => props.theme.typography.fontFamily};

    &:disabled {
      background-color: ${(props) => props.theme.palette.gray[200]};
      border-bottom: ${(props) =>
        "0.125rem solid " + props.theme.palette.gray[900]};
      color: ${(props) => props.theme.palette.gray.textLight};
      opacity: 0.7;
      cursor: default;
    }

    &:focus {
      background-color: ${(props) => props.theme.palette.common.white};
      color: ${(props) => props.theme.palette.common.black};
    }
  }
`;

//===================================================

const DecimalInput = React.forwardRef((props, ref) => {
  //
  const {
    id,
    disabled,
    readOnly,
    preventDefault,
    value,
    defaultValue,
    debounceTime,
    prefix,
    thousandSeparator,
    decimalSeparator,
    decimalScale,
    fixedDecimalScale,
    allowNegative,
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
  const [inputValue, setInputValue] = useState(0);
  const [refresh, setRefresh] = useState(true);

  const debouncedOnChange = useCallback(
    debounce((e, val) => handleChange(e, val), 180),
    []
  );

  const handleChange = (e, value) => {
    if (onChange) onChange(e, value);
  };

  const forceRefresh = () => setRefresh(!refresh);

  const onValueChange = (valueObject, eventObject) => {
    var triggerRefresh = false;
    var _value = valueObject.floatValue || 0;

    if (_value === -0) {
      triggerRefresh = true;
      _value = 0;
    }

    if (_value === undefined) {
      triggerRefresh = true;
      _value = 0;
    }

    if (_value > Number.MAX_SAFE_INTEGER) {
      _value = Number.MAX_SAFE_INTEGER;
      triggerRefresh = true;
    }

    if (_value < Number.MIN_SAFE_INTEGER) {
      _value = Number.MIN_SAFE_INTEGER;
      triggerRefresh = true;
    }

    setInputValue(_value);

    if (_value !== inputValue) debouncedOnChange(eventObject.event, _value);

    if (triggerRefresh) forceRefresh();
  };

  const getDecimalScale = () => {
    if (decimalScale < 0) return 0;
    if (decimalScale > 17) return 17;
  };

  return (
    <Container {...{ theme, size, color, disabled, readOnly }}>
      <NumberFormat
        disabled={disabled}
        readOnly={readOnly}
        ref={ref}
        prefix={prefix}
        thousandSeparator={thousandSeparator}
        decimalSeparator={decimalSeparator}
        decimalScale={getDecimalScale()}
        fixedDecimalScale={fixedDecimalScale}
        allowNegative={allowNegative}
        value={inputValue}
        defaultValue={defaultValue}
        onFocus={onFocus}
        onBlur={(e) => {
          if (inputValue === 0 && e.target.value.includes("-")) forceRefresh();
          if (onBlur) onBlur(e);
        }}
        onValueChange={onValueChange}
      />
    </Container>
  );
});

DecimalInput.defaultProps = {
  id: "",
  value: 0,
  defaultValue: 0,
  disabled: false,
  readOnly: false,
  debounceTime: 180,
  prefix: "",
  thousandSeparator: ".",
  decimalSeparator: ",",
  decimalScale: 2,
  fixedDecimalScale: true,
  allowNegative: true,
  //----------------
  onChange: () => {},
  onKeyDown: () => {},
  onBlur: () => {},
  onFocus: () => {},
  //----------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
};

DecimalInput.propTypes = {
  id: PropTypes.string,
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  debounceTime: PropTypes.number,
  prefix: PropTypes.string,
  thousandSeparator: PropTypes.oneOf([".", ",", " "]),
  decimalSeparator: PropTypes.oneOf([".", ","]),
  decimalScale: PropTypes.number,
  fixedDecimalScale: PropTypes.bool,
  allowNegative: PropTypes.bool,
  //----------------
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
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

export default DecimalInput;
