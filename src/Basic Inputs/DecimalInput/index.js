import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import Icon from "../../General/Icon";

const paddingBySize = (size, hasIcon, iconPosition) => {
  if (size === "small") {
    if (hasIcon) {
      if (iconPosition == "right")
        return "0.325rem 2rem 0.325rem 0.375rem";

      return "0.325rem 0.375rem 0.325rem 2rem";
    }
    return "0.325rem 0.375rem";
  }
  if (size === "medium") {
    if (hasIcon) {
      if (iconPosition == "right")
        return "0.375rem 2.375rem 0.375rem 0.3875rem";

      return "0.375rem 0.3875rem 0.375rem 2.475rem";
    }
    return "0.3875rem 0.375rem";
  }
  if (size === "large") {
    if (hasIcon) {
      if (iconPosition == "right")
        return "0.375rem 2.75rem 0.375rem 0.422375rem";

        return "0.375rem 0.422375rem 0.375rem 2.85rem";
    }
    return "0.422375rem 0.375rem";
  }
};

const heightBySize = (size, hasText) => {
  if (size === "small") return `1.625rem`;
  if (size === "medium") return `2rem`;
  if (size === "large") return `2.375rem`;
};

const StyledTextInput = styled.input`
    appearance: none;
    outline: none;
    border: none;
    border-bottom: ${props => "0.125rem solid " + props.theme.palette[props.color].main};
    transition: all 250ms;
    display: inline-block;
    justify-content: center;
    cursor: text;
    padding: ${props => paddingBySize(props.size, props.icon ? true : false, props.iconPosition)};
    font-size: ${props => props.theme.typography[props.size].fontSize};
    background-color: ${props => props.theme.palette[props.color].lighter};
    color: ${props => props.theme.palette[props.color].textDark};
    border-radius: 0.125rem;
    width: 100%;
    box-sizing: border-box;
    min-height: ${props => heightBySize(props.size)};
    max-height: ${props => heightBySize(props.size)};
    font-family: ${props => props.theme.typography.fontFamily};
    &:disabled {
      background-color: ${props => props.theme.palette.gray[200]};
      border-bottom: ${props => "0.125rem solid " + props.theme.palette.gray[900]};
      color: ${props => props.theme.palette.gray.textLight};
      opacity: 0.7;
      cursor: default,
    };
    &:focus {
      background-color: ${props => props.theme.palette.common.white};
      color: ${props => props.theme.palette.common.black};
    };
`
const StyledInputWrapper = styled.div`
    display: flex;
    cursor: pointer;
    position: relative;
    & > .side-input-icon-lnc {
      position: absolute;
      background: transparent;
      right:  ${props => (props.iconPosition == "right" ? "0.2rem" : "unset")};
      left:  ${props => (props.iconPosition == "left" ? "0.2rem" : "unset")};
      cursor: pointer;
      display: ${props => (props.icon ? "flex" : "none")};
      justify-content: center;
      align-items: center;
    }
  `;

//===================================================

const DecimalInput = React.forwardRef((props, ref) => {
  const {
    color,
    id,
    disabled,
    readOnly,
    placeholder,
    preventDefault,
    className,
    style,
    size,
    value,
    defaultValue,
    onChange,
    onInput,
    onKeyDown,
    onBlur,
    autoFocus,
    icon,
    iconPosition,
    onIconClick,
    ...rest
  } = props;
  const theme = useTheme();
  const inputRef = useRef();

  const [text, setText] = useState(value ? "" : (defaultValue ? defaultValue : ""));
  const isFirst = useRef(true);


  useEffect(() => {
    if (value) {
      if (text !== value) setText(value === null ? "" : value);
    }
  }, [value]);

  const handleOnChange = (e) => {
    if (preventDefault) {
      e.preventDefault();
    }

    onChange(id, e.target.value);
  };

  const handleOnInput = (e) => {
    if (preventDefault) {
      e.preventDefault();
    }

    if (onInput) onInput(e);
    if (text != e.target.value)
      setText(e.target.value);
  };

  const handleOnBlur = (e) => {
    if (preventDefault) {
      e.preventDefault();
    }
    if (onChange) handleOnChange(e);
    if (onBlur) onBlur(e);
  };

  return (
    <StyledInputWrapper iconPosition={iconPosition} theme={theme} color={color} size={size} className={className} style={style} ref={ref} icon={icon}>
      <StyledTextInput
        {...{ theme, size, color }}
        onInput={handleOnInput}
        onBlur={handleOnBlur}
        disabled={disabled}
        readOnly={readOnly}
        value={text}
        type="number"
        placeholder={placeholder}
        ref={inputRef}
        icon={icon}
        iconPosition={iconPosition}
        autoFocus={autoFocus}
        {...rest}
      />
      <Icon icon={icon} className="side-input-icon-lnc" size={size} onClick={onIconClick} color={disabled ? 'gray' : color} />
    </StyledInputWrapper>
  )
});


DecimalInput.defaultProps = {
  id: "",
  disabled: false,
  readOnly: false,
  autoFocus: false,
  //onInput: () => { },
  className: "",
  preventDefault: true,
  size: "small",
  color: "primary",
  value: "",
  defaultValue: "",
  iconPosition: "right",
  onIconClick: () => { },
};

DecimalInput.propTypes = {
  id: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,//
  placeholder: PropTypes.string,//
  name: PropTypes.string,//
  autoFocus: PropTypes.bool,//
  defaultValue: PropTypes.string, //
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  preventDefault: PropTypes.bool,
  value: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf([
    "right",
    "left"
  ]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "gray",
  ]),
  onIconClick: PropTypes.func,
};

export default DecimalInput;