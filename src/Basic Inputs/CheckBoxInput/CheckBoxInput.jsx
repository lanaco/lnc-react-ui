/* eslint-disable react/display-name */
import { forwardRef } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  getBorderRadiusValueWithUnits,
  getColorRgbaValue,
  getComponentTypographyCss,
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

const Container = styled.label`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  min-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
  max-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
  display: inline-flex;
  align-items: center;
  justify-content: start;
  flex-direction: ${(props) => getLabelDirection(props.labelPosition)};
  ${(props) => props.spaceBetween == true && "justify-content: space-between;"}
  width: 100%;
  ${(props) => props.disabled === true && "pointer-events: none;"}
  ${(props) =>
    getComponentTypographyCss(props.theme, "Checkbox", props.size, "enabled")};
  gap: 0.75rem;
  position: relative;
  & .checkbox-label {
    ${(props) =>
      !props.disabled === true && props.readOnly !== true && "cursor: pointer;"}
    min-width: 0;
    flex-shrink: 1;
    min-height: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Checkbox",
        props.color,
        "enabled",
        "text"
      )};
  }
  & input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 100%;
    width: 100%;
    z-index: 3;
  }
  & input:focus {
    outline: none;
    background: transparent;
  }
  & input:active {
    outline: none;
    background: transparent;
  }
  & .checkmark {
    min-height: ${(props) =>
      props.theme.components.Checkbox.default.enabled.sizes[props.size]};
    min-width: ${(props) =>
      props.theme.components.Checkbox.default.enabled.sizes[props.size]};
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease;
    background-color: transparent;
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Checkbox",
        props.color,
        "enabled",
        "text"
      )};
    border: 1px solid
      ${(props) =>
        getColorRgbaValue(
          props.theme,
          "Checkbox",
          props.color,
          "enabled",
          "border"
        )};
    border-radius: ${(props) =>
      getBorderRadiusValueWithUnits(props.theme, "slight")};
    ${(props) =>
      props.disabled === true &&
      `background-color: ${getColorRgbaValue(
        props.theme,
        "Checkbox",
        props.color,
        "disabled",
        "border"
      )}`};
    & svg {
      height: 0;
      width: 0;
      stroke: transparent;
    }
    & img {
      max-height: 0;
      max-width: 0;
      filter: brightness(0) invert(1);
    }
  }
  & input:checked ~ .checkmark {
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Checkbox",
        props.color,
        "active",
        "background",
        "backgroundOpacity"
      )};
    border: 1px solid
      ${(props) =>
        getColorRgbaValue(
          props.theme,
          "Checkbox",
          props.color,
          "active",
          "border"
        )};
    & .checked {
      height: ${(props) => getCheckSize(props.theme, props.size)};
      width: ${(props) => getCheckSize(props.theme, props.size)};
      stroke: white;
    }
    & .indeterminate {
      height: 0;
      width: 0;
    }
    & img {
      max-height: ${(props) => getCheckSize(props.theme, props.size)};
      max-width: ${(props) => getCheckSize(props.theme, props.size)};
    }
  }
  & input:checked ~ .checkbox-label {
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Checkbox",
        props.color,
        "active",
        "text"
      )};
  }
  & input:indeterminate ~ .checkmark {
    & .checked {
      height: 0;
      width: 0;
    }
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Checkbox",
        props.color,
        "active",
        "background",
        "backgroundOpacity"
      )};
    & .indeterminate {
      height: ${(props) => getCheckSize(props.theme, props.size)};
      width: ${(props) => getCheckSize(props.theme, props.size)};
      stroke: white;
    }
  }
  & input:indeterminate ~ .checkbox-label {
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Checkbox",
        props.color,
        "enabled",
        "text"
      )};
  }
  & input:disabled ~ .checkmark {
    ${(props) =>
      props.readOnly !== true &&
      `background-color: ${getColorRgbaValue(
        props.theme,
        "Checkbox",
        props.color,
        "disabled",
        "border"
      )};
    border-color: ${getColorRgbaValue(
      props.theme,
      "Checkbox",
      props.color,
      "disabled",
      "border"
    )};
    `};
  }
  & input:disabled ~ .checkbox-label {
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Checkbox",
        props.color,
        "disabled",
        "text"
      )};
  }
  & input:focus ~ .checkmark {
    ${(props) => getOutlineCss(props.theme)};
  }
  & input:active ~ .checkmark {
    ${(props) => getOutlineCss(props.theme)};
  }
`;

const CheckBoxInput = forwardRef((props, ref) => {
  const {
    containerRef,
    id,
    indeterminate,
    disabled,
    readOnly,
    label,
    labelPosition = "right",
    spaceBetween,
    customCheckmark,
    //----------------
    onChange,
    onFocus,
    onBlur,
    onClick,
    //----------------
    color = "primary",
    size = "small",
    className = "",
    style = {},
    children,
    ...rest
  } = props;

  const theme = useTheme();
  var themeProps = { theme, size, color, disabled, readOnly };

  const handleOnBlur = (e) => {
    if (onBlur) onBlur?.(e);
  };

  const handleOnFocus = (e) => {
    if (onFocus) onFocus?.(e);
  };

  return (
    <Container
      ref={containerRef}
      direction={labelPosition}
      className={className}
      style={style}
      label={label}
      labelPosition={labelPosition}
      spaceBetween={spaceBetween}
      tabIndex={-1}
      readOnly={readOnly}
      onClick={onClick}
      {...themeProps}
    >
      <input
        ref={ref}
        type="checkbox"
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        disabled={disabled || readOnly}
        onChange={(e) => onChange?.(e)}
        {...rest}
      />
      <div className="checkmark" tabIndex={-1}>
        {!customCheckmark && (
          <svg
            viewBox="0 0 8 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden={true}
            disabled={true}
            tabIndex={-1}
            className="checked"
          >
            <path
              d="M1 3.15385L2.89474 5L7 1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              tabIndex={-1}
            />
          </svg>
        )}
        <svg
          width="8"
          height="2"
          viewBox="0 0 8 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={true}
          disabled={true}
          tabIndex={-1}
          className="indeterminate"
        >
          <path
            d="M1 1H7"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            tabIndex={-1}
            title={label}
          />
        </svg>
        {customCheckmark && <>{customCheckmark}</>}
      </div>
      {label && (
        <div className="checkbox-label" tabIndex={-1}>
          {label}
        </div>
      )}
    </Container>
  );
});

CheckBoxInput.propTypes = {
  containerRef: PropTypes.any,
  id: PropTypes.any,
  defaultChecked: PropTypes.bool,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /**
   * Default state indeterminate
   */
  indeterminate: PropTypes.bool,
  labelPosition: PropTypes.oneOf(["right", "left"]),
  tabIndex: PropTypes.number,
  spaceBetween: PropTypes.bool,
  customCheckmark: PropTypes.element,
  //---------------------------------------------------------------
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
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

export default CheckBoxInput;
