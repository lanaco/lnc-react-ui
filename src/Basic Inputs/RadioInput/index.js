import { useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import {
  getColorRgbaValue,
  getComponentTypographyCss,
  getOutlineCss,
  getSizeValueWithUnits,
} from "../../_utils/utils";

const getLabelDirection = (direction) => {
  if (direction == "left") return "row-reverse";

  return "row";
};

const Input = styled.input`
  display: none;
`;

const Container = styled.label`
  min-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
  max-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${(props) => getLabelDirection(props.labelPosition)};
  gap: 0.5rem;
  ${(props) => props.disabled && "pointer-events: none;"}
  ${(props) =>
    getComponentTypographyCss(props.theme, "Radio", props.size, "enabled")};
  gap: 0.75rem;
  cursor: pointer;
  & input {
    display: none;
  }
`;

const StyledRadio = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  height: ${(props) =>
    props.theme.components.Radio.default.enabled.sizes[props.size]};
  width: ${(props) =>
    props.theme.components.Radio.default.enabled.sizes[props.size]};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;

  & svg {
    fill: ${(props) =>
      props.checked || props.indeterminate
        ? getColorRgbaValue(
            props.theme,
            "Radio",
            props.color,
            props.disabled ? "disabled" : "active",
            "background",
            "backgroundOpacity"
          )
        : "transparent"};
    & .outer-circle {
       stroke: ${props => getColorRgbaValue(
        props.theme,
        "Radio",
        props.color,
        props.checked 
          ? props.disabled
            ? "disabled"
            : "active"
          : "enabled",
        "border"
      )};
    }
  }
  &:focus {
    ${(props) => (!props.disabled && props.readOnly == false) && getOutlineCss(props.theme)};
  }
`;

const Label = styled.label`
  ${props => (!props.disabled && props.readOnly == false) && 'cursor: pointer'};
`;

const RadioInput = React.forwardRef((props, ref) => {
  const {
    id,
    name,
    tabIndex,
    checked,
    className,
    style,
    color,
    size,
    onChange,
    onFocus,
    onBlur,
    onClick,
    onKeyDown,
    value,
    label,
    labelPosition,
    disabled,
    readOnly,
    inputProps,
    ...rest
  } = props;

  const theme = useTheme();
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  var themeProps = { theme, size, color, disabled, labelPosition };

  const handleClick = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    if (onClick) onClick(e);

    if (readOnly || disabled) return;

    setIsChecked(true);
    if (onChange) onChange(e, id);
  };

  const handleOnKeyDown = (e) => {
    if (e.code === "Space") {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();

      if (readOnly || disabled) return;

      if (onChange) onChange(e, id);
    }
    if (onKeyDown) onKeyDown(e);
  };

  const handleOnBlur = (e) => {
    if (onBlur) onBlur(e);
  };

  const handleOnFocus = (e) => {
    if (onFocus) onFocus(e);
  };

  return (
    <Container
      {...themeProps}
      ref={ref}
      className={className}
      style={style}
      {...rest}
    >
      <Input
        disabled={disabled || readOnly}
        onChange={() => {}}
        type="radio"
        id={id}
        name={name}
        checked={isChecked}
        {...inputProps}
      />
      <StyledRadio
        {...themeProps}
        tabIndex={tabIndex}
        onKeyDown={handleOnKeyDown}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        onClick={handleClick}
        checked={isChecked}
        readOnly={readOnly}
      >
        <svg
          id="eqw1eBsfm9l1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
        >
          <ellipse
            className="outer-circle"
            rx="9.5"
            ry="9.5"
            transform="translate(10 10)"
            fillRule="evenodd"
            stroke={"red"}
          />
          {isChecked && (
            <ellipse
              rx="5"
              ry="5"
              transform="translate(10 10)"
              fill={"white"}
              strokeWidth="0"
            />
          )}
        </svg>
      </StyledRadio>
      <Label {...themeProps} onClick={handleClick} disalbed={disabled} readOnly={readOnly}>
        {label}
      </Label>
    </Container>
  );
});

RadioInput.defaultProps = {
  id: "",
  checked: false,
  disabled: false,
  readOnly: false,
  label: "",
  labelPosition: "right",
  tabIndex: 0,
  //------------------
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onClick: () => {},
  onKeyDown: () => {},
  //------------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
  inputProps: {},
};

RadioInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  label: PropTypes.string,
  labelPosition: PropTypes.oneOf(["right", "left"]),
  tabIndex: PropTypes.number,
  //-------------------------
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  //-------------------------
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "information",
    "neutral"
  ]),
  inputProps: PropTypes.any,
};

export default RadioInput;
