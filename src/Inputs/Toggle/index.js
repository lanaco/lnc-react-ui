import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Icon from "../../General/Icon/index";
import { Global, css } from "@emotion/react";
import { useTheme } from "@emotion/react";
import {
  getColorRgbaValue,
  getComponentTypographyCss,
  getOutlineCss,
} from "../../_utils/utils";
import "../../Base/fontawesome/css/fontawesome.css";
import { isEmpty } from "lodash";

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

const Container = styled.label`
  box-sizing: content-box !important;
  width: 100%;
  text-align: left;
  line-height: 1.5;
  display: flex;
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
    ${(props) => !props.disabled && getOutlineCss(props.theme)};
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
    height: 0;
    width: 0;
    transition: all 0.2s ease;
  }

  & input:checked ~ span.toggle-slider {
    background-color: ${(props) =>
      !props.disabled
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
      props.disabled
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
      !props.disabled
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
    ${(props) =>
      props.orientation === "right"
        ? "margin-left: auto;"
        : `margin-right: 0.5rem;`}

    order: ${(props) => (props.orientation === "right" ? "1" : "0")};
  }

  & span.toggle-slider:after {
    content: "";
    position: absolute;
    opacity: 1;
    flex-shrink: 0;
    background-color: ${(props) =>
      props.disabled
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
    props.orientation === "right"
      ? "margin-right: auto;"
      : "margin-left: auto;"}

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
    id,
    disabled,
    readOnly,
    value,
    label,
    orientation,
    unicodeIcon,
    //----------------
    onChange,
    onFocus,
    onBlur,
    //----------------
    className,
    style,
    size,
    color,
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
    orientation,
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
    >
      <input
        type="checkbox"
        checked={value ? "checked" : ""}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleChange}
        onFocus={(e) => {
          setFocused(true);
          if (onFocus) onFocus(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          if (onBlur) onBlur(e);
        }}
        {...rest}
      />
      <span className={"toggle-slider"} />

      {label && <Label {...themeProps}>{label}</Label>}
    </Container>
  );
};

Toggle.defaultProps = {
  id: "",
  disabled: false,
  readOnly: false,
  label: "",
  unicodeIcon: "",
  orientation: "left",
  //-------------------------------
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  //-------------------------------
  style: {},
  className: "",
  size: "medium",
  color: "primary",
};

Toggle.propTypes = {
  id: PropTypes.any,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  unicodeIcon: PropTypes.string,
  orientation: PropTypes.oneOf(["left", "right"]),
  //-------------------------------
  onChange: PropTypes.func,
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
  ]),
};

export default Toggle;
