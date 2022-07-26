import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import "../../Base/fontawesome/css/fontawesome.css";
import { getBorderRadiusValueWithUnits, getColorRgbaValue, getComponentTypographyCss, getDisabledStateCss, getOutlineCss } from "../../_utils/utils";

const getIconClass = (icon) => {
  var style = "fas";
  return `${style} fa-${icon} fa-fw`;
};

const getPadding = (avatar, leadingIcon, trailingIcon, size) => {
  if (avatar) {
    return `padding-right: ${
      size == "regular" ? "0.75rem" : "0.625rem"
    }; padding-left: ${size == "regular" ? "0.25rem" : "0.125rem"};`;
  } else if (leadingIcon) {
    return `padding-right: ${
      size == "regular" ? "0.5rem" : "0.375rem"
    }; padding-left: ${size == "regular" ? "0.5rem" : "0.375rem"};`;
  } else if (trailingIcon) {
    return `padding-right: ${
      size == "regular" ? "0.5rem" : "0.375rem"
    }; padding-left: ${size == "regular" ? "0.75rem" : "0.625rem"};`;
  } else {
    return `padding-right: ${
      size == "regular" ? "1rem" : "0.75rem"
    }; padding-left: ${size == "regular" ? "1rem" : "0.75rem"};`;
  }
};

const StyledChip = styled.span`
  cursor: pointer;
  display: inline-flex;
  height: ${(props) => props.size === 'regular' ?  '2rem' : '2.25rem'};
  ${props => props.disabled && getDisabledStateCss(props.theme)};
  background-color: ${(props) =>
    !props.disabled && getColorRgbaValue(props.theme, "Chip", props.color, "enabled", "background", "backgroundOpacity") };
  color: ${(props) =>
    !props.disabled &&  getColorRgbaValue(props.theme, "Chip", props.color, "enabled", "text")};
  ${(props) =>
    getPadding(props.avatar, props.leadingIcon, props.trailingIcon, props.size)}
  gap: 0.375rem;
  border-radius: ${(props) => getBorderRadiusValueWithUnits(props.theme, props.borderRadius)};
  justify-content: center;
  align-items: center;
  ${props => getComponentTypographyCss(props.theme, "small")};
 
  &:hover {
    background-color: ${(props) =>
      !props.disabled && getColorRgbaValue(props.theme, "Chip", props.color, "hover", "background", "backgroundOpacity") };
  }
  &:focus {
    background-color: ${(props) =>
      !props.disabled && getColorRgbaValue(props.theme, "Chip", props.color, "focus", "background", "backgroundOpacity") };
      ${(props) => getOutlineCss(props.theme)};
  }
  &:active {
    background-color: ${(props) =>
      !props.disabled && getColorRgbaValue(props.theme, "Chip", props.color, "active", "background", "backgroundOpacity") };
  }
`;

const Avatar = styled.div`
  border-radius: ${props => getBorderRadiusValueWithUnits(props.theme, "curved")};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.75rem;
  width: 1.75rem;
  ${props => props.disabled && getDisabledStateCss(props.theme)};
  background-color: ${(props) =>
    !props.disabled && getColorRgbaValue(props.theme, "Chip", props.color, "enabled", "text")};
`;

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
    onAvatarClick,
    //----------------
    className,
    style,
    color,
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
        <Avatar {...themeProps} onClick={onAvatarClick}>
          <i className={getIconClass(avatar)} />
        </Avatar>
      )}

      {leadingIcon && <i className={getIconClass(leadingIcon)} onClick={onLeadingIconClick}/>}
      {label}
      {trailingIcon && <i className={getIconClass(trailingIcon)} onClick={onTrailingIconClick}/>}
    </StyledChip>
  );
});

Chip.defaultProps = {
  size: "compact",
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
  onAvatarClick: () => {},
  //-------------------------
  style: {},
  color: "primary",
};

Chip.propTypes = {
  label: PropTypes.string,
  leadingIcon: PropTypes.string,
  trailingIcon: PropTypes.string,
  avatar: PropTypes.string,
  size: PropTypes.oneOf(["compact", "regular"]),
  borderRadius: PropTypes.oneOf(["regular", "curved"]),
  disabled: PropTypes.bool,
  tabIndex: PropTypes.number,
  //---------------------------------------------------------------
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onLeadingIconClick: PropTypes.func,
  onTrailingIconClick: PropTypes.func,
  onAvatarClick: PropTypes.func,
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
  ]),
};

export default Chip;
