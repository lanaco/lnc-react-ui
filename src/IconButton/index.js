import React, { useState } from "react";
import baseStyles from "../Base/styles.module.css";
import styles from './styles.module.css';

const IconButton = (props) => {

  let iconClassName = "";

  const [hover, setHover] = useState(false);

  if (props.iconClassName && props.iconClassName !== "") {
    iconClassName = props.iconClassName.replace("-", "_");
  }

  const handleOnClick = (e) => {
    if (props.preventDefault) {
      e.preventDefault();
    }
    props.onClick(props.id, e.target.value);
  };

  if (props.accentColor) {

    const styleForHover = {
      background: "radial-gradient(" + props.accentColor + ", transparent, transparent)",
      outline: "none"
    }

    return (
      <button
        onClick={handleOnClick}
        className={(props.inputCssClass) ? [styles.buttonIconIconButton, props.inputCssClass].join(" ") : styles.buttonIconIconButton}
        disabled={props.disabled}
        title={props.tooltipText}
        style={hover ? styleForHover : {}}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span>
          <i className={[baseStyles.lnc, baseStyles[iconClassName]].join(" ")}></i>
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={handleOnClick}
      className={(props.inputCssClass) ? [styles.buttonIconIconButton, props.inputCssClass].join(" ") : styles.buttonIconIconButton}
      disabled={props.disabled}
      title={props.tooltipText}
    >
      <span>
        <i className={[baseStyles.lnc, baseStyles[iconClassName]].join(" ")}></i>
      </span>
    </button>
  );
};

export default IconButton;
