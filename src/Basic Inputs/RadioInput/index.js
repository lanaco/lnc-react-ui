import { useTheme } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const getLabelDirection = (direction) => {
  if (direction == "up") return "column-reverse";
  else if (direction == "down") return "column";
  else if (direction == "left") return "row-reverse";
  return "row";
}

const StyledRadio = styled.label`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.typography[props.size].gap};
  flex-direction: ${props => (getLabelDirection(props.labelPosition))};
`;

const StyledRadioInput = styled.input`
  margin: 0;
  padding: 0;
  appearance: none;
  background-color: #fff;
  font: inherit;

  width: ${props => (props.theme.typography[props.size].iconFontSize)};
  height: ${props => (props.theme.typography[props.size].iconFontSize)};
  border: ${props => ("0.15rem solid " + props.theme.palette[props.color].main)}; 
  border-radius: 50%;
  

  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
 
  background-color: ${props => (props.theme.palette[props.color].main)}; 
  &:disabled {
    background-color: ${props => (props.theme.palette.gray[900])}; 
    border: ${props => ("0.15rem solid " + props.theme.palette.gray[900])}; 
  };
  ::before {
    content: "";
    width: ${props => ("calc( " + props.theme.typography[props.size].iconFontSize + " - 0.65rem)")};
    height: ${props => ("calc( " + props.theme.typography[props.size].iconFontSize + " - 0.65rem)")};
    border-radius: 50%;
    transform: ${props => (props.checked ? "scale(1)" : "scale(0)")};
    transition: ${props => props.theme.transition.duration.short + " transform " + props.theme.transition.easing.easeInOut};
    box-shadow: ${props => ("inset 1em 1em " + props.theme.palette["white"].main)}; 
  };
`;

const RadioInput = React.forwardRef((props, ref) => {
  const {
    id,
    checked,
    className,
    style,
    color,
    size,
    onChange,
    value,
    label,
    labelPosition,
    disabled,
    readOnly,
    name,
    inputRef,
    preventDefault,
    ...rest
  } = props;

  const theme = useTheme();
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked])

  const handleChange = (e) => {
    console.log("handle change");
    if (preventDefault) e.preventDefault();

    setIsChecked(true)
    if (onChange) onChange();
  }

  return (
    <StyledRadio className={className} style={style} size={size} color={color} ref={ref} theme={theme} labelPosition={labelPosition}>
      <StyledRadioInput type="radio" value={value}
        readOnly={readOnly} disabled={disabled}
        inputRef={inputRef} checked={isChecked}
        onChange={handleChange}
        theme={theme} color={color} size={size}
        {...rest}
      />
      {label}
    </StyledRadio>
  )
});

RadioInput.defaultProps = {
  id: "",
  disabled: false,
  readOnly: false,
  onChange: () => { },
  checked: false,
  value: "",
  preventDefault: true,
  size: "small",
  label: "",
  labelPosition: "right",
  color: "primary",
  className: "",
  style: {},
  icon: null,
};

RadioInput.propTypes = {
  id: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  preventDefault: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  label: PropTypes.string,
  labelPosition: PropTypes.oneOf([
    "up",
    "down",
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
  className: PropTypes.string,
  style: PropTypes.object,
  icon: PropTypes.string,
  inputRef: PropTypes.func
};

export default RadioInput