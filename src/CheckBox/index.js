import React from "react";
import PropTypes from "prop-types";
import { Global, css } from "@emotion/react";
import theme from "../_utils/theme";

const getCheckboxCss = (props) => {
  var left,
    top,
    width,
    height,
    checkWidth,
    checkHeight,
    margin,
    marginLeft,
    padingLeft,
    paddingTop;

  var hasLabel = props.label !== "";

  if (props.size === "small") {
    left = "0.4245rem";
    top = "0.08rem";
    checkWidth = "0.13rem";
    checkHeight = "0.7rem";
    margin = "0.15625rem";
    marginLeft = "0";
    padingLeft = hasLabel ? "1.875rem" : "1.0625rem";
    paddingTop = hasLabel ? "" : "padding-top: 1.0625rem;";
    width = "1.188rem";
    height = "1.188rem";
  }

  if (props.size === "medium") {
    left = "0.4845rem";
    top = "0.08rem";
    checkWidth = "0.22rem";
    checkHeight = "0.9rem";
    margin = "0.21875rem";
    marginLeft = "0";
    padingLeft = hasLabel ? "2.1875rem" : "1.375rem";
    paddingTop = hasLabel ? "" : "padding-top: 1.3125rem;";
    width = "1.4375rem";
    height = "1.4375rem";
  }

  if (props.size === "large") {
    left = "0.59rem";
    top = "0.08rem";
    checkWidth = "0.28rem";
    checkHeight = "1.1rem";
    margin = "0.21875rem";
    marginLeft = "0";
    padingLeft = hasLabel ? "2.5rem" : "1.625rem";
    paddingTop = hasLabel ? "" : "padding-top: 1.6875rem;";
    width = "1.6875rem";
    height = "1.6875rem";
  }

  return css`
    .c-${props.id}-container {
      font-family: ${props.theme.typography.fontFamily};
      display: inline-block;
      position: relative;
      padding: 0.25rem;
      padding-left: ${padingLeft};
      ${paddingTop}
      cursor: pointer;
      font-size: ${props.theme.typography[props.size].fontSize};
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      margin: ${margin};
      margin-left: ${marginLeft};
      cursor: pointer;
    }

    /* Hide the browser's default checkbox */
    .c-${props.id}-container input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    /* Create a custom checkbox */
    .c-${props.id}-checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: ${height};
      width: ${width};
      background-color: #eee;
      border: 0.0625rem solid ${props.theme.palette[props.color].main};
      border-radius: 2px;
      transition: all 200ms ease;
    }

    /* On mouse-over, add a grey background color */
    .c-${props.id}-container:hover input ~ .c-${props.id}-checkmark {
      cursor: pointer;
    }

    .c-${props.id}-container:hover input:disabled ~ .c-${props.id}-checkmark {
      background-color: ${props.theme.palette.gray[900]};
      cursor: default;
    }

    .c-${props.id}-container input:disabled ~ .c-${props.id}-checkmark {
      background-color: ${props.theme.palette.gray[900]};
    }

    /* When the checkbox is checked, add a blue background */
    .c-${props.id}-container input:checked ~ .c-${props.id}-checkmark {
      background-color: ${props.theme.palette[props.color].main};
    }

    .c-${props.id}-container input:checked:disabled ~ .c-${props.id}-checkmark {
      background-color: ${props.theme.palette.gray[900]};
      border: 0.0625rem solid ${props.theme.palette.gray.textLight};
      cursor: default;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .c-${props.id}-checkmark:after {
      content: "";
      position: absolute;
      display: none;
    }

    /* Show the checkmark when checked */
    .c-${props.id}-container input:checked ~ .c-${props.id}-checkmark:after {
      display: block;
    }

    /* Style the checkmark/indicator */
    .c-${props.id}-container .c-${props.id}-checkmark:after {
      left: ${left};
      top: ${top};
      width: ${checkWidth};
      height: ${checkHeight};
      border: solid white;
      border-width: 0 0.21875rem 0.21875rem 0;
      -webkit-transform: rotate(35deg);
      -ms-transform: rotate(35deg);
      transform: rotate(35deg);
    }
  `;
};

const CheckBox = (props) => {
  const {
    onChange,
    preventDefault,
    id,
    disabled,
    className,
    checked,
    label,
  } = props;

  const handleChange = (e) => {
    if (preventDefault) e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    onChange(id, !checked);
  };

  return (
    <>
      <Global styles={getCheckboxCss(props)} />
      <label
        className={`c-${id}-container ${className}`}
        onClick={handleChange}
      >
        {label}
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {}}
          disabled={disabled}
        />
        <span className={`c-${id}-checkmark`}></span>
      </label>
    </>
  );
};

CheckBox.defaultProps = {
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

CheckBox.propTypes = {
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

export default CheckBox;
