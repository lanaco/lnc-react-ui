/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, isValidElement } from "react";
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
        className={`${themeProps?.className} ${color}-${btnType}-lnc-btn ${className}`}
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
        className={`${themeProps?.className} ${color}-${btnType}-lnc-btn ${className}`}
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
        className={`${themeProps?.className} ${color}-${btnType}-lnc-btn ${className}`}
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
      className={`${themeProps?.className} ${color}-${btnType}-lnc-btn ${className}`}
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

export default Button;
