import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import {
  getColorRgbaValue,
  getComponentTypographyCss,
  getOutlineCss,
} from "../../_utils/utils";

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
  sliderX: {
    small: "1rem",
    medium: "1.25rem",
    large: "1.5rem",
  },
};

//================================================================================================

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  min-height: ${(props) => props.theme.sizes[props.size]};
  max-height: ${(props) => props.theme.sizes[props.size]};
  width: fit-content;
`;

const LabelText = styled.span`
  display: inline-flex;
  align-items: center;
  padding-left: ${(props) => sizes.paddingLeft[props.size]};
  line-height: ${(props) => sizes.containerHeight[props.size]};
  min-height: ${(props) => sizes.containerHeight[props.size]};
  max-height: ${(props) => sizes.containerHeight[props.size]};
  vertical-align: middle;

  color: ${(props) =>
    getComponentTypographyCss(props.theme, "Toggle", props.size, "enabled")};

  width: fit-content;
`;

const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: ${(props) => sizes.containerWidth[props.size]};
  height: ${(props) => sizes.containerHeight[props.size]};
  cursor: ${(props) =>
    props.disabled || props.readOnly ? "default" : "pointer"};
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${(props) =>
      props.disabled
        ? getColorRgbaValue(
            props.theme,
            "Toggle",
            props.color,
            "disabled",
            "background",
            "backgroundOpacity"
          )
        : getColorRgbaValue(
            props.theme,
            "Toggle",
            props.color,
            "enabled",
            "background"
          )};
  }

  &:checked + span {
    ${(props) =>
      !props.hover || props.disabled
        ? ""
        : `background-color: ${getColorRgbaValue(
            props.theme,
            "Toggle",
            props.color,
            "hover",
            "background"
          )};`}
  }

  &:focus + span {
    ${(props) => !props.disabled && getOutlineCss(props.theme)};
  }

  &:checked + span::before {
    -webkit-transform: translateX(${(props) => sizes.sliderX[props.size]});
    -ms-transform: translateX(${(props) => sizes.sliderX[props.size]});
    transform: translateX(${(props) => sizes.sliderX[props.size]});
  }
`;

const SwitchSlider = styled.span`
  position: absolute;
  cursor: ${(props) =>
    props.disabled || props.readOnly ? "default" : "pointer"};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-transition: 0.2s;
  transition: all 0.2s ease;
  border-radius: ${(props) => sizes.containerHeight[props.size]};
  background-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Toggle",
      null,
      "enabled",
      "background",
      "backgroundOpacity"
    )};

  ${(props) =>
    !props.hover || props.disabled
      ? ""
      : `background-color: ${getColorRgbaValue(
          props.theme,
          "Toggle",
          null,
          "hover",
          "background",
          "backgroundOpacity"
        )};`}

  &::before {
    ${(props) =>
      props.disabled ? "" : "box-shadow: 1px 1px 4px rgba(15, 23, 42, 0.16);"}
    position: absolute;
    content: "";
    height: ${(props) => sizes.sliderSize[props.size]};
    width: ${(props) => sizes.sliderSize[props.size]};
    top: 4px;
    left: 4px;
    bottom: 0px;
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

    -webkit-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
    border-radius: 50%;
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
  const [hover, setHover] = useState(false);

  let themeProps = { theme, size, color, disabled, readOnly };

  function handleChange(e) {
    if (disabled || readOnly) return;
    if (value === null) onChange(e, false);
    else onChange(e, !value);
  }

  return (
    <Container {...themeProps} className={className} style={style}>
      <SwitchContainer
        {...themeProps}
        // enable override of events
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <SwitchInput
          {...themeProps}
          type="checkbox"
          checked={value ? "checked" : ""}
          disabled={disabled}
          readOnly={readOnly}
          onChange={handleChange}
          {...rest}
          hover={hover}
        />
        <SwitchSlider {...themeProps} hover={hover} />
      </SwitchContainer>

      {label && <LabelText {...themeProps}>{label}</LabelText>}
    </Container>
  );
};

Toggle.defaultProps = {
  id: "",
  disabled: false,
  readOnly: false,
  label: "",
  //-------------------------------
  onChange: () => {},
  //-------------------------------
  style: {},
  className: "",
  size: "small",
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
