import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import {
  getColorRgbaValue,
  getComponentTypographyCss,
  getOutlineCss,
} from "../../_utils/utils";
import "../../Base/fontawesome/css/fontawesome.css";

const sizes = {
  containerWidth: {
    small: "2.5rem",
    medium: "3rem",
    large: "3.5rem",
  },
  containerHeight: {
    small: "1.5rem",
    medium: "1.75rem",
    large: "2rem",
  },
  sliderSize: {
    small: "1rem",
    medium: "1.25rem",
    large: "1.5rem",
  },
  paddingLeft: {
    small: "0.5rem",
    medium: "0.5rem",
    large: "0.5rem",
  },
  slider: {
    small: "1rem",
    medium: "1.25rem",
    large: "1.5rem",
  },
  icon: {
    small: "0.75rem",
    medium: "0.875rem",
    large: "1rem",
  },
  iconOff: {
    small: "0.625rem",
    medium: "0.6875rem",
    large: "0.75rem",
  },
};

const checkmark = {
  checked: {
    left: {
      small: "1.25rem",
      medium: "1.5rem",
      large: "1.75rem",
    },
  },
};

const sliderIconOffset = {
  on: {
    top: {
      small: "0.25rem",
      medium: "0.25rem",
      large: "0.25rem",
    },
    left: {
      small: "1.375rem",
      medium: "1.6875rem",
      large: "2rem",
    },
    right: {
      small: "0.5rem",
      medium: "0.5rem",
      large: "0.5rem",
    },
  },
  off: {
    top: {
      small: "0.375rem",
      medium: "0.4375rem",
      large: "0.5rem",
    },
    left: {
      small: "1.375rem",
      medium: "1.75rem",
      large: "2.125rem",
    },
    right: {
      small: "0.5rem",
      medium: "0.5rem",
      large: "0.5rem",
    },
  },
};

//================================================================================================

const getLabelDirection = (direction) => {
  if (direction == "left") return "row-reverse";

  return "row";
};

const Container = styled.label`
  box-sizing: content-box !important;
  width: 100%;
  text-align: left;
  line-height: 1.5;
  display: flex;
  gap: 0.75rem;
  flex-direction: ${(props) => getLabelDirection(props.labelPosition)};
  ${props => props.spaceBetween == true && "justify-content: space-between;"}
  position: relative;
  cursor: ${(props) =>
    props.disabled || props.readOnly ? "default" : "pointer"};
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  align-items: center;
  flex-shrink: 0;

  min-height: ${(props) => props.theme.sizes[props.size]};
  max-height: ${(props) => props.theme.sizes[props.size]};

  & input:focus:enabled ~ span.toggle-slider {
    ${(props) => !props.disabled === true && getOutlineCss(props.theme)};
  }

  & input:hover:enabled ~ span.toggle-slider {
    background-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Toggle",
      null,
      "hover",
      "background",
      "backgroundOpacity"
    )};
  }

  & input:checked:hover:enabled ~ span.toggle-slider {
    background-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Toggle",
      props.color,
      "hover",
      "background"
    )};
  }

  & input {
    position: absolute;
    cursor: pointer;
    opacity: 0;
    height: 100%;
    width: 100%;
    transition: all 0.2s ease;
  }

  & input:checked ~ span.toggle-slider {
    background-color: ${(props) =>
    props.disabled !== true
      ? getColorRgbaValue(
        props.theme,
        "Toggle",
        props.color,
        "enabled",
        "background"
      )
      : getColorRgbaValue(
        props.theme,
        "Toggle",
        props.color,
        "disabled",
        "background",
        "backgroundOpacity"
      )};
    transition: all 0.2s ease;
    border-radius: 100px;
    flex-shrink: 0;
  }

  & input:checked ~ span.toggle-slider:after {
    opacity: 1;
    transition: all 0.2s ease-out;
    box-sizing: content-box;
    left: ${(props) => checkmark.checked.left[props.size]};
    position: absolute;
    border-radius: 100px;
    box-shadow: 1px 1px 0.25rem rgba(15, 23, 42, 0.16);
    background-color: ${(props) =>
    props.disabled === true
      ? getColorRgbaValue(
        props.theme,
        "ToggleSlider",
        props.color,
        "disabled",
        "background",
        "backgroundOpacity"
      )
      : getColorRgbaValue(
        props.theme,
        "ToggleSlider",
        props.color,
        "enabled",
        "background",
        "backgroundOpacity"
      )};
  }

  & span.toggle-slider {
    width: ${(props) => sizes.containerWidth[props.size]};
    height: ${(props) => sizes.containerHeight[props.size]};
    border-radius: 100px;
    font-size: ${(props) => sizes.icon[props.size]};
    flex-shrink: 0;
  }

  & span.toggle-slider::after {
    left: 0.25rem;
    width: ${(props) => sizes.slider[props.size]};
    height: ${(props) => sizes.slider[props.size]};
    top: 0.25rem;
    border-radius: 100px;
    box-shadow: 1px 1px 0.25rem; rgba(15, 23, 42, 0.16);
    flex-shrink: 0;
  }

  & span.toggle-slider::before {
    content: "${(props) =>
    props.unicodeIcon ? "\\" + props.unicodeIcon : ""}";
    font-family: FontAwesome;
    font-weight: 900;
    width: ${(props) => sizes.icon[props.size]};
    text-align: center;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;

    position: absolute;
    color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "ToggleIcon",
      props.color,
      "enabled",
      "text"
    )};
      flex-shrink: 0;
    border-radius: 100px;
    z-index: 2;

    font-size: ${(props) => sizes.iconOff[props.size]};
    width: ${(props) => sizes.iconOff[props.size]};

    top: ${(props) => sliderIconOffset.off.top[props.size]};
    right: ${(props) => sliderIconOffset.off.right[props.size]};
    left: ${(props) => sliderIconOffset.off.left[props.size]};
  }

  & input:checked ~ span.toggle-slider::before {
    content: "${(props) =>
    props.unicodeIcon ? "\\" + props.unicodeIcon : ""}";
    font-family: FontAwesome;
    font-weight: 900;
    width: ${(props) => sizes.icon[props.size]};
    text-align: center;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    flex-shrink: 0;
    color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "ToggleIcon",
      props.color,
      "enabled",
      "text"
    )};

    font-size: ${(props) => sizes.icon[props.size]};
    width: ${(props) => sizes.icon[props.size]};

    top: ${(props) => sliderIconOffset.on.top[props.size]};
    right: ${(props) => sliderIconOffset.on.right[props.size]};
    left: ${(props) => sliderIconOffset.on.left[props.size]};
  }

  & span.toggle-slider {
    position: relative;
    width: ${(props) => sizes.containerWidth[props.size]};
    height: ${(props) => sizes.containerHeight[props.size]};
    background-color: ${(props) =>
    props.disabled !== true
      ? getColorRgbaValue(
        props.theme,
        "Toggle",
        null,
        "enabled",
        "background",
        "backgroundOpacity"
      )
      : getColorRgbaValue(
        props.theme,
        "Toggle",
        null,
        "disabled",
        "background",
        "backgroundOpacity"
      )};
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  & span.toggle-slider:after {
    content: "";
    position: absolute;
    opacity: 1;
    flex-shrink: 0;
    background-color: ${(props) =>
    props.disabled === true
      ? getColorRgbaValue(
        props.theme,
        "ToggleSlider",
        props.color,
        "disabled",
        "background",
        "backgroundOpacity"
      )
      : getColorRgbaValue(
        props.theme,
        "ToggleSlider",
        props.color,
        "enabled",
        "background",
        "backgroundOpacity"
      )};

    box-shadow: 1px 1px 0.25rem rgba(15, 23, 42, 0.16);
    transition: all 0.2s ease-out;
  }
`;

const Label = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 3;

  ${(props) =>
    props.disabled
      ? getComponentTypographyCss(props.theme, "Toggle", props.size, "disabled")
      : getComponentTypographyCss(
        props.theme,
        "Toggle",
        props.size,
        "enabled"
      )};
`;

//================================================================================================

const Toggle = (props) => {
  const {
    // id,
    disabled,
    readOnly,
    value,
    label,
    labelPosition = "right",
    spaceBetween,
    unicodeIcon,
    // tabIndex,
    //----------------
    onChange,
    change,
    onFocus,
    onBlur,
    //----------------
    className = "",
    style = {},
    size = "medium",
    color = "primary",
    ...rest
  } = props;

  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  let themeProps = {
    theme,
    size,
    color,
    disabled,
    readOnly,
    focused,
    labelPosition,
    spaceBetween,
  };

  function handleChange(e) {
    if (disabled || readOnly) return;
    if (value === null) onChange(e, false);
    else onChange(e, !value);
  }

  return (
    <Container
      {...themeProps}
      className={className}
      style={style}
      unicodeIcon={unicodeIcon}
      tabIndex={-1}
    >
      <input
        type="checkbox"
        checked={value ? "checked" : ""}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleChange}
        onFocus={(e) => {
          setFocused(true);
          if (onFocus) onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          if (onBlur) onBlur?.(e);
        }}
        // tabIndex={tabIndex}
        {...rest}
      />
      <span tabIndex={-1} className={"toggle-slider"} />

      {label && <Label tabIndex={-1} title={label} {...themeProps}>{label}</Label>}
    </Container>
  );
};

// Toggle.defaultProps = {
//   id: "",
//   disabled: false,
//   readOnly: false,
//   label: "",
//   unicodeIcon: "",
//   labelPosition: "right",
//   spaceBetween: false,
//   tabIndex: 0,
//   //-------------------------------
//   onChange: () => { },
//   change: () => { },
//   onFocus: () => { },
//   onBlur: () => { },
//   //-------------------------------
//   style: {},
//   className: "",
//   size: "medium",
//   color: "primary",
// };

Toggle.propTypes = {
  id: PropTypes.any,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  unicodeIcon: PropTypes.string,
  labelPosition: PropTypes.oneOf(["right", "left"]),
  spaceBetween: PropTypes.bool,
  tabIndex: PropTypes.number,
  //-------------------------------
  onChange: PropTypes.func,
  change: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  //-------------------------------
  style: PropTypes.object,
  className: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "information",
    "neutral",
    "gray"
  ]),
};

export default Toggle;
