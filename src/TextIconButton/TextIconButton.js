import React from "react";
import baseStyles from "../Base/styles.module.css";
import PropTypes from "prop-types";
import styles from "./style.module.css";

const TextIconButton = (props) => {
  const {
    id,
    onClick,
    disabled,
    tooltipText,
    preventDefault,
    className,
    iconClassName,
    size,
    inverted,
    iconLocation,
    text,
  } = props;

  let buttonProperties = {
    disabled: disabled,
  };

  if (tooltipText && tooltipText !== "") buttonProperties.title = tooltipText;

  let _iconClassName = "";

  if (iconClassName && iconClassName !== "") {
    _iconClassName = iconClassName.replaceAll("-", "_");
  }

  const handleOnClick = (e) => {
    if (preventDefault) e.preventDefault();
    onClick(id);
  };

  let buttonClassName = inverted
    ? "icon-button-btn-inverted"
    : "icon-button-btn";

  return (
    <button
      onClick={handleOnClick}
      className={[
        styles[buttonClassName],
        styles[`icon-button-btn-${size}`],
        className,
      ].join(" ")}
      {...buttonProperties}
    >
      {text && text !== "" && iconLocation === "right" ? (
        <span
          className={[
            styles["icon-button-text"],
            styles[`icon-button-text-${size}`],
          ].join(" ")}
        >
          {text}
        </span>
      ) : (
        <></>
      )}

      <div
        className={[
          baseStyles["lnc"],
          baseStyles[_iconClassName],
          styles[`icon-button-icon-${size}`],
        ].join(" ")}
      ></div>

      {text && text !== "" && iconLocation === "left" ? (
        <span
          className={[
            styles["icon-button-text"],
            styles[`icon-button-text-${size}`],
          ].join(" ")}
        >
          {text}
        </span>
      ) : (
        <></>
      )}
    </button>
  );
};

TextIconButton.defaultProps = {
  id: "",
  disabled: false,
  tooltipText: "",
  onClick: () => {},
  iconClassName: "",
  className: "",
  preventDefault: true,
  size: "s",
  inverted: false,
  iconLocation: "left",
  text: "",
};

TextIconButton.propTypes = {
  id: PropTypes.string,
  disabled: PropTypes.bool,
  tooltipText: PropTypes.string,
  onClick: PropTypes.func,
  iconClassName: PropTypes.string,
  className: PropTypes.string,
  preventDefault: PropTypes.bool,
  size: PropTypes.oneOf(["s", "m", "l"]),
  inverted: PropTypes.bool,
  iconLocation: PropTypes.oneOf(["left", "right"]),
  text: PropTypes.string,
};

export default TextIconButton;
