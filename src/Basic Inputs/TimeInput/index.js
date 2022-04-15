import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const TimeInput = React.forwardRef((props, ref) => {
  const {
    value,
    id,
    name,
    step,
    onChange,
    preventDefault,
    pattern,
    className,
    style,
    disabled,
    readOnly,
    autoFocus,
    size,
    color,
    ...rest
  } = props;
  const [time, setTime] = useState(value);

  const handleOnChange = (e) => {
    if (preventDefault) e.preventDefault;

    setTime(e.target.value);
    if (onChange) onChange();
  }

  return (
    <input type="time" id={id} ref={ref} value={time}  name={name} step={step} onChange={handleOnChange} autoFocus={autoFocus}
    pattern={pattern} className={className} style={style} disabled={disabled} readOnly={readOnly} {...rest} 
     />
  )
});

TimeInput.defaultProps = {
  id: "",
  disabled: false,
  readOnly: false,
  autoFocus: false,
  className: "",
  preventDefault: true,
  size: "small",
  color: "primary",
  value: "",
  onChange: () => { },
};

TimeInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  autoFocus: PropTypes.bool,
  step: PropTypes.number,
  pattern: PropTypes.string,
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  preventDefault: PropTypes.bool,
  value: PropTypes.string,
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

export default TimeInput