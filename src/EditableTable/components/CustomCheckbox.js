import React from "react";
import PropTypes from "prop-types";
import { Global, css } from "@emotion/react";
import theme from "../../_utils/theme";
import styled from "@emotion/styled";

const CheckBox = styled.input`
  height: 16px;
  width: 16px;
  cursor: pointer;
  margin: 9.5px 6px 9.5px 6px;

  &:disabled {
    cursor: default;
  }
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
    if (onBlur) onBlur(e, id);
  };

  const handleOnFocus = (e) => {
    if (onFocus) onFocus(e, id);
  };

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
  theme: theme,
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
  theme: PropTypes.object.isRequired,
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
