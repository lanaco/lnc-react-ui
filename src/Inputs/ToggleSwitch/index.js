import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../../_utils/theme";
import { useTheme } from "@emotion/react";

const sizes = {
  containerWidth: {
    small: "4.375rem",
    medium: "5.25rem",
    large: "6.125rem",
  },
  containerHeight: {
    small: "1.875rem",
    medium: "2.25rem",
    large: "2.625rem",
  },
  paddingLeft: {
    small: "4.5625rem",
    medium: "5.4375rem",
    large: "6.3125rem",
  },
  paddingLeftInter: {
    small: "5rem",
    medium: "5.875rem",
    large: "6.75rem",
  },
  dashHeight: {
    small: "0.21875rem",
    medium: "0.3125rem",
    large: "0.40625rem",
  },
  dashWidth: {
    small: "2.625rem",
    medium: "3rem",
    large: "3.375rem",
  },
  dashLeft: {
    small: "0.875rem",
    medium: "1.125rem",
    large: "1.375rem",
  },
  dashBottom: {
    small: "0.75rem",
    medium: "0.9375rem",
    large: "1.0625rem",
  },
  sliderX: {
    small: "2.5rem",
    medium: "3rem",
    large: "3.5rem",
  },
};

//================================================================================================

const IntermediateSwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: ${(props) => sizes.containerWidth[props.size]};
  height: ${(props) => sizes.containerHeight[props.size]};
  cursor: ${(props) =>
    props.disabled || props.readOnly ? "default" : "pointer"};
`;

const IntermediateSwitchDash = styled.span`
  position: absolute;
  cursor: ${(props) =>
    props.disabled || props.readOnly ? "default" : "pointer"};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) =>
    props.disabled
      ? props.theme.test_palette.light[400]
      : props.theme.test_palette.light[100]};
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: ${(props) => sizes.containerHeight[props.size]};
  ${(props) =>
    !props.disabled
      ? `box-shadow: 0px 0px 0.625rem -0.3125rem ${
          props.theme.test_palette[props.color][400]
        };`
      : ""}

  &::before {
    position: absolute;
    content: "";
    border-radius: 0.5rem;
    height: ${(props) => sizes.dashHeight[props.size]};
    width: ${(props) => sizes.dashWidth[props.size]};
    left: ${(props) => sizes.dashLeft[props.size]};
    bottom: ${(props) => sizes.dashBottom[props.size]};
    background-color: ${(props) =>
      props.disabled
        ? props.theme.test_palette.light[100]
        : props.theme.test_palette[props.color][300]};
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
`;

const LabelText = styled.span`
  display: inline-block;
  position: absolute;
  font-family: inherit;
  font-size: inherit;
  padding-left: ${(props) =>
    props.inter
      ? sizes.paddingLeftInter[props.size]
      : sizes.paddingLeft[props.size]};
  line-height: ${(props) => sizes.containerHeight[props.size]};
  min-height: ${(props) => sizes.containerHeight[props.size]};
  max-height: ${(props) => sizes.containerHeight[props.size]};
  vertical-align: middle;
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  color: ${(props) =>
    props.disabled
      ? props.theme.test_palette.light[500]
      : props.theme.test_palette.dark[400]};
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
        ? props.theme.test_palette.light[400]
        : props.theme.test_palette[props.color][400]};
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
  background-color: ${(props) =>
    props.disabled
      ? props.theme.test_palette.light[400]
      : props.theme.test_palette.light[500]};
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: ${(props) => sizes.containerHeight[props.size]};

  &::before {
    position: absolute;
    content: "";
    height: ${(props) => sizes.containerHeight[props.size]};
    width: ${(props) => sizes.containerHeight[props.size]};
    left: 0px;
    bottom: 0px;
    background-color: ${(props) => props.theme.test_palette.light[100]};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
    box-shadow: 0px 0px 0.625rem -0.25rem ${(props) => (props.disabled ? props.theme.test_palette.dark[100] : props.theme.test_palette[props.color][400])};
  }
`;

//================================================================================================

const ToggleSwitch = (props) => {
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

  function handleChange(e) {
    if (disabled || readOnly) return;
    if (value === null) onChange(e, false);
    else onChange(e, !value);
  }

  const theme = useTheme();

  let themeProps = { theme, size, color, disabled, readOnly };

  if (value === null) {
    return (
      <IntermediateSwitchContainer
        {...themeProps}
        onClick={handleChange}
        className={className}
        style={style}
        {...rest}
      >
        <IntermediateSwitchDash {...themeProps} />

        {label && (
          <LabelText inter={true} {...themeProps}>
            {label}
          </LabelText>
        )}
      </IntermediateSwitchContainer>
    );
  }

  return (
    <SwitchContainer {...themeProps} className={className} style={style}>
      <SwitchInput
        {...themeProps}
        type="checkbox"
        checked={value ? "checked" : ""}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleChange}
        {...rest}
      />
      <SwitchSlider {...themeProps}></SwitchSlider>

      {label && <LabelText {...themeProps}>{label}</LabelText>}
    </SwitchContainer>
  );
};

ToggleSwitch.defaultProps = {
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

ToggleSwitch.propTypes = {
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

export default ToggleSwitch;
