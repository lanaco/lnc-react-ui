/* eslint-disable react/display-name */
import { useState, forwardRef } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const Container = styled.div`
  border: none;
  box-sizing: border-box;
  outline: 0;
  padding: 0.75rem;
  position: relative;
  width: fit-content;
`;

const Input = styled.input`
  &::-webkit-calendar-picker-indicator {
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    height: auto;
    left: 70px;
    position: absolute;
    right: 0;
    top: 0;
    width: auto;
  }
`;

const CustomDatePicker = forwardRef((props, ref) => {
  const {
    onChange = () => {},
    id = "",
    checked = false,
    onFocus,
    onBlur,
  } = props;

  var [focused, setFocused] = useState(false);

  const handleChange = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    onChange(e, !checked, id);
  };

  const onKeyDown = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    onChange(e, !checked, id);
  };

  const handleOnBlur = (e) => {
    setFocused(false);
    if (onBlur) onBlur(e, id);
  };

  const handleOnFocus = (e) => {
    setFocused(true);

    if (onFocus) onFocus(e, id);
  };

  return (
    <Container>
      <Input type="date" ref={ref} />
    </Container>
  );
});

CustomDatePicker.propTypes = {
  id: PropTypes.any,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  checked: PropTypes.bool,
  preventDefault: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  label: PropTypes.string,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "neutral",
    "gray",
  ]),
};

export default CustomDatePicker;
