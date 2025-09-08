/* eslint-disable react/display-name */
import { useTheme } from "@emotion/react";
import { useState, forwardRef } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import {
  getColorRgbaValue,
  getComponentTypographyCss,
  getOutlineCss,
  getSizeValueWithUnits,
} from "../../_utils/utils";

const getLabelDirection = (direction) => {
  if (direction == "left") return "row-reverse";

  return "row";
};

const Container = styled.label`
  min-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
  max-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
  width: 100%;
  display: inline-flex;
  justify-content: start;
  align-items: center;
  flex-direction: ${(props) => getLabelDirection(props.labelPosition)};
  ${(props) => props.spaceBetween === true && "justify-content: space-between;"}
  gap: 0.5rem;
  ${(props) => props.disabled === true && "pointer-events: none;"}
  ${(props) =>
    getComponentTypographyCss(props.theme, "Radio", props.size, "enabled")};
  gap: 0.75rem;
  cursor: pointer;
  position: relative;
  & input {
    cursor: pointer;
    position: absolute;
    opacity: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  & .checkmark {
    box-sizing: border-box;
    cursor: pointer;
    min-height: ${(props) =>
      props.theme.components.Radio.default.enabled.sizes[props.size]};
    min-width: ${(props) =>
      props.theme.components.Radio.default.enabled.sizes[props.size]};
    height: ${(props) =>
      props.theme.components.Radio.default.enabled.sizes[props.size]};
    width: ${(props) =>
      props.theme.components.Radio.default.enabled.sizes[props.size]};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease;
    ${(props) =>
      props.focused === true &&
      props.disabled !== true &&
      props.readOnly !== true
        ? getOutlineCss(props.theme)
        : ""};
    & svg {
      fill: transparent;
      & .outer-circle {
        stroke: ${(props) =>
          getColorRgbaValue(
            props.theme,
            "Radio",
            props.color,
            "enabled",
            "border"
          )};
      }
      & .inner-circle {
        stroke: ${(props) =>
          getColorRgbaValue(
            props.theme,
            "Radio",
            props.color,
            "enabled",
            "border"
          )};
      }
    }
  }
  & input:hover ~ .lnc-radio-input-label {
    color: ${(props) =>
      getColorRgbaValue(props.theme, "Radio", props.color, "hover", "text")};
  }

  
  & input:checked ~ .lnc-radio-input-label {
    color: ${(props) =>
      getColorRgbaValue(props.theme, "Radio", props.color, "active", "text")};
  }
  & input:checked ~ .checkmark {
    & svg {
      fill: ${(props) =>
        getColorRgbaValue(
          props.theme,
          "Radio",
          props.color,
          "active",
          "background",
          "backgroundOpacity"
        )};
      & .outer-circle {
        fill: ${(props) =>
          getColorRgbaValue(
            props.theme,
            "Radio",
            props.color,
            "active",
            "border"
          )};
      }
      & .inner-circle {
        fill: ${(props) =>
          props.innerColor === "white" || props.innerColor === "transparent"
            ? props.innerColor
            : getColorRgbaValue(
                props.theme,
                "Radio",
                props.color,
                "active",
                "border"
              )}};
      }
    }
  }

  & input:disabled ~ .lnc-radio-input-label {
    color: ${(props) =>
      getColorRgbaValue(props.theme, "Radio", props.color, "disabled", "text")};
  }
  
  & input[disabled]:checked ~ .checkmark {
    & svg {
      fill: ${(props) =>
        getColorRgbaValue(
          props.theme,
          "Radio",
          props.color,
          "disabled",
          "background",
          "backgroundOpacity"
        )};
      & .outer-circle {
        fill: ${(props) =>
          getColorRgbaValue(
            props.theme,
            "Radio",
            props.color,
            "disabled",
            "border"
          )};
      }
      & .inner-circle {
        fill: ${(props) =>
          props.innerColor === "white" || props.innerColor === "transparent"
            ? props.innerColor
            : getColorRgbaValue(
                props.theme,
                "Radio",
                props.color,
                "disabled",
                "border"
              )}
            };
      }
    }


    & input[disabled] ~ .checkmark {
      & svg {
        fill: ${(props) =>
          getColorRgbaValue(
            props.theme,
            "Radio",
            props.color,
            "disabled",
            "background",
            "backgroundOpacity"
          )};
        & .outer-circle {
          fill: ${(props) =>
            getColorRgbaValue(
              props.theme,
              "Radio",
              props.color,
              "disabled",
              "border"
            )};
        }
        & .inner-circle {
          fill: ${(props) =>
            getColorRgbaValue(
              props.theme,
              "Radio",
              props.color,
              "disabled",
              "border"
            )}
              };
        }
      }

    & input:hover ~ .lnc-radio-input-label {
      color: ${(props) =>
        getColorRgbaValue(props.theme, "Radio", props.color, "hover", "text")};
    }
    & input[hover]:checked ~ .checkmark {
      & svg {
        fill: ${(props) =>
          getColorRgbaValue(
            props.theme,
            "Radio",
            props.color,
            "hover",
            "background",
            "backgroundOpacity"
          )};
        & .outer-circle {
          fill: ${(props) =>
            getColorRgbaValue(
              props.theme,
              "Radio",
              props.color,
              "disabled",
              "border"
            )};
        }
        & .inner-circle {
          fill: ${(props) =>
            props.innerColor === "white" || props.innerColor === "transparent"
              ? props.innerColor
              : getColorRgbaValue(
                  props.theme,
                  "Radio",
                  props.color,
                  "disabled",
                  "border"
                )}};
        }
      }
`;

const Label = styled.label`
  ${(props) =>
    props.disabled !== true && props.readOnly !== true && "cursor: pointer"};
  min-width: 0;
  flex-shrink: 1;
  min-height: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) =>
    getColorRgbaValue(props.theme, "Radio", props.color, "enabled", "text")};
`;

const RadioInput = forwardRef((props, ref) => {
  const {
    wrapperRef,
    className = "",
    style = {},
    color = "primary",
    innerColor = "white",
    size = "small",
    onChange,
    onFocus,
    onBlur,
    onClick,
    onKeyDown,
    label,
    labelPosition = "right",
    spaceBetween,
    disabled,
    readOnly,
    ...rest
  } = props;
  const [focused, setFocused] = useState(false);

  const theme = useTheme();

  var themeProps = {
    theme,
    size,
    color,
    disabled,
    labelPosition,
    spaceBetween,
  };

  const handleOnBlur = (e) => {
    setFocused(false);
    if (onBlur) onBlur?.(e);
  };

  const handleOnFocus = (e) => {
    setFocused(true);
    if (onFocus) onFocus?.(e);
  };

  return (
    <Container
      {...themeProps}
      ref={wrapperRef}
      className={className}
      style={style}
      tabIndex={-1}
      readOnly={readOnly}
      focused={focused}
      onClick={(e) => onClick?.(e)}
      innerColor={innerColor}
    >
      <input
        ref={ref}
        disabled={disabled || readOnly}
        type="radio"
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        onChange={(e) => onChange?.(e)}
        {...rest}
      />
      <div className="checkmark">
        <svg
          id="eqw1eBsfm9l1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
        >
          <ellipse
            className="outer-circle"
            rx="9.5"
            ry="9.5"
            transform="translate(10 10)"
            fillRule="evenodd"
            stroke={"red"}
          />
          <ellipse
            rx="5"
            ry="5"
            transform="translate(10 10)"
            className="inner-circle"
            strokeWidth="0"
          />
        </svg>
      </div>
      <Label
        {...themeProps}
        className={`lnc-radio-input-label`}
        disalbed={disabled}
        readOnly={readOnly}
        title={label}
        tabIndex={-1}
      >
        {label}
      </Label>
    </Container>
  );
});

// RadioInput.defaultProps = {
//   id: "",
//   disabled: false,
//   readOnly: false,
//   label: "",
//   labelPosition: "right",
//   tabIndex: 0,
//   spaceBetween: false,
//   innerColor: "white",
//   //------------------
//   onChange: () => {},
//   onFocus: () => {},
//   onBlur: () => {},
//   onClick: () => {},
//   onKeyDown: () => {},
//   //------------------
//   className: "",
//   style: {},
//   size: "small",
//   color: "primary",
// };

RadioInput.propTypes = {
  id: PropTypes.any,
  name: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  labelPosition: PropTypes.oneOf(["right", "left"]),
  tabIndex: PropTypes.number,
  spaceBetween: PropTypes.bool,
  //-------------------------
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  //-------------------------
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
  innerColor: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "information",
    "neutral",
    "gray",
    "white",
    "transparent",
  ]),
};

export default RadioInput;
