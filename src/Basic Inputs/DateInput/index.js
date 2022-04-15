import React, { useEffect, useRef } from 'react';
import styled from "@emotion/styled";
import Icon from '../../General/Icon';
import PropTypes from "prop-types";
import TextInput from '../TextInput';
import { useTheme } from '@emotion/react';

const DateInputToggle = styled.label`
  display: inline-block;
  position: relative;
  display: flex;
  gap: 12px;

  & > .datePicker-toggle-button-lnc {
    // position: absolute;
    // left: 0;
    // top: 0;
    // width: 100%;
    // height: 100%;
    display: flex;
    align-items: center;
  }

  // & > .datepicker-input {
  //   position: absolute;
  //   left: 0;
  //   top: 0;
  //   width: 100%;
  //   height: 100%;
  //   cursor: pointer;
  //   box-sizing: border-box;
  // }
  // & > .datepicker-input::-webkit-calendar-picker-indicator {
  //   position: absolute;
  //   left: 0;
  //   top: 0;
  //   width: 100%;
  //   height: 100%;
  //   margin: 0;
  //   padding: 0;
  //   cursor: pointer;
  // }

`;


const DateInput = ({
  id,
  disabled,
  readOnly,
  onChange,
  preventDefault,
  size,
  color,
  className,
  value,
  style,
  min,
  max,
  autoFocus,
  ...rest
}) => {
  return (
    <DateInputToggle style={style} className={className} id={id} >
      <Icon icon="calendar" className="datePicker-toggle-button-lnc" size={size} color={disabled ? 'gray' : color} />
      <TextInput type="date" min={min} max={max} readOnly={readOnly} autoFocus={autoFocus}
        className="datepicker-input-lnc" disabled={disabled} preventDefault={preventDefault} size={size} color={color} value={value} {...rest}  />
    </DateInputToggle>
  )
};

DateInput.defaultProps = {
  id: "",
  disabled: false,
  onChange: () => { },
  className: "",
  preventDefault: true,
  size: "small",
  color: "primary",
  value: "",
  style: {},
  readOnly: false,
  autoFocus: false,
};

DateInput.propTypes = {
  id: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  preventDefault: PropTypes.bool,
  value: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  autoFocus: PropTypes.bool,
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

export default DateInput