import React from "react";
import baseStyles from "../Base/styles.module.css";

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
    <button
      onClick={handleOnClick}
      className={
        props.inputCssClass
          ? [stilJeboGaDaGAJebo, props.inputCssClass].join(" ")
          : stilJeboGaDaGAJebo
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
  );
};

export default Button;
