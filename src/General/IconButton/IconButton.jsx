/* eslint-disable react/display-name */
import { forwardRef, isValidElement } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import {
  FilledButton,
  TintedButton,
  OutlineButton,
  BasicButton,
  StyledIcon,
} from "./styledComponents";

//=================================================

const Button = forwardRef((props, ref) => {
  const {
    icon = null,
    iconStyle = "solid",
    borderRadius = "regular",
    btnType = "filled",
    disabled = false,
    tabIndex = 0,
    //----------------
    onFocus = () => {},
    onBlur = () => {},
    onClick = () => {},
    onKeyDown = () => {},
    //----------------
    size = "small",
    color = "primary",
    className = "",
    style = {},
    ...rest
  } = props;

  const theme = useTheme();
  const themeProps = {
    theme,
    color,
    size,
    style,
    className: "lnc-ui-icon-button",
    disabled,
    borderRadius,
    btnType,
  };

  const getIconClass = () => {
    var style = iconStyle === "solid" ? "fas" : "far";
    return `${style} fa-${icon} fa-fw`;
  };

  const renderIcon = () =>
    isValidElement(icon) ? icon : <StyledIcon className={getIconClass()} />;

  if (btnType === "filled") {
    return (
      <FilledButton
        ref={ref}
        data-type="filled"
        {...themeProps}
        className={`${themeProps?.className} ${color}-${btnType}-lnc-btn ${className}`}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        onKeyDown={onKeyDown}
        type={btnType}
        {...rest}
      >
        {renderIcon()}
      </FilledButton>
    );
  }

  if (btnType === "tinted") {
    return (
      <TintedButton
        ref={ref}
        data-type="tinted"
        {...themeProps}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        onKeyDown={onKeyDown}
        {...rest}
      >
        {renderIcon()}
      </TintedButton>
    );
  }

  if (btnType === "outline") {
    return (
      <OutlineButton
        ref={ref}
        data-type="outline"
        {...themeProps}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        onKeyDown={onKeyDown}
        {...rest}
      >
        {renderIcon()}
      </OutlineButton>
    );
  }

  if (btnType === "basic") {
    return (
      <BasicButton
        ref={ref}
        data-type="basic"
        {...themeProps}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        onKeyDown={onKeyDown}
        {...rest}
      >
        {renderIcon()}
      </BasicButton>
    );
  }

  return (
    <FilledButton
      ref={ref}
      data-type="filled"
      size={size}
      {...themeProps}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
      onKeyDown={onKeyDown}
      {...rest}
    >
      {renderIcon()}
    </FilledButton>
  );
});

// Button.defaultProps = {
//   icon: null,
//   iconStyle: "solid",
//   borderRadius: "regular",
//   btnType: "filled",
//   disabled: false,
//   tabIndex: 0,
//   //-------------------------
//   onBlur: () => {},
//   onFocus: () => {},
//   onClick: () => {},
//   onKeyDown: () => {},
//   //-------------------------
//   style: {},
//   color: "primary",
//   size: "small",
// };

Button.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  iconStyle: PropTypes.oneOf(["regular", "solid"]),
  borderRadius: PropTypes.oneOf([
    "slight",
    "regular",
    "edged",
    "curved",
    "none",
  ]),
  /**
   * Different styles
   */
  btnType: PropTypes.oneOf(["filled", "tinted", "outline", "basic"]),
  disabled: PropTypes.bool,
  tabIndex: PropTypes.number,
  //---------------------------------------------------------------
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
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
    "gray",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default Button;
