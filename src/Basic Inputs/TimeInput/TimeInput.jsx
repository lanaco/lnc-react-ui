import React, { useCallback, useState, useEffect } from "react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import {
  getBorderRadiusValueWithUnits,
  getColorRgbaValue,
  getComponentTypographyCss,
  getDisabledStateCss,
  getOutlineCss,
  getSizeValueWithUnits,
} from "../../_utils/utils";

const standardCssFields = ({ theme, size }) => {
  var height = getSizeValueWithUnits(theme, size);

  return `
    min-height: ${height};
    max-height: ${height};
  `;
};

const SyledInput = styled.input`
  ${(props) => standardCssFields(props)}
  ${(props) =>
    getComponentTypographyCss(props.theme, "Input", props.size, "enabled")}
  padding: 0.625rem 0.75rem 0.62rem 0.75rem;
  line-height: inherit;
  appearance: none;
  outline: none;
  display: inline-block;
  border-radius: 0.25rem;
  width: 100%;
  box-sizing: border-box;
  background-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Input",
      props.color,
      "enabled",
      "background"
    )};
  border: 1px solid
    ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Input",
        props.color,
        props.disabled === true ? "disabled" : "enabled",
        "border"
      )};
  border-radius: ${(props) =>
    getBorderRadiusValueWithUnits(props.theme, "regular")};
  color: ${(props) =>
    getColorRgbaValue(props.theme, "Input", props.color, "enabled", "text")};
  &:disabled {
    ${(props) => getDisabledStateCss(props.theme)};
    cursor: default;
  }
  &:focus:enabled {
    border: none;
    ${(props) => (props.readOnly !== true ? getOutlineCss(props.theme) : "")};
    color: ${(props) =>
      getColorRgbaValue(props.theme, "Input", "primary", "enabled", "text")};
    border: 1px solid
      ${(props) =>
        getColorRgbaValue(
          props.theme,
          "Input",
          "primary",
          props.disabled === true ? "disabled" : "enabled",
          "border"
        )};
  }
`;

const TimeInput = React.forwardRef((props, ref) => {
  const {
    // id,
    disabled,
    readOnly,
    defaultValue,
    value,
    debounceTime = 180,
    // tabIndex,
    //----------------
    onChange,
    //----------------
    className = "",
    style = {},
    size = "small",
    color = "primary",
    ...rest
  } = props;

  const theme = useTheme();
  const [inputValue, setInputValue] = useState(value || defaultValue || "");

  useEffect(() => {
    if (value !== null && value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const debouncedOnChange = useCallback(
    debounce((e, val) => handleChange(e, val), debounceTime),
    [onChange]
  );

  const handleChange = (e, value) => {
    if (onChange) onChange?.(e, value);
  };

  const onValueChange = (e) => {
    setInputValue(e.target.value);
    debouncedOnChange(e, e.target.value);
  };

  return (
    <>
      <SyledInput
        type="time"
        ref={ref}
        onChange={onValueChange}
        disabled={disabled}
        readOnly={readOnly}
        theme={theme}
        color={color}
        size={size}
        className={className}
        style={style}
        value={inputValue}
        {...rest}
      />
    </>
  );
});

// TimeInput.defaultProps = {
//   id: "",
//   disabled: false,
//   readOnly: false,
//   debounceTime: 180,
//   tabIndex: 0,
//   defaultValue: "",
//   //----------------
//   onChange: () => {},
//   //----------------
//   className: "",
//   style: {},
//   size: "small",
//   color: "primary",
// };

TimeInput.propTypes = {
  id: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  debounceTime: PropTypes.number,
  tabIndex: PropTypes.number,
  //----------------
  onChange: PropTypes.func,
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

export default TimeInput;
