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
  align-items: center;
  justify-content: start;
  flex-direction: ${(props) => getLabelDirection(props.labelPosition)};
  width: 100%;
  ${(props) => props.disabled && "pointer-events: none;"}
  ${(props) =>
    getComponentTypographyCss(props.theme, "Checkbox", props.size, "enabled")};
  gap: 0.75rem;

  position: relative;
  & input {
    // clip: rect(0 0 0 0);
    // clip-path: inset(50%);
    // height: 1px;
    // overflow: hidden;
    // position: absolute;
    // white-space: nowrap;
    // width: 1px;

    cursor: ${(props) => (props.disabled ? "default" : "pointer")};
    position: absolute;
    opacity: 0;
    height: 100%;
    width: 100%;
  }

  & .checkbox-label {
    ${(props) =>
      !props.disabled && props.readOnly == false && "cursor: pointer;"}
  }
`;

const Checkmark = styled.div`
${(props) => !props.disabled && props.readOnly == false && "cursor: pointer;"}
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
${(props) =>
  props.disabled &&
  `background-color: ${getColorRgbaValue(
    props.theme,
    "Checkbox",
    props.color,
    "disabled",
    "border"
  )}`};


  ${(props) =>
    props.focused && !props.disabled && !props.readOnly
      ? getOutlineCss(props.theme)
      : ""}

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
    name,
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

  const [focused, setFocused] = useState(false);
  const theme = useTheme();
  var themeProps = { theme, size, color, disabled, readOnly, focused };

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

    // if (onClick) onClick(e);

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
    setFocused(false);
    if (onBlur) onBlur(e);
  };

  const handleOnFocus = (e) => {
    setFocused(true);
    if (onFocus) onFocus(e);
  };

  return (
    <CheckboxContainer
      direction={labelPosition}
      className={className}
      style={style}
      label={label}
      labelPosition={labelPosition}
      tabIndex={-1}
      disabled={true}
      {...themeProps}
    >
      <Checkmark
        {...themeProps}
        checked={checkBoxChecked}
        indeterminate={indeterminateState}
        // onClick={handleClick}
        tabIndex={-1}
        aria-hidden={true}
        // {...rest}
      >
        {checkBoxChecked && !customCheckmark && !indeterminateState && (
          <svg
            viewBox="0 0 8 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="white"
            aria-hidden={true}
            disabled={true}
            tabIndex={-1}
          >
            <path
              d="M1 3.15385L2.89474 5L7 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              tabIndex={-1}
            />
          </svg>
        )}
        {indeterminateState && (
          <svg
            width="8"
            height="2"
            viewBox="0 0 8 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden={true}
            disabled={true}
            tabIndex={-1}
          >
            <path
              d="M1 1H7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              tabIndex={-1}
            />
          </svg>
        )}
        {customCheckmark && checkBoxChecked && !indeterminate && (
          <>{customCheckmark}</>
        )}
      </Checkmark>

      {label && (
        <div
          // onClick={handleClick}
          className="checkbox-label"
          disabled={disabled}
          readOnly={readOnly}
          tabIndex={-1}
        >
          {label}
        </div>
      )}

      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checkBoxChecked}
        onChange={handleClick}
        ref={ref}
        tabIndex={tabIndex}
        // onKeyDown={handleOnKeyDown}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
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
  id: PropTypes.string,
  name: PropTypes.string,
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
    "information",
    "neutral",
  ]),
  inputProps: PropTypes.object,
};

export default CheckBoxInput;
