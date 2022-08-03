import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  getBorderRadiusValueWithUnits,
  getColorRgbaValue,
  getComponentTypographyCss,
  getDisabledBackgroundCss,
  getOutlineCss,
  getSizeValueWithUnits,
} from "../../_utils/utils";

const getLabelDirection = (direction) => {
  if (direction == "left") return "row-reverse";

  return "row";
};

const getCheckSize = (theme, size) => {
  return `calc(${theme.components.Checkbox.default.enabled.sizes[size]} / 2)`;
};

const CheckboxContainer = styled.label`
  min-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
  max-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  column-direction: ${(props) => getLabelDirection(props.labelPosition)};

  ${(props) => props.disabled && "pointer-events: none;"}
  ${(props) =>
    getComponentTypographyCss(props.theme, "Checkbox", props.size, "enabled")};
  gap: 0.75rem;
  cursor: pointer;
  & input {
    display: none;
  }
`;

const Checkmark = styled.div`
height: ${(props) =>
  props.theme.components.Checkbox.default.enabled.sizes[props.size]};
width: ${(props) =>
  props.theme.components.Checkbox.default.enabled.sizes[props.size]};
display: flex;
justify-content: center;
align-items: center;
transition: all 0.2s ease;

background-color: ${(props) =>
  props.checked || props.indeterminate
    ? getColorRgbaValue(
        props.theme,
        "Checkbox",
        props.color,
        "active",
        "background",
        "backgroundOpacity"
      )
    : "transparent"};
color: ${(props) =>
  getColorRgbaValue(props.theme, "Checkbox", props.color, "enabled", "text")};
border: 1px solid 
  ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Checkbox",
      props.color,
      props.checked || props.indeterminate
        ? props.disabled
          ? "disabled"
          : "active"
        : "enabled",
      "border"
    )};
border-radius: ${(props) =>
  getBorderRadiusValueWithUnits(props.theme, "slight")};
  
${(props) => props.disabled && getDisabledBackgroundCss(props.theme)}

  &:focus {
    ${(props) => (!props.disabled && !props.readOnly) && getOutlineCss(props.theme)}
  }

  & svg {
    height: ${(props) => getCheckSize(props.theme, props.size)};
    width: ${(props) => getCheckSize(props.theme, props.size)};
  }

  & img {
    max-height: ${(props) => getCheckSize(props.theme, props.size)};
    max-width: ${(props) => getCheckSize(props.theme, props.size)};
    filter: brightness(0) invert(1);
  } 

}`;

const CheckBoxInput = React.forwardRef((props, ref) => {
  const {
    id,
    checked,
    indeterminate,
    disabled,
    readOnly,
    label,
    labelPosition,
    tabIndex,
    customCheckmark,
    //----------------
    onChange,
    onFocus,
    onBlur,
    onClick,
    onKeyDown,
    //----------------
    color,
    size,
    className,
    style,
    inputRef,
    inputProps,
    children,
    ...rest
  } = props;

  const theme = useTheme();
  var themeProps = { theme, size, color };

  const [checkBoxChecked, setCheckBoxChecked] = useState(checked);
  const [indeterminateState, setIndeterminateState] = useState(indeterminate);

  useEffect(() => {
    setCheckBoxChecked(checked);
  }, [checked]);

  useEffect(() => {
    setIndeterminateState(indeterminate);
  }, [indeterminate]);

  const handleClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    if (onClick) onClick(e);

    if (readOnly || disabled) return;
    if (indeterminateState) setIndeterminateState(false);

    setCheckBoxChecked(!checkBoxChecked);
    if (onChange) onChange(e, !checkBoxChecked);
  };

  const handleOnKeyDown = (e) => {
    if (e.code === "Space") {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

      if (readOnly || disabled) return;
      if (indeterminateState) setIndeterminateState(false);

      setCheckBoxChecked(!checkBoxChecked);
      if (onChange) onChange(e, !checkBoxChecked);
    }
    if (onKeyDown) onKeyDown(e);
  };

  const handleOnBlur = (e) => {
    if (onBlur) onBlur(e);
  };

  const handleOnFocus = (e) => {
    if (onFocus) onFocus(e);
  };

  return (
    <CheckboxContainer
      direction={labelPosition}
      disabled={disabled}
      ref={ref}
      className={className}
      style={style}
      label={label}
      labelPosition={labelPosition}
      {...themeProps}
    >
      <Checkmark
        {...themeProps}
        checked={checkBoxChecked}
        indeterminate={indeterminateState}
        disabled={disabled}
        onClick={handleClick}
        tabIndex={tabIndex}
        onKeyDown={handleOnKeyDown}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        {...rest}
      >
        {checkBoxChecked &&
          !customCheckmark &&
          !disabled &&
          !indeterminateState && (
            <svg
              viewBox="0 0 8 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="white"
            >
              <path
                d="M1 3.15385L2.89474 5L7 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        {indeterminateState && !disabled && (
          <svg
            width="8"
            height="2"
            viewBox="0 0 8 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1H7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {customCheckmark && checkBoxChecked && !disabled && !indeterminate && (
          <>{customCheckmark}</>
        )}
      </Checkmark>
      <div onClick={handleClick}>{label}</div>
      <input
        ref={inputRef}
        type="checkbox"
        checked={checkBoxChecked}
        disabled={disabled}
        readOnly={readOnly}
        onChange={() => {}}
        {...inputProps}
      />
    </CheckboxContainer>
  );
});

CheckBoxInput.defaultProps = {
  id: "",
  checked: false,
  disabled: false,
  readOnly: false,
  label: "",
  indeterminate: false,
  labelPosition: "right",
  tabIndex: 0,
  //-------------------------
  onChange: (e, value) => {},
  onBlur: () => {},
  onFocus: () => {},
  onClick: () => {},
  onKeyDown: () => {},
  //-------------------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
  inputProps: {},
};

CheckBoxInput.propTypes = {
  id: PropTypes.any,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  label: PropTypes.string,
  indeterminate: PropTypes.bool,
  labelPosition: PropTypes.oneOf(["right", "left"]),
  tabIndex: PropTypes.number,
  customCheckmark: PropTypes.element,
  //---------------------------------------------------------------
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
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
    "info",
  ]),
  inputProps: PropTypes.object,
};

export default CheckBoxInput;
