/* eslint-disable react/display-name */
import { forwardRef, useCallback, useState } from "react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import {
  getBorderRadiusValueWithUnits,
  getColorRgbaValue,
  getComponentTypographyCss,
  getDisabledBackgroundCss,
  getDisabledStateCss,
  getOutlineCss,
  getSizeValueWithUnits,
} from "../../_utils/utils";
import debounce from "lodash.debounce";
import { useUpdateEffect } from "react-use";

const getSize = (theme, size) => {
  let componentSize = getSizeValueWithUnits(theme, size);
  return `calc(${componentSize} - 1rem)`;
};

const StyledInput = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  ${(props) =>
    getComponentTypographyCss(props.theme, "Input", props.size, "enabled")};
  min-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
  max-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
  background-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Input",
      props.color,
      "enabled",
      "background"
    )};
  color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Input",
      props.isFocused ? "primary" : props.color,
      "enabled",
      "text"
    )};
  border: 1px solid
    ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Input",
        props.isFocused ? "primary" : props.color,
        "enabled",
        "border"
      )};
  border-radius: ${(props) =>
    getBorderRadiusValueWithUnits(props.theme, "regular")};
  padding: 0.625rem 0.75rem;
  width: 100%;
  ${(props) =>
    !props.disabled === true &&
    props.readOnly !== true &&
    props.isFocused === true &&
    getOutlineCss(props.theme)};
  /* ${(props) =>
    props.disabled === true && getDisabledBackgroundCss(props.theme)} */
  ${(props) =>
    props.disabled === true &&
    `background-color: ${getColorRgbaValue(
      props.theme,
      "Input",
      props.color,
      "disabled",
      "background",
      "backgroundOpacity"
    )};
        color: ${(props) =>
          getColorRgbaValue(
            props.theme,
            "Input",
            props.color,
            "disabled",
            "text"
          )};`}
  border: 1px solid ${(props) =>
    getColorRgbaValue(props.theme, "Input", props.color, "disabled", "border")};
`;

const StyledColorInput = styled.div`
  ${(props) =>
    !props.disabled === true && props.readOnly !== true && "cursor: pointer;"}
  min-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
  max-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  ${(props) => props.withInput == true && "width: 100%;"}
  & div {
    &:focus {
      ${(props) =>
        props.disabled !== true &&
        props.withInput !== true &&
        props.readOnly !== true &&
        getOutlineCss(props.theme)};
    }
    &:hover {
      ${(props) =>
        !props.disabled === true &&
        !props.withInput &&
        props.readOnly !== true &&
        getOutlineCss(props.theme)};
    }
    ${(props) =>
      props.disabled === true &&
      `opacity: ${
        props.theme.palette.opacity[props.theme.palette.disabled.opacity]
      };`}
    box-sizing: border-box;
    min-width: ${(props) => getSize(props.theme, props.size)};
    height: ${(props) => getSize(props.theme, props.size)};
    border-radius: ${(props) =>
      getBorderRadiusValueWithUnits(props.theme, "curved")};
    overflow: hidden;
    & input[type="color"] {
      border: 0;
      padding: 0;
      width: 200%;
      height: 200%;
      cursor: pointer;
      transform: translate(-25%, -25%);
      /* ${(props) =>
        props.disabled === true && getDisabledStateCss(props.theme)}; */
      ${(props) =>
        props.disabled === true &&
        `background-color: ${getColorRgbaValue(
          props.theme,
          "Input",
          props.color,
          "disabled",
          "background",
          "backgroundOpacity"
        )};
        color: ${(props) =>
          getColorRgbaValue(
            props.theme,
            "Input",
            props.color,
            "disabled",
            "text"
          )};`}
    }
  }
`;

const LabelText = styled.span`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 100%;
  & input {
    outline: none;
    border: none;
    background-color: transparent;
    width: 100%;
  }
`;

const ColorInput = forwardRef((props, ref) => {
  const {
    id,
    name,
    defaultValue = "#000000",
    value,
    size = "small",
    tabIndex,
    withInput = false,
    className = "",
    style = {},
    color = "primary",
    debounceTime = 0,
    readOnly,
    disabled,
    onChange = () => {},
    onFocus = () => {},
    onBlur = () => {},
    onInput = () => {},
    onKeyDown = () => {},
    labelRef,
    inputProps,
    ...rest
  } = props;
  const theme = useTheme();

  const [val, setVal] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const validHexRegex = new RegExp(/^#[0-9A-F]{6}$/i);

  useUpdateEffect(() => setVal(value), [value]);

  const debouncedOnChange = useCallback(
    debounce((e, val) => handleChange(e, val), debounceTime),
    [onChange]
  );

  const handleChange = (e, value) => {
    if (onChange) onChange(e, value);
  };

  const onValueChange = (e) => {
    if (value) setVal(e.target.value);
    debouncedOnChange(e, e.target.value);
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus(e);
  };

  const handleBlur = (e) => {
    if (!validHexRegex.test(val)) setVal(defaultValue);
    setIsFocused(false);
    onBlur(e);
  };

  return (
    <StyledColorInput
      ref={ref}
      theme={theme}
      size={size}
      className={className}
      style={style}
      disabled={disabled}
      readOnly={readOnly}
      withInput={withInput}
      {...rest}
    >
      {withInput ? (
        <StyledInput
          withInput={withInput}
          theme={theme}
          color={color}
          size={size}
          disabled={disabled}
          readOnly={readOnly}
          tabIndex={tabIndex}
          isFocused={isFocused}
        >
          <div>
            <input
              type="color"
              ref={ref}
              id={id}
              name={name}
              value={val}
              disabled={disabled || readOnly}
              onChange={onValueChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              color={color}
              {...inputProps}
            />
          </div>
          <LabelText>
            {
              <input
                ref={labelRef}
                value={val}
                onChange={onValueChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onInput={onInput}
                onKeyDown={onKeyDown}
                disabled={disabled || readOnly}
                {...rest}
              />
            }
          </LabelText>
        </StyledInput>
      ) : (
        <div>
          {value == null || value == "undefined" ? (
            <input
              type="color"
              ref={ref}
              id={id}
              name={name}
              defaultValue={defaultValue}
              disabled={disabled || readOnly}
              onChange={onValueChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              color={color}
              tabIndex={tabIndex}
              {...inputProps}
            />
          ) : (
            <input
              type="color"
              ref={ref}
              id={id}
              name={name}
              value={val}
              disabled={disabled || readOnly}
              onChange={onValueChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              color={color}
              tabIndex={tabIndex}
              {...inputProps}
            />
          )}
        </div>
      )}
    </StyledColorInput>
  );
});

// ColorInput.defaultProps = {
//   debounceTime: 180,
//   disabled: false,
//   readOnly: false,
//   tabIndex: 0,
//   preventDefault: true,
//   withInput: false,
//   defaultValue: "#000000",
//   //-------------------------
//   onChange: () => {},
//   onBlur: () => {},
//   onFocus: () => {},
//   onInput: () => {},
//   onKeyDown: () => {},
//   //-------------------------
//   className: "",
//   style: {},
//   size: "small",
//   color: "primary",
// };

ColorInput.propTypes = {
  id: PropTypes.any,
  name: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  debounceTime: PropTypes.number,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  tabIndex: PropTypes.number,
  preventDefault: PropTypes.bool,
  labelRef: PropTypes.any,
  inputProps: PropTypes.bool,
  withInput: PropTypes.bool,
  //---------------------------------------------------------------
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onInput: PropTypes.func,
  onKeyDown: PropTypes.func,
  //---------------------------------------------------------------
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

export default ColorInput;
