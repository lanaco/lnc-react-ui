import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import NumberFormat from "react-number-format";
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

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  ${(props) => standardCssFields(props)}

  & input {
    padding: ${(props) => paddingBySize(props.size)};
    background-color: ${(props) => props.theme.test_palette.light[100]};
    color: ${(props) => props.theme.test_palette.dark[500]};
    border: 0.09375rem solid ${(props) => props.theme.test_palette.light[500]};

    min-height: inherit;
    max-height: inherit;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    appearance: none;
    outline: none;
    display: inline-block;
    border-radius: 0.25rem;
    width: 100%;
    box-sizing: border-box;

    &:disabled {
      border: 0.09375rem solid ${(props) => props.theme.test_palette.light[400]};
      color: ${(props) => props.theme.test_palette.light[500]};
      cursor: default;
    }

    &:hover:enabled {
      border: 0.09375rem solid
        ${(props) => props.theme.test_palette[props.color][400]};
    }

    &:focus:enabled {
      border: 0.09375rem solid
        ${(props) => props.theme.test_palette[props.color][400]};
      box-shadow: 0px 0px 0.375rem -0.125rem ${(props) => props.theme.test_palette[props.color][400]};
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

  useEffect(() => setInputValue(value), [value]);

  const debouncedOnChange = useCallback(
    debounce((e, val) => handleChange(e, val), debounceTime),
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

    return decimalScale;
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
        {...rest}
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
    "danger",
    "warning",
    "info",
  ]),
};

export default DecimalInput;
