import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import Icon from "../../General/Icon";

const getLabelDirection = (direction) => {
  if (direction == "up") return "column-reverse";
  if (direction == "down") return "column";
  if (direction == "left") return "row-reverse";

  return "row";
};

const standardCssFields = ({ theme, color, size }) => {
  return `
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography[size].fontSize};
  `;
};

const CheckBoxContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: ${(props) => getLabelDirection(props.direction)};
  width: max-content;
  gap: 0.5rem;
  ${(props) => standardCssFields(props)}
  align-items: center;
  & > label {
    color: ${(props) =>
      props.disabled ? props.theme.test_palette["disabled"][400] : "unset"};
    cursor: pointer;
    display: ${(props) => (props.label ? "unset" : "none")};
  }

  & > input {
    display: none;
  }
`;

const StyledCheckBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(props) =>
    `calc(${props.theme.typography[props.size].iconFontSize} - 0.5rem)`};
  width: ${(props) =>
    `calc(${props.theme.typography[props.size].iconFontSize} - 0.5rem)`};
  border-radius: 0.1875rem;
  cursor: pointer;
  padding: 0.125rem;
  border: ${(props) =>
    props.icon
      ? "none"
      : " 0.125rem solid " +
        (props.disabled
          ? props.theme.test_palette["disabled"][400]
          : props.theme.test_palette[props.color][400])};
  & > .checkmark {
    height: ${(props) =>
      props.indeterminate ? "2px" : (props.checked ? "100%" : "0")};
    width: ${(props) =>
      props.indeterminate ? "90%" : (props.checked ? "100%" : "0")};
    background-color: ${(props) =>
      props.disabled
        ? props.theme.test_palette["disabled"][400]
        : props.theme.test_palette[props.color][400]};
  }

  &:hover {
    box-shadow: 0px 0px 0.375rem -0.125rem ${(props) => (props.disabled ? "unset" : props.theme.test_palette[props.color][400])};
  }
`;

const CheckBox = React.forwardRef((props, ref) => {
  const {
    id,
    checked,
    indeterminate,
    disabled,
    readOnly,
    label,
    labelPosition,
    icon,
    tabIndex,
    preventDefault,
    //----------------
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    //----------------
    color,
    size,
    className,
    style,
    inputRef,
    inputProps,
    ...rest
  } = props;

  const theme = useTheme();
  var themeProps = { theme, size, color };

  const [checkBoxChecked, setCheckBoxChecked] = useState(checked);
  const [indeterminateState, setIndeterminateState] = useState(indeterminate);

  useEffect(() => {
    setCheckBoxChecked(checked);
  }, [checked]);

  useEffect(() => {
    setIndeterminateState(indeterminate);
  }, [indeterminate]);

  const handleClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    if (readOnly || disabled) return;
    if (indeterminateState) setIndeterminateState(false);

    setCheckBoxChecked(!checkBoxChecked);
    onChange(e, !checkBoxChecked);
  };

  const handleOnKeyDown = (e) => {
    if (e.code === "Space") {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

      if (readOnly || disabled) return;
      if (indeterminateState) setIndeterminateState(false);

      setCheckBoxChecked(!checkBoxChecked);
      onChange(e, !checkBoxChecked);
    }
    if (onKeyDown) onKeyDown(e);
  };

  const handleOnBlur = (e) => {
    if (onBlur) onBlur(e, id);
  };

  const handleOnFocus = (e) => {
    if (onFocus) onFocus(e, id);
  };

  return (
    <CheckBoxContainer
      {...themeProps}
      direction={labelPosition}
      disabled={disabled}
      ref={ref}
      className={className}
      style={style}
      label={label}
    >
      <input
        ref={inputRef}
        type="checkbox"
        checked={checkBoxChecked}
        disabled={disabled}
        readOnly={readOnly}
        onChange={() => {}}
        {...inputProps}
      />
      {icon ? (
        <Icon
          icon={icon}
          color={checkBoxChecked && !disabled ? color : "disabled"}
          size={size}
          className="lnc-checkbox-icon"
          onClick={handleClick}
          tabIndex={tabIndex}
          onKeyDown={handleOnKeyDown}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          {...rest}
        />
      ) : (
        <StyledCheckBox
          {...themeProps}
          indeterminate={indeterminateState}
          disabled={disabled}
          onClick={handleClick}
          checked={checkBoxChecked}
          tabIndex={tabIndex}
          onKeyDown={handleOnKeyDown}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          {...rest}
        >
          <div className="checkmark"></div>
        </StyledCheckBox>
      )}
      <label onClick={handleClick}>{label}</label>
    </CheckBoxContainer>
  );
});

CheckBox.defaultProps = {
  id: "",
  checked: false,
  disabled: false,
  readOnly: false,
  label: "",
  indeterminate: false,
  labelPosition: "right",
  icon: null,
  tabIndex: 0,
  preventDefault: true,
  //-------------------------
  onChange: (e, value) => {},
  onBlur: () => {},
  onFocus: () => {},
  onKeyDown: () => {},
  //-------------------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
  inputProps: { },
};

CheckBox.propTypes = {
  id: PropTypes.any.isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  label: PropTypes.string,
  indeterminate: PropTypes.bool,
  labelPosition: PropTypes.oneOf(["up", "down", "right", "left"]),
  icon: PropTypes.string,
  tabIndex: PropTypes.number,
  preventDefault: PropTypes.bool,
  //---------------------------------------------------------------
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  //---------------------------------------------------------------
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
  ]),
  inputProps: PropTypes.object,
};

export default CheckBox;
