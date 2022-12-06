import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import "../../Base/fontawesome/css/fontawesome.css";
import { isEmpty } from "lodash";
import {
  FilledButton,
  TintedButton,
  OutlineButton,
  BasicButton,
  LeadingIconContainer,
  TrailingIconContainer,
} from "./styledComponents";
import Icon from "../Icon/index";

//=================================================

const Button = React.forwardRef((props, ref) => {
  const {
    text,
    iconStyle,
    leadingIcon,
    trailingIcon,
    size,
    borderRadius,
    btnType,
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
    children,
    ...rest
  } = props;

  const theme = useTheme();
  const themeProps = {
    theme,
    color,
    size,
    style,
    disabled,
    borderRadius,
    btnType,
  };

  const hasLeadingIcon = !isEmpty(leadingIcon);
  const hasTrailingIcon = !isEmpty(trailingIcon);
  const hasText = !isEmpty(text);

  const renderContent = () => {
    return (
      <>
        {hasLeadingIcon && (
          <LeadingIconContainer size={size}>
            <Icon
              icon={leadingIcon}
              sizeInUnits={"1.125rem"}
              iconStyle={iconStyle}
            />
          </LeadingIconContainer>
        )}

        {text}
        {children}

        {hasTrailingIcon && (
          <TrailingIconContainer size={size}>
            <Icon
              icon={trailingIcon}
              sizeInUnits={"1.125rem"}
              iconStyle={iconStyle}
            />
          </TrailingIconContainer>
        )}
      </>
    );
  };

  if (btnType === "filled") {
    return (
      <FilledButton
        ref={ref}
        data-type="filled"
        {...themeProps}
        className={`lnc-button ${className}`}
        hasLeadingIcon={hasLeadingIcon}
        hasTrailingIcon={hasTrailingIcon}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        onKeyDown={onKeyDown}
        tabIndex={tabIndex}
        btnType={btnType}
        {...rest}
      >
        {renderContent()}
      </FilledButton>
    );
  }

  if (btnType === "tinted") {
    return (
      <TintedButton
        ref={ref}
        data-type="tinted"
        {...themeProps}
        className={`lnc-button ${className}`}
        hasLeadingIcon={hasLeadingIcon}
        hasTrailingIcon={hasTrailingIcon}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        onKeyDown={onKeyDown}
        tabIndex={tabIndex}
        btnType={btnType}
        {...rest}
      >
        {renderContent()}
      </TintedButton>
    );
  }

  if (btnType === "outline") {
    return (
      <OutlineButton
        ref={ref}
        data-type="outline"
        {...themeProps}
        className={`lnc-button ${className}`}
        hasLeadingIcon={hasLeadingIcon}
        hasTrailingIcon={hasTrailingIcon}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        onKeyDown={onKeyDown}
        tabIndex={tabIndex}
        btnType={btnType}
        {...rest}
      >
        {renderContent()}
      </OutlineButton>
    );
  }

  if (btnType === "basic") {
    return (
      <BasicButton
        ref={ref}
        data-type="basic"
        {...themeProps}
        className={`lnc-button ${className}`}
        hasLeadingIcon={hasLeadingIcon}
        hasTrailingIcon={hasTrailingIcon}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        onKeyDown={onKeyDown}
        tabIndex={tabIndex}
        btnType={btnType}
        {...rest}
      >
        {renderContent()}
      </BasicButton>
    );
  }

  return (
    <FilledButton
      ref={ref}
      data-type="filled"
      size={size}
      {...themeProps}
      hasLeadingIcon={hasLeadingIcon}
      hasTrailingIcon={hasTrailingIcon}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
      onKeyDown={onKeyDown}
      hasText={hasText}
      tabIndex={tabIndex}
      btnType={btnType}
      {...rest}
    >
      {renderContent()}
    </FilledButton>
  );
});

Button.defaultProps = {
  text: "",
  iconStyle: "solid",
  borderRadius: "regular",
  btnType: "filled",
  disabled: false,
  tabIndex: 0,
  leadingIcon: null,
  trailingIcon: null,
  //-------------------------
  onBlur: () => {},
  onFocus: () => {},
  onClick: () => {},
  onKeyDown: () => {},
  //-------------------------
  style: {},
  className: "",
  color: "primary",
  size: "small",
};

Button.propTypes = {
  text: PropTypes.string,
  iconStyle: PropTypes.oneOf(["regular", "solid"]),
  /**
   * Icon before the text
   */
  leadingIcon: PropTypes.string,
  /**
   * Icon after the text
   */
  trailingIcon: PropTypes.string,
  borderRadius: PropTypes.oneOf(["regular", "curved", "none"]),
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
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default Button;