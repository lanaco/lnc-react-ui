import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

const CheckBox = styled.input`
  height: 16px;
  width: 16px;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }
`;

const Label = styled.label`
  display: inline-flex;
  cursor: pointer;
  position: relative;

  & > input {
    height: 22px;
    width: 22px;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    border: 2px solid ${theme.palette.primary.main};
    border-radius: 3px;
    outline: none;
    transition-duration: 0.3s;
    background-color: transparent;
    cursor: pointer;
    z-index: ${(props) => (props.focused ? "2" : "auto")};
  }

  & > input:checked + span::before {
    content: ${'"\\2713"'};
    display: block;
    text-align: center;
    color: ${theme.palette.primary.main};
    position: absolute;
    left: 6px;
    top: 0.5px;
    font-weight: bold;
    font-size: 18px;
    height: 0px;
    width: 0px;
  }

  & > input:focus {
    background-color: transparent;
  }

  & > input:disabled {
    border: 2px solid ${theme.palette.gray[900]};
    color: ${theme.palette.gray[900]};
  }

  & > input:disabled + span::before {
    color: ${theme.palette.gray[900]};
  }
`;

const Checkbox = styled.input`
  margin: 2px;
`;

const CustomCheckbox = React.forwardRef((props, ref) => {
  const {
    onChange,
    preventDefault,
    id,
    disabled,
    className,
    checked,
    label,
    onFocus,
    onBlur,
    tabIndex,
  } = props;

  var [focused, setFocused] = useState(false);
  const theme = useTheme();

  const handleChange = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    onChange(e, !checked, id);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      onChange(e, !checked, id);
    }
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
    <Label checked={checked} focused={focused} theme={theme}>
      <Checkbox
        type="checkbox"
        theme={theme}
        ref={ref}
        checked={checked}
        onClick={handleChange}
        onChange={() => {}}
        onKeyDown={onKeyDown}
        tabIndex={tabIndex}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        disabled={disabled}
      />
      <span></span>
    </Label>
  );

  return (
    <CheckBox
      ref={ref}
      type="checkbox"
      checked={checked}
      onClick={handleChange}
      onChange={() => {}}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      disabled={disabled}
    />
  );
});

CustomCheckbox.defaultProps = {
  id: "",
  disabled: false,
  onChange: () => {},
  className: "",
  checked: false,
  preventDefault: true,
  size: "small",
  label: "",
  color: "primary",
};

CustomCheckbox.propTypes = {
  id: PropTypes.any.isRequired,
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
    "gray",
  ]),
};

export default CustomCheckbox;
