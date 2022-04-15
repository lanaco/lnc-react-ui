import React, { useEffect, useRef, useState } from "react";
import "../../Base/fontawesome/css/fontawesome.css";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import Icon from "../../General/Icon";

const paddingBySize = (size, iconPosition) => {
  if (size === "small") {
    if (iconPosition == "right")
      return "0.325rem 2rem 0.325rem 0.375rem";

    return "0.325rem 0.375rem 0.325rem 2rem";
  }
  if (size === "medium") {
    if (iconPosition == "right")
      return "0.375rem 2.375rem 0.375rem 0.3875rem";

    return "0.375rem 0.3875rem 0.375rem 2.475rem";
  }
  if (size === "large") {
    if (iconPosition == "right")
      return "0.375rem 2.75rem 0.375rem 0.422375rem";

    return "0.375rem 0.422375rem 0.375rem 2.85rem";
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
    padding: ${props => paddingBySize(props.size, props.iconPosition)};
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
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;

//===================================================
const PasswordInput = React.forwardRef((props, ref) => {
  const {
    onChange,
    onInput,
    onBlur,
    preventDefault,
    id,
    disabled,
    readOnly,
    autoFocus,
    size,
    color,
    autoComplete,
    value,
    tooltip,
    className,
    style,
    iconPosition,
    placeholder,
    ...rest
  } = props;
  const theme = useTheme();
  const [locked, setLocked] = useState(true);
  const [text, setText] = useState(value);
  const inputRef = useRef();

  const handleLockUnlock = () => {
    setLocked(!locked);

    inputRef.current.focus();
   
  }

  useEffect(() => {
    inputRef.current.selectionStart = text.length;
    inputRef.current.selectionEnd = text.length;
  }, [locked])

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
    <>
      <StyledInputWrapper iconPosition={iconPosition} theme={theme} color={color} size={size} className={className} style={style} ref={ref}>
        <StyledTextInput
          {...{ theme, size, color }}
          onInput={handleOnInput}
          onBlur={handleOnBlur}
          disabled={disabled}
          readOnly={readOnly}
          value={text}
          type={locked ? "password" : "text"}
          placeholder={placeholder}
          ref={inputRef}
          iconPosition={iconPosition}
          autoFocus={autoFocus}
          autoComplete={autoComplete ? "true" : "false"}
          {...rest}
        />
        <Icon icon={locked ? "eye" : "eye-slash"} className="side-input-icon-lnc" size={size} onClick={disabled ? () => { } : handleLockUnlock} color={disabled ? 'gray' : color} />
      </StyledInputWrapper>


    </>
  );
});

PasswordInput.defaultProps = {
  id: "",
  disabled: false,
  readOnly: false,
  autoFocus: false,
  onChange: () => { },
  handleForgotPassword: () => { },
  className: "",
  style: {},
  preventDefault: true,
  size: "small",
  color: "primary",
  autoComplete: false,
  tooltip: "",
  value: "",
  iconPosition: "right",
};

PasswordInput.propTypes = {
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  onBlur: PropTypes.func,
  handleForgotPassword: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  placeholder: PropTypes.string,
  tooltip: PropTypes.string,
  value: PropTypes.string,
  preventDefault: PropTypes.bool,
  autoComplete: PropTypes.bool,
  iconPosition: PropTypes.oneOf([
    "right",
    "left",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "gray",
  ]),
};

export default PasswordInput;
