import { useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const standardCssFields = ({ theme, color, size }) => {
  var height = { small: "1.375rem", medium: "1.75rem", large: "2.125rem" }[
    size
  ];

  return `
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography[size].fontSize};
    min-height: ${height};
    max-height: ${height};
  `;
};

const lineHeight = {
  small: "1.375rem",
  medium: "1.75rem",
  large: "2.125rem",
};

const paddingLeft = {
  small: "2.125rem",
  medium: "2.625rem",
  large: "3rem",
};

const outerCircleDimensions = {
  small: "1rem",
  medium: "1.375rem",
  large: "1.75rem",
};

const innerCircleDimensions = {
  small: "0.625rem",
  medium: "0.875rem",
  large: "1.125rem",
};

const outerCircleTop = {
  small: "0.0625rem",
  medium: "0.0625rem",
  large: "0.0625rem",
};

const outerCircleLeft = {
  small: "0.1875rem",
  medium: "0.1875rem",
  large: "0.1875rem",
};

const innerCircleTop = {
  small: "0.375rem",
  medium: "0.4375rem",
  large: "0.5rem",
};

const innerCircleLeft = {
  small: "0.5rem",
  medium: "0.5625rem",
  large: "0.625rem",
};

const Input = styled.input`
  &:checked,
  &:not(:checked) {
    position: absolute;
    left: -9999px;
  }

  &:checked + label,
  &:not(:checked) + label {
    box-sizing: border-box;
    width: 100%;
    position: relative;
    padding-left: ${(props) => paddingLeft[props.size]};
    cursor: pointer;
    line-height: ${(props) => lineHeight[props.size]};
    display: inline-block;
    color: ${(props) =>
      props.disabled
        ? props.theme.test_palette.light[500]
        : props.theme.test_palette.dark[500]};
    font-family: ${(props) => props.theme.typography.fontFamily};
    font-size: ${(props) => props.theme.typography[props.size].fontSize};
  }

  &:checked + label:hover::before,
  &:not(:checked) + label:hover::before {
    box-shadow: ${(props) =>
      props.disabled
        ? ""
        : props.focused
        ? `0px 0px 8px -1px ${props.theme.test_palette[props.color][400]}`
        : `0px 0px 6px -2px ${props.theme.test_palette[props.color][400]}`};
  }

  &:checked + label::before,
  &:not(:checked) + label::before {
    content: "";
    position: absolute;
    left: ${(props) => outerCircleLeft[props.size]};
    top: ${(props) => outerCircleTop[props.size]};
    width: ${(props) => outerCircleDimensions[props.size]};
    height: ${(props) => outerCircleDimensions[props.size]};
    border: 2px solid
      ${(props) =>
        props.disabled
          ? props.theme.test_palette.light[500]
          : props.theme.test_palette[props.color][400]};
    border-radius: 100%;
    background: #fff;

    box-shadow: ${(props) =>
      props.disabled
        ? ""
        : props.focused
        ? `0px 0px 8px -1px ${props.theme.test_palette[props.color][400]}`
        : ""};
  }

  &:checked + label::after,
  &:not(:checked) + label::after {
    content: "";
    width: ${(props) => innerCircleDimensions[props.size]};
    height: ${(props) => innerCircleDimensions[props.size]};
    background: ${(props) =>
      props.disabled
        ? props.theme.test_palette.light[500]
        : props.theme.test_palette[props.color][400]};
    position: absolute;
    top: ${(props) => innerCircleTop[props.size]};
    left: ${(props) => innerCircleLeft[props.size]};
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }

  &:not(:checked) + label::after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  &:checked + label::after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
`;

const Container = styled.div`
  padding: 4px;
  width: fit-content;
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
    value,
    label,
    disabled,
    readOnly,
    preventDefault,
    ...rest
  } = props;

  const theme = useTheme();
  const [isChecked, setIsChecked] = useState(checked);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  var themeProps = { theme, size, color, disabled, focused };

  const handleChange = (e) => {
    if (preventDefault) e.preventDefault();

    setIsChecked(true);
    if (onChange) onChange(e, id);
  };

  var tabIndexMap = {};
  if (tabIndex || tabIndex === 0) tabIndexMap = { tabIndex };

  return (
    <Container>
      <Input
        {...tabIndexMap}
        ref={ref}
        onChange={handleChange}
        onFocus={(e) => {
          setFocused(true);
          if (onFocus) onFocus(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          if (onBlur) onBlur(e);
        }}
        type="radio"
        id={id}
        checked={isChecked}
        {...themeProps}
        {...rest}
      />
      <Label {...themeProps} htmlFor={id}>
        {label}
      </Label>
    </Container>
  );
});

RadioInput.defaultProps = {
  id: "",
  tabIndex: undefined,
  checked: false,
  disabled: false,
  readOnly: false,
  label: "",
  //------------------
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  //------------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
};

RadioInput.propTypes = {
  id: PropTypes.string.isRequired,
  tabIndex: PropTypes.number,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  label: PropTypes.string,
  //-------------------------
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
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
};

export default RadioInput;
