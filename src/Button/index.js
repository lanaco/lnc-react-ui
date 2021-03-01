import React from "react";
import BaseContainer from "../Base/BaseContainer";
import baseStyles from "../Base/styles.module.css";
import styles from "./styles.module.css";

const Button = (props) => {

  const handleOnClick = (e) => {
    if (props.preventDefault) {
      e.preventDefault();
    }
    props.onClick(props.id, e.target.value);
  };

  let iconClassName = "";

  if (props.iconClassName && props.iconClassName !== "") {
    iconClassName = props.iconClassName.replace("-", "_");
  }

  return (
    <BaseContainer {...props}>
      <button
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
