import React, { useState } from "react";
import BaseContainer from "../Base/BaseContainer";
import { getDarkerColor, isColorDark } from "../Base/ColorBlender";
import baseStyles from "../Base/styles.module.css";
import styles from "./styles.module.css";

const Button = (props) => {
  const [hover, setHover] = useState(false);
  const { onClick = () => {} } = props;

  const handleOnClick = (e) => {
    if (props.preventDefault) {
      e.preventDefault();
    }
    onClick(props.id, e.target.value);
  };

  let iconClassName = "";

  if (props.iconClassName && props.iconClassName !== "") {
    iconClassName = props.iconClassName.replaceAll("-", "_");
  }

  if (props.accentColor) {
    const style = {
      backgroundColor: props.accentColor,
      color: props.color
        ? props.color
        : isColorDark(props.accentColor)
        ? "white"
        : "black",
    };

    const styleForHover = {
      backgroundColor: getDarkerColor(props.accentColor, 0.2),
      color: props.color
        ? props.color
        : isColorDark(props.accentColor)
        ? "white"
        : "black",
    };

    return (
      <BaseContainer {...props} label=" ">
        <button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={handleOnClick}
          className={
            props.inputCssClass
              ? [styles.standardInputButton, props.inputCssClass].join(" ")
              : styles.standardInputButton
          }
          disabled={props.disabled}
          title={props.tooltipText}
          style={hover ? styleForHover : style}
        >
          <span>
            {props.label && props.label !== "" ? (
              <span>{props.label}</span>
            ) : (
              ""
            )}
            {iconClassName !== "" ? (
              <i
                className={[baseStyles.lnc, baseStyles[iconClassName]].join(
                  " "
                )}
              ></i>
            ) : (
              ""
            )}
          </span>
        </button>
      </BaseContainer>
    );
  }

  return (
    <BaseContainer {...props} label=" ">
      <button
        onMouseOver={() => setHover(true)}
        onClick={handleOnClick}
        className={
          props.inputCssClass
            ? [styles.standardInputButton, props.inputCssClass].join(" ")
            : styles.standardInputButton
        }
        disabled={props.disabled}
        title={props.tooltipText}
      >
        <span>
          {props.label && props.label !== "" ? <span>{props.label}</span> : ""}
          {iconClassName !== "" ? (
            <i
              className={[baseStyles.lnc, baseStyles[iconClassName]].join(" ")}
            ></i>
          ) : (
            ""
          )}
        </span>
      </button>
    </BaseContainer>
  );
};

export default Button;
