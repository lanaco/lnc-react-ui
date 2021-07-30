import React from "react";
import baseStyles from "../Base/styles.module.css";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

const IconButton = (props) => {
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

  if (props.accentColor) {
    const styleForHover = {
      background:
        "radial-gradient(" + props.accentColor + ", transparent, transparent)",
      outline: "none",
    };

    return (
      <button
        onClick={handleOnClick}
        className={
          props.inputCssClass
            ? [styles.buttonIconIconButton, props.inputCssClass].join(" ")
            : styles.buttonIconIconButton
        }
        disabled={props.disabled}
        title={props.tooltipText}
        style={hover ? styleForHover : {}}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span>
          <i
            className={[
              baseStyles.lnc,
              baseStyles[iconClassName],
              props.iconCssClass,
            ].join(" ")}
          ></i>
        </span>
      </button>
    );
  }

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
      <div
        className={[
          baseStyles["lnc"],
          baseStyles[_iconClassName],
          styles[`icon-button-icon-${size}`],
        ].join(" ")}
      ></div>
    </button>
  );
};

IconButton.defaultProps = {
  id: "",
  disabled: false,
  tooltipText: "",
  onClick: () => {},
  iconClassName: "",
  className: "",
  preventDefault: true,
  size: "s",
  inverted: false,
};

IconButton.propTypes = {
  id: PropTypes.string,
  disabled: PropTypes.bool,
  tooltipText: PropTypes.string,
  onClick: PropTypes.func,
  iconClassName: PropTypes.string,
  className: PropTypes.string,
  preventDefault: PropTypes.bool,
  size: PropTypes.oneOf(["s", "m", "l"]),
  inverted: PropTypes.bool,
};

export default IconButton;
