/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import {
  getBorderRadiusValueWithUnits,
  getColorRgbaValue,
  getComponentPropValue,
  getComponentTypographyCss,
  getDisabledStateCss,
  getOutlineCss,
  getSizeValueWithUnits,
} from "../../_utils/utils";
import Avatar from "../../General/Avatar/Avatar";

const getIconClass = (icon) => {
  var style = "fas";
  return `${style} fa-${icon} fa-fw`;
};

const getPadding = (avatar, leadingIcon, trailingIcon, size) => {
  if (avatar) {
    return `padding-right: ${
      size == "small" ? "0.75rem" : "0.625rem"
    }; padding-left: ${size == "small" ? "0.25rem" : "0.125rem"};`;
  } else if (leadingIcon) {
    return `padding-right: ${
      size == "small" ? "0.5rem" : "0.375rem"
    }; padding-left: ${size == "small" ? "0.5rem" : "0.375rem"};`;
  } else if (trailingIcon) {
    return `padding-right: ${
      size == "small" ? "0.5rem" : "0.375rem"
    }; padding-left: ${size == "small" ? "0.75rem" : "0.625rem"};`;
  } else {
    return `padding-right: ${
      size == "small" ? "1rem" : "0.75rem"
    }; padding-left: ${size == "small" ? "1rem" : "0.75rem"};`;
  }
};
const StyledChip = styled.span`
  cursor: pointer;
  display: inline-flex;
  height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
  ${(props) => props.disabled === true && getDisabledStateCss(props.theme)};
  background-color: ${(props) =>
    !props.disabled === true &&
    getColorRgbaValue(
      props.theme,
      "Chip",
      props.color,
      "enabled",
      "background",
      "backgroundOpacity"
    )};
  color: ${(props) =>
    !props.disabled === true &&
    getColorRgbaValue(props.theme, "Chip", props.color, "enabled", "text")};
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
  ${(props) =>
    getPadding(props.avatar, props.leadingIcon, props.trailingIcon, props.size)}
  gap: 0.375rem;
  border-radius: ${(props) =>
    getBorderRadiusValueWithUnits(props.theme, props.borderRadius)};
  justify-content: center;
  align-items: center;
  ${(props) =>
    getComponentTypographyCss(props.theme, "Chip", props.size, "enabled")};
  backdrop-filter: ${(props) =>
    getComponentPropValue(
      props.theme,
      "Chip",
      props.color,
      "enabled",
      "backDropFilter"
    )};

  &:hover {
    background-color: ${(props) =>
      !props.disabled === true &&
      getColorRgbaValue(
        props.theme,
        "Chip",
        props.color,
        "hover",
        "background",
        "backgroundOpacity"
      )};
  }
  &:focus {
    background-color: ${(props) =>
      !props.disabled === true &&
      getColorRgbaValue(
        props.theme,
        "Chip",
        props.color,
        "focus",
        "background",
        "backgroundOpacity"
      )};
    ${(props) => !props.disabled === true && getOutlineCss(props.theme)};
  }
  &:active {
    background-color: ${(props) =>
      !props.disabled === true &&
      getColorRgbaValue(
        props.theme,
        "Chip",
        props.color,
        "active",
        "background",
        "backgroundOpacity"
      )};
  }
`;

const getAvatarSize = (theme, size) => {
  return `calc(${getSizeValueWithUnits(theme, size)} - 8px)`;
};

const Chip = forwardRef((props, ref) => {
  const {
    label,
    leadingIcon,
    trailingIcon,
    avatar = false,
    size = "small",
    borderRadius = "regular",
    disabled = false,
    tabIndex = 0,
    //----------------
    onFocus = () => {},
    onBlur = () => {},
    onClick = () => {},
    onKeyDown = () => {},
    onLeadingIconClick = () => {},
    onTrailingIconClick = () => {},
    //----------------
    className = "",
    style = {},
    color = "primary",
    avatarProps,
    children,
    ...rest
  } = props;

  const theme = useTheme();

  const themeProps = {
    theme,
    color,
    style,
    size,
    className: "lnc-ui-chip " + className,
  };

  return (
    <StyledChip
      ref={ref}
      size={size}
      {...themeProps}
      trailingIcon={trailingIcon}
      leadingIcon={leadingIcon}
      avatar={avatar}
      borderRadius={borderRadius}
      disabled={disabled}
      tabIndex={tabIndex}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      onFocus={onFocus}
      {...rest}
    >
      {avatar && (
        <Avatar
          {...themeProps}
          disabled={disabled}
          sizeInUnits={getAvatarSize(theme, size)}
          {...avatarProps}
        />
      )}

      {leadingIcon && (
        <i className={getIconClass(leadingIcon)} onClick={onLeadingIconClick} />
      )}
      <>
        {label}
        {children}
      </>
      {trailingIcon && (
        <i
          className={getIconClass(trailingIcon)}
          onClick={onTrailingIconClick}
        />
      )}
    </StyledChip>
  );
});

export default Chip;
