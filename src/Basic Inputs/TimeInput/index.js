import React, { useEffect, useCallback, useState } from "react";
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

const paddingBySize = (size) => {
  return {
    small: "0.41875rem 0.5rem",
    medium: "0.48125rem 0.6rem",
    large: "0.65625rem 0.7rem",
  }[size];
};

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
  padding: 0.75rem 0.625rem 0.75rem 0.625rem;
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
        props.disabled ? "disabled" : "enabled",
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
    ${(props) => (props.readOnly == false ? getOutlineCss(props.theme) : "")};
    color: ${(props) =>
      getColorRgbaValue(props.theme, "Input", "primary", "enabled", "text")};
    border: 1px solid
      ${(props) =>
        getColorRgbaValue(
          props.theme,
          "Input",
          "primary",
          props.disabled ? "disabled" : "enabled",
          "border"
        )};
  }
`;

const TimeInput = React.forwardRef((props, ref) => {
  const {
    id,
    disabled,
    readOnly,
    value,
    debounceTime,
    type,
    tabIndex,
    //----------------
    onChange,
    //----------------
    className,
    style,
    size,
    color,
    ...rest
  } = props;

  //
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
    <SyledInput
      type="time"
      id={id}
      ref={ref}
      value={inputValue}
      onChange={onValueChange}
      disabled={disabled}
      readOnly={readOnly}
      theme={theme}
      color={color}
      size={size}
      className={className}
      style={style}
      tabIndex={tabIndex}
      {...rest}
    />
  );
});

TimeInput.defaultProps = {
  id: "",
  value: "",
  disabled: false,
  readOnly: false,
  debounceTime: 180,
  tabIndex: 0,
  //----------------
  onChange: () => {},
  //----------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
};

TimeInput.propTypes = {
  id: PropTypes.string,
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
    "neutral"
  ]),
};

export default TimeInput;
