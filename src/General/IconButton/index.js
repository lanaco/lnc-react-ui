import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import "../../Base/fontawesome/css/fontawesome.css";
import {
  FilledButton,
  TintedButton,
  OutlineButton,
  BasicButton,
  StyledIcon,
} from "./styledComponents";

//=================================================

const Button = (props) => {
  const {
    icon,
    iconStyle,
    size,
    borderRadius,
    type,
    disabled,
    tabIndex,
    //----------------
    onFocus,
    onBlur,
    onClick,
    onKeyDown,
    //----------------
    className,
    style,
    color,
    ...rest
  } = props;

  const theme = useTheme();
  const themeProps = {
    theme,
    color,
    size,
    style,
    className,
    disabled,
    borderRadius,
    type,
  };

  const getIconClass = () => {
    var style = iconStyle === "solid" ? "fas" : "far";
    return `${style} fa-${icon} fa-fw`;
  };

  const renderIcon = () => {
    return <StyledIcon className={getIconClass()} />;
  };

  if (type === "filled") {
    return (
      <FilledButton
        data-type="filled"
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
  }

  if (type === "tinted") {
    return (
      <TintedButton
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

  if (type === "outline") {
    return (
      <OutlineButton
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

  if (type === "basic") {
    return (
      <BasicButton
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
};

Button.defaultProps = {
  icon: "",
  iconStyle: "solid",
  borderRadius: "regular",
  type: "filled",
  disalbed: false,
  tabIndex: 0,
  //-------------------------
  onBlur: () => {},
  onFocus: () => {},
  onClick: () => {},
  onKeyDown: () => {},
  //-------------------------
  style: {},
  color: "primary",
  size: "small",
};

Button.propTypes = {
  icon: PropTypes.string,
  iconStyle: PropTypes.oneOf(["regular", "solid"]),
  borderRadius: PropTypes.oneOf(["regular", "curved"]),
  /**
   * Different styles
   */
  type: PropTypes.oneOf(["filled", "tinted", "outline", "basic"]),
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
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default Button;
