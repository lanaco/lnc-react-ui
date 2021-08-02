import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../_utils/theme";

const getLabelProps = () => {
  return {
    small: {
      width: "2.46875rem",
      height: "1.375rem",
      padding: "0.125rem 0.125rem",
    },
    medium: {
      width: "2.96875rem",
      height: "1.625rem",
      padding: "0.1875rem 0.125rem",
    },
    large: {
      width: "3.4375rem",
      height: "1.875rem",
      padding: "0.25rem 0.125rem",
    },
  };
};

const getSpanProps = () => {
  return {
    small: {
      width: "2.125rem",
      height: "0.9375rem",
      top: "0.28125rem",
      left: "0.15625rem",
      before_width: "1.0625rem",
      before_height: "1.0625rem",
    },
    medium: {
      width: "2.6875rem",
      height: "1.1875rem",
      top: "0.325rem",
      left: "0.15625rem",
      before_width: "1.3125rem",
      before_height: "1.3125rem",
    },
    large: {
      width: "3.125rem",
      height: "1.4375rem",
      top: "0.41875rem",
      left: "0.15625rem",
      before_width: "1.5625rem",
      before_height: "1.5625rem",
    },
  };
};

const Label = styled.label((props) => {
  return {
    display: "inline-block",
    position: "relative",
    ...getLabelProps()[props.size],

    "& input": {
      opacity: "0",
      width: "0",
      height: "0",
    },
  };
});

const Input = styled.input`
  &:checked + span {
    background-color: ${(props) => props.theme.palette[props.color].main};
  }

  &:focus + span {
    box-shadow: 0 0 0.0625rem
      ${(props) => props.theme.palette[props.color].main};
  }

  &:checked + span:before {
    transform: translateX(90%);
  }

  &:checked:disabled + span {
  }

  &:checked:disabled + span:before {
    backround-color: red;
  }

  &:disabled + span {
    position: absolute;
    cursor: pointer;
    top: ${(props) => getSpanProps()[props.size].top};
    left: ${(props) => getSpanProps()[props.size].left};
    right: 0;
    bottom: 0;
    background-color: ${(props) => props.theme.palette.gray[900]};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    height: ${(props) => getSpanProps()[props.size].height};
    width: ${(props) => getSpanProps()[props.size].width};
    border: 0.0625rem solid ${(props) => props.theme.palette.gray[1000]};
    border-radius: 0.125rem;
  }

  &:disabled + span:before {
    position: absolute;
    content: "";
    height: ${(props) => getSpanProps()[props.size].before_height};
    width: ${(props) => getSpanProps()[props.size].before_width};
    left: 0.0625rem;
    top: -0.125rem;
    background-color: ${(props) => props.theme.palette.gray[400]};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border: 0.0625rem solid ${(props) => props.theme.palette.gray[1000]};
    border-radius: 0.125rem;
  }

  &:checked:disabled + span:before {
    position: absolute;
    content: "";
    height: ${(props) => getSpanProps()[props.size].before_height};
    width: ${(props) => getSpanProps()[props.size].before_width};
    left: 0.0625rem;
    top: -0.125rem;
    background-color: ${(props) => props.theme.palette.gray[400]};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border: 0.0625rem solid ${(props) => props.theme.palette.gray[1000]};
    border-radius: 0.125rem;
  }
`;

const Span = styled.span`
  position: absolute;
  cursor: pointer;
  top: ${(props) => getSpanProps()[props.size].top};
  left: ${(props) => getSpanProps()[props.size].left};
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.palette.gray[700]};
  -webkit-transition: 0.4s;
  transition: 0.4s;
  height: ${(props) => getSpanProps()[props.size].height};
  width: ${(props) => getSpanProps()[props.size].width};
  border: 0.0625rem solid ${(props) => props.theme.palette[props.color].main};
  border-radius: 0.125rem;

  &:before {
    position: absolute;
    content: "";
    height: ${(props) => getSpanProps()[props.size].before_height};
    width: ${(props) => getSpanProps()[props.size].before_width};
    left: 0.0625rem;
    top: -0.125rem;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border: 0.0625rem solid ${(props) => props.theme.palette[props.color].main};
    border-radius: 0.125rem;
  }
`;

const ToggleSwitch = (props) => {
  const {
    id,
    value,
    disabled,
    onChange,
    theme,
    size,
    color,
    className,
    preventDefault,
  } = props;

  function handleChange(e) {
    if (preventDefault) e.preventDefault();
    onChange(id, e.target.checked);
  }

  let themeProps = { theme, size, color };

  return (
    <Label {...themeProps} className={className}>
      <Input
        {...themeProps}
        type="checkbox"
        onChange={handleChange}
        checked={value ? "checked" : ""}
        disabled={disabled}
      />
      <Span {...themeProps}></Span>
    </Label>
  );
};

ToggleSwitch.defaultProps = {
  id: "",
  disabled: false,
  onChange: () => {},
  className: "",
  preventDefault: true,
  size: "small",
  color: "primary",
  theme: theme,
};

ToggleSwitch.propTypes = {
  theme: PropTypes.object.isRequired,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  preventDefault: PropTypes.bool,
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

export default ToggleSwitch;
