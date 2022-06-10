import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import theme from "../../_utils/theme";

const getSize = (size) => {
  return { small: "1.875rem", medium: "2.25rem", large: "2.625rem" }[size];
};

const StyledColorInput = styled.input`
  display: inline-block;
  box-sizing: border-box;
  outline: none;
  padding: 0;
  margin: 0;
  border-radius: 0.1875rem;
  border: 0.125rem solid ${(props) =>
    props.theme.test_palette[props.color][400]};
  padding: 0 0.1875rem;
  background-color: transparent;
  max-height: ${(props) => getSize(props.size)};
  min-height: ${(props) => getSize(props.size)};
  width: 100%;
  cursor: pointer;

  &:hover:enabled {
    box-shadow: 0px 0px 0.375rem -0.125rem ${(props) =>
      props.theme.test_palette[props.color][400]};
  }

  &:focus:enabled {
    box-shadow: 0px 0px 0.5rem -0.0625rem ${(props) =>
      props.theme.test_palette[props.color][400]};
  }

  &:disabled {
    cursor: default;
    border: 0.125rem solid ${(props) => props.theme.test_palette.light[500]}};
  }
`;

const ColorInput = React.forwardRef((props, ref) => {
  const {
    id,
    name,
    value,
    size,
    className,
    style,
    color,
    readOnly,
    disabled,
    onChange,
    onFocus,
    onBlur,
    preventDefault,
    ...rest
  } = props;
  const theme = useTheme();

  const [val, setVal] = useState(value);

  useEffect(() => {
    setVal(value);
  }, [value]);

  const handleOnChange = (e) => {
    if (preventDefault) e.preventDefault();

    setVal(e.target.value);
    if (onChange) onChange(id, e.target.value);
  };

  return (
    <StyledColorInput
      ref={ref}
      type="color"
      id={id}
      name={name}
      readOnly={readOnly}
      value={val}
      disabled={disabled}
      onChange={readOnly ? () => {} : handleOnChange}
      onBlur={readOnly ? () => {} : onBlur}
      onFocus={readOnly ? () => {} : onFocus}
      theme={theme}
      size={size}
      color={color}
      className={className}
      style={style}
      {...rest}
    />
  );
});

ColorInput.defaultProps = {
  id: "",
  value: "",
  disabled: false,
  readOnly: false,
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

ColorInput.propTypes = {
  id: PropTypes.any.isRequired,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
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
    "danger",
    "warning",
    "disabled",
  ]),
};

export default ColorInput;
