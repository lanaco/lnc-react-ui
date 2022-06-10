import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import theme from "../../_utils/theme";
import styled from "@emotion/styled";
import Icon from "../../General/Icon";

const getCheckboxLabelPadding = (size) => {
  return { small: "0.1875rem", medium: "0.2875rem", large: "0.36875rem" }[size];
};

const getCheckboxSize = (size) => {
  return { small: "1.375rem", medium: "1.563rem", large: "1.75rem" }[size];
};

const getIndeterminateSquareSize = (size) => {
  return { small: "0.85rem", medium: "0.913rem", large: "1rem" }[size];
};

const getCheckSize = (size) => {
  return { small: "0.85rem", medium: "1.125rem", large: "1.225rem" }[size];
};

const getLabelDirection = (direction) => {
  if (direction == "up") return "column-reverse";
  if (direction == "down") return "column";
  if (direction == "left") return "row-reverse";

  return "row";
};

const Label = styled.label`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  position: relative;
  padding: ${(props) => getCheckboxLabelPadding(props.size)} 0.25rem;
  flex-direction: ${(props) => getLabelDirection(props.labelPosition)};
  box-sizing: border-box;

  & > .lnc-checkbox-input {
    position: relative;
    height: ${(props) => props.theme.typography[props.size].iconFontSize};
    width: ${(props) => props.theme.typography[props.size].iconFontSize};
  }

  & > .lnc-checkbox-input > input {
    height: ${(props) => props.theme.typography[props.size].iconFontSize};
    width: ${(props) => props.theme.typography[props.size].iconFontSize};
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    border: ${(props) =>
      props.icon
        ? "none"
        : "2px solid " + props.theme.palette[props.color].main};
    border-radius: 0.1875rem;
    outline: none;
    transition-duration: 0.3s;
    background-color: transparent;
    cursor: pointer;
    z-index: ${(props) => (props.focused ? "2" : "auto")};
  }

  & > .lnc-checkbox-input > input:checked + .lnc-checkmark {
    position: absolute;
    height: ${(props) =>
      props.indeterminate ? getIndeterminateSquareSize(props.size) : "0"};
    width: ${(props) =>
      props.indeterminate ? getIndeterminateSquareSize(props.size) : "0"};
    transform: ${(props) =>
      props.indeterminate ? "translate(-50%, -50%)" : "none"};
    top: ${(props) => (props.indeterminate ? "50%" : "0")};
    left: ${(props) => (props.indeterminate ? "50%" : "0")};
    background-color: ${(props) =>
      props.indeterminate
        ? props.disabled
          ? props.theme.palette.gray[900]
          : props.theme.palette[props.color].main
        : "none"};
  }

  & > .lnc-checkbox-input > input:checked + .lnc-checkmark::before {
    content: ${(props) => (props.indeterminate ? '""' : '"\\2713"')};
    display: block;
    text-align: center;
    color: ${(props) =>
      props.disabled
        ? props.theme.palette.gray[900]
        : props.theme.palette[props.color].main};
    position: absolute;

    left: 0.3125rem;
    top: 0.031px;

    font-weight: bold;
    font-size: ${(props) => getCheckSize(props.size)};
    height: 0px;
    width: 0px;

    transition: ${(props) =>
      props.theme.transition.duration.short +
      " transform " +
      props.theme.transition.easing.easeInOut};
  }
  & > .lnc-checkbox-input > input:focus {
    background-color: transparent;
  }
  & > .lnc-checkbox-input > input:disabled {
    border: ${(props) =>
      props.icon ? "none" : "2px solid " + props.theme.palette.gray[900]};
    color: ${(props) => props.theme.palette.gray[900]};
  }
  & > .lnc-checkbox-input > input:disabled + div > .lnc-checkmark::before {
    color: ${(props) => props.theme.palette.gray[900]};
  }
  & > .lnc-checkbox-input > .lnc-checkbox-icon-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
  }
  & > .lnc-checkbox-input > .lnc-checkbox-icon-wrapper > .lnc-checkbox-icon {
    min-height: unset;
    max-height: unset;
    max-width: unset;
    min-width: unset;
    height: ${(props) => getCheckboxSize(props.size)};
    width: ${(props) => getCheckboxSize(props.size)};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const LabelText = styled.div`
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  color: ${(props) => props.theme.palette[props.color].textDark};
`;

const CheckboxInput = styled.input`
  margin: 0;
`;

const CheckBox = React.forwardRef((props, ref) => {
  const {
    onChange,
    preventDefault,
    id,
    disabled,
    readOnly,
    indeterminate,
    checked,
    onFocus,
    onBlur,
    tabIndex,
    color,
    size,
    label,
    labelPosition,
    icon,
    className,
    style,
    inputRef,
    ...rest
  } = props;

  const theme = useTheme();
  const [checkBoxChecked, setCheckBoxChecked] = useState(checked);
  const [indeterminateState, setIndeterminateState] = useState(indeterminate);

  useEffect(() => {
    setCheckBoxChecked(checked);
  }, [checked]);

  useEffect(() => {
    setIndeterminateState(indeterminate);
  }, [indeterminate]);

  const handleChange = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    if (readOnly) return;
    if (indeterminateState) setIndeterminateState(false);

    setCheckBoxChecked(!checkBoxChecked);
    onChange(e, !checkBoxChecked, id);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

      if (readOnly) return;

      onChange(e, !checked, id);
    }
  };

  const handleOnBlur = (e) => {
    if (onBlur) onBlur(e, id);
  };

  const handleOnFocus = (e) => {
    if (onFocus) onFocus(e, id);
  };

  const themeProps = { theme, size, color };

  return (
    <Label
      {...themeProps}
      checked={checked}
      focused={true}
      indeterminate={indeterminateState}
      className={className}
      style={style}
      labelPosition={labelPosition}
      icon={icon}
      disabled={disabled}
      ref={ref}
    >
      <div className="lnc-checkbox-input">
        <CheckboxInput
          type="checkbox"
          ref={inputRef}
          checked={checkBoxChecked}
          onClick={handleChange}
          onChange={() => {}}
          onKeyDown={onKeyDown}
          tabIndex={tabIndex}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          disabled={disabled}
          readOnly={readOnly}
          {...rest}
        />
        {icon ? (
          <div className="lnc-checkbox-icon-wrapper">
            <Icon
              icon={icon}
              color={checkBoxChecked && !disabled ? color : "gray"}
              size={size}
              className="lnc-checkbox-icon"
            />
          </div>
        ) : (
          <span className="lnc-checkmark"></span>
        )}
      </div>
      {label && <LabelText {...themeProps}>{label}</LabelText>}
    </Label>
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
  preventDefault: true,
  //-------------------------
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  //-------------------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
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
  preventDefault: PropTypes.bool,
  //---------------------------------------------------------------
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  //---------------------------------------------------------------
  className: PropTypes.string,
  style: PropTypes.object,
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

export default CheckBox;
