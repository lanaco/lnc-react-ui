import { useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const getLabelDirection = (direction) => {
  if (direction == "left") return "row-reverse";

  return "row";
};

const standardCssFields = ({ theme, color, size }) => {
  return `
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography[size].fontSize};
  `;
};


const Input = styled.input`
  display: none;
`;

const Container = styled.div`
  width: fit-content;
  height: ${(props) => props.theme.typography[props.size].inputSize};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${props => getLabelDirection(props.labelPosition)};
  gap: 0.5rem;
`;

const StyledRadio = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  border: 0.125rem solid
    ${(props) =>
      props.disabled
        ? props.theme.test_palette["disabled"][400]
        : props.theme.test_palette[props.color][400]};
  height: ${(props) => props.theme.typography[props.size].iconFontSize};
  width: ${(props) => props.theme.typography[props.size].iconFontSize};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.188rem;

  &:hover {
    box-shadow: ${(props) =>
      props.disabled
        ? ""
        : `0px 0px 6px -2px ${props.theme.test_palette[props.color][400]}`};
  }
  &:focus {
    outline: none;
    box-shadow: ${(props) => `0px 0px 8px -1px ${props.theme.test_palette[props.color][400]}`};
  }

  & .checkmark {
    box-sizing: border-box;
    border-radius: 50%;
    height: ${props => props.checked ? "100%" : "0"};
    width: ${props => props.checked ? "100%" : "0"};;
    background-color: ${(props) =>
      props.disabled
        ? props.theme.test_palette["disabled"][400]
        : props.theme.test_palette[props.color][400]};
  }
`;

const Label = styled.label`
  ${(props) => standardCssFields(props)}
`;

const RadioInput = React.forwardRef((props, ref) => {
  const {
    id,
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

    if(onClick) onClick(e);

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
      id={id}
      {...rest}
    >
      <Input
        disabled={disabled}
        readOnly={readOnly}
        onChange={() => {}}
        type="radio"
        id={id}
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
      >
        <div className="checkmark"></div>
      </StyledRadio>
      <Label {...themeProps} htmlFor={id}>
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
  inputProps: { },
};

RadioInput.propTypes = {
  id: PropTypes.string.isRequired,
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
    "info",
  ]),
  inputProps: PropTypes.any,
};

export default RadioInput;
