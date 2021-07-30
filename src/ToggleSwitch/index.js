import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../_utils/theme";
import styles from "./styles.module.css";

const ToggleSwitch = (props) => {
  const { id, value, disabled, onChange } = props;

  function handleChange(e) {
    onChange(id, e.target.checked);
  }

  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        onChange={handleChange}
        checked={value}
        disabled={disabled}
        className={
          props.standardInputToggleSwitch
            ? [
                styles.standardInputToggleSwitch,
                props.standardInputToggleSwitch,
              ].join(" ")
            : styles.standardInputToggleSwitch
        }
      />
      <span
        className={
          disabled
            ? [styles.sliderDisabledToggleSwitch, props.sliderClassName].join(
                " "
              )
            : [styles.slider, props.sliderClassName].join(" ")
        }
      ></span>
    </label>
  );
};

ToggleSwitch.defaultProps = {
  id: "",
  disabled: false,
  onClick: () => {},
  className: "",
  preventDefault: true,
  size: "small",
  text: "",
  color: "primary",
  theme: theme,
};

ToggleSwitch.propTypes = {
  theme: PropTypes.object.isRequired,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  iconClassName: PropTypes.string,
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
