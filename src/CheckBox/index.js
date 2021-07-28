import React from "react";
import PropTypes from "prop-types";
import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";

const getCss = (props) => {
  var top,
    left,
    height,
    width,
    fontSize = "";

  if (props.size === "small") {
    fontSize = "16px";
    top = "13.9px";
    left = "6.5px";
    height = "14px";
    width = "14px";
  }

  if (props.size === "medium") {
    fontSize = "22px";
    top = "17px";
    left = "7px";
    height = "20px";
    width = "20px";
  }

  if (props.size === "large") {
    fontSize = "28px";
    top = "20.4px";
    left = "7.4px";
    height = "26px";
    width = "26px";
  }

  return css`
    [type="checkbox"]:not(:checked),
    [type="checkbox"]:checked {
      position: absolute;
      left: 0;
      opacity: 0.01;
    }
    [type="checkbox"]:not(:checked) + label,
    [type="checkbox"]:checked + label {
      position: relative;
      padding-left: 2.3em;
      font-size: 1.05em;
      line-height: 1.7;
      cursor: pointer;
    }

    /* checkbox aspect */
    [type="checkbox"]:not(:checked) + label:before,
    [type="checkbox"]:checked + label:before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: ${width};
      height: ${height};
      margin: 4px;
      border: 2px solid ${props.theme.palette[props.color].main};
      background: #fff;
      border-radius: 0.15em;
      -webkit-transition: all 0.275s;
      transition: all 0.275s;
    }

    [type="checkbox"]:not(:checked) + label:after,
    [type="checkbox"]:checked + label:after {
      content: "✔";
      position: absolute;
      top: ${top};
      left: ${left};
      font-size: ${fontSize};
      color: ${props.theme.palette[props.color].main};
      line-height: 0;
      -webkit-transition: all 0.2s;
      transition: all 0.2s;
    }

    [type="checkbox"]:not(:checked) + label:after {
      opacity: 0;
      -webkit-transform: scale(0) rotate(45deg);
      transform: scale(0) rotate(45deg);
    }

    [type="checkbox"]:checked + label:after {
      opacity: 1;
      -webkit-transform: scale(1) rotate(0);
      transform: scale(1) rotate(0);
    }

    /* Disabled checkbox */
    [type="checkbox"]:disabled:not(:checked) + label:before,
    [type="checkbox"]:disabled:checked + label:before {
      box-shadow: none;
      border-color: #bbb;
      background-color: #e9e9e9;
      cursor: default;
    }

    [type="checkbox"]:disabled:checked + label:after {
      color: #777;
      cursor: default;
    }

    [type="checkbox"]:disabled + label {
      color: #aaa;
      cursor: default;
    }
  `;
};

const Container = styled.div((props) => ({
  display: "flex",
  alignItems: "center",
  padding: "4px",
  height: "auto",
}));

const CheckBox = (props) => {
  const {
    onChange,
    preventDefault,
    id,
    disabled,
    className,
    checked,
    color,
    size,
    theme,
  } = props;

  const handleChange = (e) => {
    if (preventDefault) e.preventDefault();
    onChange(id, e.target.checked);
  };

  const componentProps = {
    theme,
    color,
    size,
  };

  return (
    <>
      <Global styles={getCss(props)} />
      <input
        type="checkbox"
        id="checkbox"
        disabled={disabled}
        checked={checked ? "checked" : ""}
        onChange={handleChange}
      />
      <label for="checkbox"></label>
    </>
    // <Container {...componentProps}>
    //   <Input
    //     {...componentProps}
    //     type="checkbox"
    //     checked={checked ? "checked" : ""}
    //     onChange={handleChange}
    //     disabled={disabled}
    //     className={className}
    //   />
    //   <Label>Checkbox</Label>
    // </Container>
  );
};

CheckBox.defaultProps = {
  theme: {},
  id: "",
  disabled: false,
  onChange: () => {},
  className: "",
  preventDefault: true,
  size: "small",
  label: "",
  color: "primary",
};

CheckBox.propTypes = {
  theme: PropTypes.object.isRequired,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
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
