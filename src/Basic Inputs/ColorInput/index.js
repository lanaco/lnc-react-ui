import React, { useEffect, useState } from "react";
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

const getSize = (theme, size) => {
  let componentSize = getSizeValueWithUnits(theme, size);
  return `calc(${componentSize} - 1rem)`;
};

const StyledInput = styled.label`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  ${(props) =>
    getComponentTypographyCss(props.theme, "Input", "small", "enabled")};
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
  &:focus {
    ${(props) => !props.disabled && getOutlineCss(props.theme)}
  }
  ${(props) => props.disabled && getDisabledBackgroundCss(props.theme)}
  border: 1px solid ${(props) =>
    getColorRgbaValue(props.theme, "Input", props.color, "disabled", "border")};
`;

const StyledColorInput = styled.div`
  min-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
  max-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  & div {
    &:focus {
      ${(props) =>
        !props.disabled && !props.withInput && getOutlineCss(props.theme)};
    }
    &:hover {
      ${(props) =>
        !props.disabled && !props.withInput && getOutlineCss(props.theme)};
    }

    ${(props) =>
      props.disabled &&
      `opacity: ${
        props.theme.palette.opacity[props.theme.palette.disabled.opacity]
      };`}
    box-sizing: border-box;
    width: ${(props) => getSize(props.theme, props.size)};
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
      ${(props) => props.disabled && getDisabledStateCss(props.theme)};
    }
  }
`;

const LabelText = styled.span`
  display: flex;
  align-items: center;
`;

const ColorInput = React.forwardRef((props, ref) => {
  const {
    id,
    name,
    value,
    size,
    tabIndex,
    withInput,
    className,
    style,
    color,
    readOnly,
    disabled,
    onChange,
    onFocus,
    onBlur,
    preventDefault,
    inputRef,
    inputProps,
    ...rest
  } = props;
  const theme = useTheme();

  const [val, setVal] = useState(value);

  useEffect(() => {
    setVal(value);
  }, [value]);

  const handleOnChange = (e) => {
    if (preventDefault) e.preventDefault();

    setVal(e.target.value);
    if (onChange) onChange(id, e.target.value);
  };

  return (
    <StyledColorInput
      ref={ref}
      theme={theme}
      size={size}
      className={className}
      style={style}
      disabled={disabled}
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
          tabIndex={tabIndex}
        >
          <div>
            <input
              type="color"
              ref={inputRef}
              id={id}
              name={name}
              value={val}
              disabled={disabled || readOnly}
              onChange={readOnly ? () => {} : handleOnChange}
              onBlur={readOnly ? () => {} : onBlur}
              onFocus={readOnly ? () => {} : onFocus}
              color={color}
              {...inputProps}
            />
          </div>
          <LabelText>{val}</LabelText>
        </StyledInput>
      ) : (
        <div>
          <input
            type="color"
            ref={inputRef}
            id={id}
            name={name}
            value={val}
            disabled={disabled || readOnly}
            onChange={readOnly ? () => {} : handleOnChange}
            onBlur={readOnly ? () => {} : onBlur}
            onFocus={readOnly ? () => {} : onFocus}
            color={color}
            tabIndex={tabIndex}
            {...inputProps}
          />
        </div>
      )}
    </StyledColorInput>
  );
});

ColorInput.defaultProps = {
  disabled: false,
  readOnly: false,
  tabIndex: 0,
  preventDefault: true,
  withInput: false,
  //-------------------------
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  //-------------------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
};

ColorInput.propTypes = {
  id: PropTypes.any,
  name: PropTypes.string,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  tabIndex: PropTypes.number,
  preventDefault: PropTypes.bool,
  inputRef: PropTypes.bool,
  inputProps: PropTypes.bool,
  withInput: PropTypes.bool,
  //---------------------------------------------------------------
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
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
    "info",
  ]),
};

export default ColorInput;
