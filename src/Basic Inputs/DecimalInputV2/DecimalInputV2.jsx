/* eslint-disable react/display-name */
import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";
import { forwardRef, useEffect, useRef, useState } from "react";
import { StyledPrefix, StyledSuffix, StyledWrapper } from "./styledComponents";

//===================================================

const DecimalInputV2 = forwardRef((props, ref) => {
  //
  const {
    disabled,
    readOnly,
    // debounceTime = 0,
    prefix,
    suffix,
    decimalSeparator = ",",
    decimalScale = 2,
    allowNegative = true,
    // //----------------
    onKeyDown = () => {},
    onBlur = () => {},
    onFocus = () => {},
    onChange = () => {},
    value,
    //----------------
    className = "",
    style = {},
    size = "small",
    color = "primary",
    onInputChange = () => {},
    ...rest
  } = props;
  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  const convertToString = (value) => {
    if (!isNaN(+value)) {
      const numbersArray = value?.toString()?.split(".");

      if (!numbersArray?.length > 0) {
        return "0" + decimalSeparator + new Array(decimalScale + 1).join("0");
      }

      if (numbersArray?.length === 1) {
        return (
          numbersArray.at(0) +
          decimalSeparator +
          new Array(decimalScale + 1).join("0")
        );
      }

      if (numbersArray?.length > 1) {
        let afterScale = numbersArray?.at(1)?.toString();
        if (afterScale?.length === decimalScale) {
          return numbersArray.at(0) + decimalSeparator + afterScale;
        } else if (afterScale?.length < decimalScale) {
          return (
            numbersArray.at(0) +
            decimalSeparator +
            numbersArray.at(1) +
            new Array(decimalScale - afterScale.length + 1).join("0")
          );
        } else if (afterScale?.length > decimalScale) {
          return (
            numbersArray.at(0) +
            decimalSeparator +
            afterScale.slice(0, decimalScale)
          );
        }
      }
    }

    return "0" + decimalSeparator + new Array(decimalScale + 1).join("0");
  };

  const defaultValue = convertToString(value);

  const [val, setVal] = useState(defaultValue);
  const valRef = useRef(defaultValue);

  useEffect(() => {
    const convertedVal = convertToString(value);

    valRef.current = convertedVal;
    setVal(valRef.current);
  }, [value]);

  const handleFocus = (e) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setFocused(false);
    onBlur?.(e);
  };

  //   const handleChange = (e) => {
  //     const lastCharacter = e?.target?.value?.slice(-1);

  //     if(lastCharacter === "-") {

  //     }

  //     if(!isNaN(lastCharacter)) {

  //     }

  //     if (
  //       lastCharacter === "-" &&
  //       e?.target?.value?.length > 0 &&
  //       allowNegative === true &&
  //       valRef?.current >= 0
  //     ) {
  //       valRef.current = valRef?.current * -1;

  //       setVal(valRef?.current);

  //       return;
  //     }

  //     if (isNaN(e?.target?.value)) return;

  //     valRef.current = e?.target?.value;
  //     setVal(valRef?.current);
  //   };

  const handleKeyDown = (e) => {
    let fullStr = valRef.current?.replace(decimalSeparator, "");

    if (e.key === "Delete" || e.key === "Backspace") {
      if (+fullStr !== 0) {
        fullStr = fullStr.slice(0, fullStr?.length - 1);

        let afterDecimalScale = fullStr.slice(
          0,
          fullStr?.length - decimalScale
        );
        let beforeDecimalScale = fullStr.slice(fullStr?.length - decimalScale);

        if (afterDecimalScale?.length === 0) {
          afterDecimalScale = "0";
        } else if (afterDecimalScale === "-" && +fullStr !== 0) {
          afterDecimalScale = "-0";
        } else if (afterDecimalScale === "-" && +fullStr === 0) {
          afterDecimalScale = "0";
        }

        let output = [
          afterDecimalScale,
          decimalSeparator,
          beforeDecimalScale,
        ].join("");

        valRef.current = output;

        setVal(valRef.current);
      }
    } else if (e.key === "-" && allowNegative === true && +fullStr !== 0) {
      if (valRef?.current?.slice(1) === "-") {
        valRef.current = valRef.current.slice(1, valRef.current.length);
      } else {
        valRef.current = "-" + valRef.current;
      }
      setVal(valRef.current);
    } else if (!isNaN(e.key)) {
      fullStr = fullStr + e.key;

      let afterDecimalScale = fullStr.slice(0, fullStr?.length - decimalScale);
      let beforeDecimalScale = fullStr.slice(fullStr?.length - decimalScale);

      if (afterDecimalScale?.length > 1) {
        afterDecimalScale = afterDecimalScale.replace(/^0+/, "");

        if (afterDecimalScale?.length === 0) {
          afterDecimalScale = "0";
        }
      }

      let output = [
        afterDecimalScale,
        decimalSeparator,
        beforeDecimalScale,
      ].join("");

      valRef.current = output;

      setVal(valRef.current);
    }

    onKeyDown(e);
  };

  const handleChange = (e) => {
    e.target.value = valRef.current;

    onInputChange(e, valRef?.current)
    onChange(e, valRef?.current);
  };

  return (
    <StyledWrapper
      style={style}
      className={className}
      theme={theme}
      color={color}
      size={size}
      prefix={prefix}
      suffix={suffix}
      focused={focused}
      disabled={disabled}
      readOnly={readOnly}
    >
      {prefix && (
        <StyledPrefix
          theme={theme}
          color={color}
          focused={focused}
          className="lnc-input-prefix"
        >
          {prefix}
        </StyledPrefix>
      )}

      <input
        ref={ref}
        type="text"
        {...rest}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        value={val}
        className="lnc-ui-decimal-v2-input"
        onFocus={handleFocus}
        disabled={disabled || readOnly}
        onChange={handleChange}
      />

      {suffix && (
        <StyledSuffix
          theme={theme}
          color={color}
          focused={focused}
          className="lnc-input-suffix"
        >
          {suffix}
        </StyledSuffix>
      )}
    </StyledWrapper>
  );
});

DecimalInputV2.propTypes = {
  id: PropTypes.string,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  debounceTime: PropTypes.number,
  /**
   * Reserved space before input. Intented to be used with plain text or `Icon` component.
   */
  prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /**
   * Reserved space after input. Intented to be used with plain text or `Icon` component.
   */
  suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  thousandSeparator: PropTypes.oneOf([".", ",", " "]),
  decimalSeparator: PropTypes.oneOf([".", ","]),
  decimalScale: PropTypes.number,
  fixedDecimalScale: PropTypes.bool,
  allowNegative: PropTypes.bool,
  //----------------
  /**
   * `(event, value) => void`
   */
  onChange: PropTypes.func,
  /**
   * `(event, value) => void`
   */
  onInputChange: PropTypes.func,
  /**
   * `(event) => void`
   */
  onBlur: PropTypes.func,
  /**
   * `(event) => void`
   */
  onFocus: PropTypes.func,
  /**
   * `(event) => void`
   */
  onKeyDown: PropTypes.func,
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
    "information",
    "neutral",
    "gray",
  ]),
};

export default DecimalInputV2;
