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
    small: "",
    medium: "0.875rem",
    large: "1rem",
  },
  iconOff: {
    small: "",
    medium: "0.625rem",
    large: "0.75rem",
  },
};

const checkmark = {
  checked: {
    left: {
      small: "1.75rem",
      medium: "1.75rem",
      large: "1.75rem",
    },
  },
};

//================================================================================================

const Label = styled.label`
  box-sizing: content-box !important;
  width: 100%;
  text-align: left;
  line-height: 1.5;
  display: flex;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  align-items: center;
  flex-shrink: 0;

  min-height: ${(props) => props.theme.sizes[props.size]};
  max-height: ${(props) => props.theme.sizes[props.size]};

  & input {
    position: absolute;
    cursor: pointer;
    opacity: 0;
    height: 0;
    width: 0;
    transition: all 0.2s ease;
  }

  & input:checked ~ span {
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
  }

  & input:checked ~ span:after {
    opacity: 1;
    transition: all 0.2s ease-out;
    box-sizing: content-box;
    left: ${(props) => checkmark.checked.left[props.size]};
    position: absolute;
    border-radius: 100px;
    box-shadow: 1px 1px 4px rgba(15, 23, 42, 0.16);
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

  & span {
    width: ${(props) => sizes.containerWidth[props.size]};
    height: ${(props) => sizes.containerHeight[props.size]};
    border-radius: 100px;
    font-size: ${(props) => sizes.icon[props.size]};
  }

  & span::after {
    left: 4px;
    width: ${(props) => sizes.slider[props.size]};
    height: ${(props) => sizes.slider[props.size]};
    top: 4px;
    border-radius: 100px;
    box-shadow: 1px 1px 4px rgba(15, 23, 42, 0.16);
  }

  & span::before {
    content: "\\e579";
    // content: "";
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

    border-radius: 100px;
    z-index: 2;

    font-size: 12px;
    width: 12px;

    top: 7.5px;
    right: 8px;
    left: 34px;
  }

  & input:checked ~ span::before {
    content: "\\e579";
    // content: "";
    font-family: FontAwesome;
    font-weight: 900;
    width: ${(props) => sizes.icon[props.size]};
    text-align: center;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;

    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "ToggleIcon",
        props.color,
        "enabled",
        "text"
      )};

    font-size: 16px;
    width: 16px;

    top: 4px;
    right: 8px;
    left: 32px;
  }

  & span {
    position: relative;
    width: ${(props) => sizes.containerWidth[props.size]};
    height: ${(props) => sizes.containerHeight[props.size]};
    background-color: lightgray;
    transition: all 0.2s ease;
    order: 1;
  }

  & span:after {
    content: "";
    position: absolute;
    opacity: 1;
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

    box-shadow: 1px 1px 4px rgba(15, 23, 42, 0.16);
    transition: all 0.2s ease-out;
  }
`;

//================================================================================================

const Toggle = (props) => {
  const {
    id,
    disabled,
    readOnly,
    value,
    label,
    //----------------
    onChange,
    //----------------
    className,
    style,
    size,
    color,
    ...rest
  } = props;

  const theme = useTheme();

  const [checked, setChecked] = useState(false);
  let themeProps = { theme, size, color, disabled, readOnly };

  return (
    <div style={{ width: "200px" }}>
      <Label {...themeProps} className="checkswitch">
        <input type="checkbox" />
        <span className="checkmark" />
      </Label>
    </div>
  );
};

Toggle.defaultProps = {
  id: "",
  disabled: false,
  readOnly: false,
  label: "",
  icon: "bell",
  //-------------------------------
  onChange: () => {},
  //-------------------------------
  style: {},
  className: "",
  size: "large",
  color: "primary",
};

Toggle.propTypes = {
  id: PropTypes.any,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  label: PropTypes.string,
  //-------------------------------
  onChange: PropTypes.func,
  //-------------------------------
  style: PropTypes.object,
  className: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "info",
  ]),
};

export default Toggle;
