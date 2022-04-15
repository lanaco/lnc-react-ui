import React, { useEffect, useState } from 'react';
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const getSize = (size) => {
  if(size == "small") return "3rem";
  else if(size == "medium") return "4.25rem";
  else if (size == "large") return "6rem";
}

const StyledColorInput = styled.input`
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
  height: ${props => "calc("+props.theme.typography[props.size].fontSize+" + 1rem)"};
  width: ${props =>getSize(props.size)};
`;

const ColorInput = React.forwardRef((props, ref) => {
  const {
    id,
    name,
    value,
    size,
    readOnly,
    disabled,
    onChange,
    preventDefault,
    ...rest
  } = props;
  const theme = useTheme();

  const [val, setVal] = useState(value);

  useEffect(() => {
    setVal(value);
  }, [value])
  

  const handleOnChange = (e) => {
    if(preventDefault) e.preventDefault();

    setVal(e.target.value);
    if(onChange) onChange(id, e.target.value)
  }

  return (
    <StyledColorInput ref={ref} type="color" id={id} name={name} size={size} readOnly={readOnly} value={val} disabled={disabled} onChange={handleOnChange} theme={theme} {...rest}/>
  )
});

ColorInput.defaultProps = {
  id: "",
  disabled: false,
  readOnly: false,
  className: "",
  preventDefault: true,
  size: "small",
  value: "",
};

ColorInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  preventDefault: PropTypes.bool,
  value: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default ColorInput