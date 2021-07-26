import React, { useState } from "react";
import baseStyles from "../Base/styles.module.css";
import PropTypes from "prop-types";
import styles from "./style.module.css";

function shadeColor(color, percent) {
  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
  var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
  var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
}

const lightOrDark = (color) => {
  var r, g, b, hsp;

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If HEX --> store the red, green, blue values in separate variables
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );

    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    // If RGB --> Convert it to HEX: http://gist.github.com/983661
    color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 127.5) return 0;
  else return 1;
};

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
    iconLocation,
    text,
    textColor,
    bgColor,
  } = props;

  const [hover, setHover] = useState(false);

  const handleOnClick = (e) => {
    if (preventDefault) e.preventDefault();
    onClick(id);
  };

  const getIconLocationClass = () => {
    if (
      iconClassName === null ||
      iconClassName === undefined ||
      iconClassName === ""
    )
      return "icon-button-text";

    if (iconLocation === "left") return "icon-button-text-left";
    if (iconLocation === "right") return "icon-button-text-right";
    if (iconLocation !== "left" && iconLocation !== "right")
      return "icon-button-text";
  };

  let _iconClassName = "";

  let buttonProperties = {
    disabled: disabled,
  };

  var titleStyle = {
    color: textColor,
  };

  var buttonStyle = {
    backgroundColor: bgColor,
    color: textColor,
  };

  if (tooltipText && tooltipText !== "") buttonProperties.title = tooltipText;

  if (iconClassName && iconClassName !== "") {
    _iconClassName = iconClassName.replaceAll("-", "_");
  }

  if (disabled) {
    buttonStyle.backgroundColor = "#dedede";
    buttonStyle.color = "#666666";
    titleStyle.color = "#666666";
  }

  if (!disabled && hover) {
    buttonStyle.cursor = "pointer";

    buttonStyle.backgroundColor =
      lightOrDark(bgColor) === 0
        ? shadeColor(bgColor, -8)
        : shadeColor(bgColor, 40);
  }

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleOnClick}
      className={[
        styles["icon-button-btn"],
        styles[`icon-button-btn-${size}`],
        className,
      ].join(" ")}
      style={buttonStyle}
      {...buttonProperties}
    >
      {/* Text when the icon is RIGTH */}
      {text && text !== "" && iconLocation === "right" ? (
        <span
          className={[
            styles[getIconLocationClass()],
            styles[`icon-button-text-${size}`],
          ].join(" ")}
          style={titleStyle}
        >
          {text}
        </span>
      ) : (
        <></>
      )}

      {/* Icon */}
      <div
        className={[
          baseStyles["lnc"],
          baseStyles[_iconClassName],
          styles[`icon-button-icon-${size}`],
        ].join(" ")}
      ></div>

      {/* Text when the icon is LEFT */}
      {text && text !== "" && iconLocation === "left" ? (
        <span
          className={[
            styles[getIconLocationClass()],
            styles[`icon-button-text-${size}`],
          ].join(" ")}
          style={titleStyle}
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
  iconLocation: "left",
  text: "",
  bgColor: "#ffffff",
  textColor: "#000000",
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
  iconLocation: PropTypes.oneOf(["left", "right"]),
  text: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default TextIconButton;
