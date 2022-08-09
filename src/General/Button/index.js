import React from "react";
import styled from "@emotion/styled";
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

const Button = (props) => {
  const {
    text,
    leadingIcon,
    trailingIcon,
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
    onLeadingIconClick,
    onTrailingIconClick,
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

  const hasLeadingIcon = !isEmpty(leadingIcon);
  const hasTrailingIcon = !isEmpty(trailingIcon);
  const hasText = !isEmpty(text);

  const renderContent = () => {
    return (
      <>
        {hasLeadingIcon && (
          <LeadingIconContainer size={size} hasText={hasText}>
            <Icon icon={leadingIcon} sizeInUnits={"1.125rem"} />
          </LeadingIconContainer>
        )}

        {text}

        {hasTrailingIcon && (
          <TrailingIconContainer size={size} hasText={hasText}>
            <Icon icon={trailingIcon} sizeInUnits={"1.125rem"} />
          </TrailingIconContainer>
        )}
      </>
    );
  };

  if (type === "filled") {
    return (
      <FilledButton
        {...themeProps}
        hasLeadingIcon={hasLeadingIcon}
        hasTrailingIcon={hasTrailingIcon}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        onKeyDown={onKeyDown}
        hasText={hasText}
        {...rest}
      >
        {renderContent()}
      </FilledButton>
    );
  }

  if (type === "tinted") {
    return (
      <TintedButton
        {...themeProps}
        hasLeadingIcon={hasLeadingIcon}
        hasTrailingIcon={hasTrailingIcon}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        onKeyDown={onKeyDown}
        hasText={hasText}
        {...rest}
      >
        {renderContent()}
      </TintedButton>
    );
  }

  if (type === "outline") {
    return (
      <OutlineButton
        {...themeProps}
        hasLeadingIcon={hasLeadingIcon}
        hasTrailingIcon={hasTrailingIcon}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        onKeyDown={onKeyDown}
        hasText={hasText}
        {...rest}
      >
        {renderContent()}
      </OutlineButton>
    );
  }

  if (type === "basic") {
    return (
      <BasicButton
        {...themeProps}
        hasLeadingIcon={hasLeadingIcon}
        hasTrailingIcon={hasTrailingIcon}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        onKeyDown={onKeyDown}
        hasText={hasText}
        {...rest}
      >
        {renderContent()}
      </BasicButton>
    );
  }

  return (
    <FilledButton
      size={size}
      {...themeProps}
      hasLeadingIcon={hasLeadingIcon}
      hasTrailingIcon={hasTrailingIcon}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
      onKeyDown={onKeyDown}
      hasText={hasText}
      {...rest}
    >
      {renderContent()}
    </FilledButton>
  );
};

Button.defaultProps = {
  text: "",
  borderRadius: "regular",
  type: "filled",
  disalbed: false,
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
  color: "primary",
  size: "small",
};

Button.propTypes = {
  text: PropTypes.string,
  /**
   * Icon before the text
   */
  leadingIcon: PropTypes.string,
  /**
   * Icon after the text
   */
  trailingIcon: PropTypes.string,
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
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default Button;
