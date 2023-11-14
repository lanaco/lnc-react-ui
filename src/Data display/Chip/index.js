import React from "react";
import PropTypes from "prop-types";
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
import Avatar from "../../General/Avatar";

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
  ${(props) => props.disabled && getDisabledStateCss(props.theme)};
  background-color: ${(props) =>
    !props.disabled &&
    getColorRgbaValue(
      props.theme,
      "Chip",
      props.color,
      "enabled",
      "background",
      "backgroundOpacity"
    )};
  color: ${(props) =>
    !props.disabled &&
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
      !props.disabled &&
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
      !props.disabled &&
      getColorRgbaValue(
        props.theme,
        "Chip",
        props.color,
        "focus",
        "background",
        "backgroundOpacity"
      )};
    ${(props) => !props.disabled && getOutlineCss(props.theme)};
  }
  &:active {
    background-color: ${(props) =>
      !props.disabled &&
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

const Chip = React.forwardRef((props, ref) => {
  const {
    label,
    leadingIcon,
    trailingIcon,
    avatar,
    size,
    borderRadius,
    disabled,
    tabIndex,
    //----------------
    onFocus,
    onBlur,
    onClick,
    onKeyDown,
    onLeadingIconClick,
    onTrailingIconClick,
    //----------------
    className,
    style,
    color,
    avatarProps,
    children,
    ...rest
  } = props;

  const theme = useTheme();

  const themeProps = { theme, color, style, className };

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

Chip.defaultProps = {
  avatar: false,
  borderRadius: "regular",
  disalbed: false,
  tabIndex: 0,
  //-------------------------
  onBlur: () => {},
  onFocus: () => {},
  onClick: () => {},
  onKeyDown: () => {},
  onLeadingIconClick: () => {},
  onTrailingIconClick: () => {},
  //-------------------------
  style: {},
  color: "primary",
  size: "small",
};

Chip.propTypes = {
  label: PropTypes.string,
  leadingIcon: PropTypes.string,
  trailingIcon: PropTypes.string,
  avatar: PropTypes.bool,
  borderRadius: PropTypes.oneOf([
    "slight",
    "regular",
    "edged",
    "curved",
    "none",
  ]),
  disabled: PropTypes.bool,
  tabIndex: PropTypes.number,
  //---------------------------------------------------------------
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onLeadingIconClick: PropTypes.func,
  onTrailingIconClick: PropTypes.func,
  //---------------------------------------------------------------
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "information",
    "neutral",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  avatarProps: PropTypes.any,
};

export default Chip;
