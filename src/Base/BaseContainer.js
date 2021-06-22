import React from "react";
import baseStyles from "../Base/styles.module.css";

const BaseContainer = (props) => {
  return (
    <div
      className={
        props.useSideLabel
          ? baseStyles.baseContainerWithSideLabel
          : baseStyles.baseContainer
      }
    >
      <label
        className={
          props.labelCssClass
            ? [baseStyles.baseLabel, props.labelCssClass].join(" ")
            : baseStyles.baseLabel
        }
      >
        {props.label}
        {props.required ? "*" : ""}
      </label>
      {props.useSideLabel ? (
        <div>
          {props.children}
          <div
            className={
              props.errorTextCssClass
                ? [baseStyles.baseErrorText, props.errorTextCssClass].join(" ")
                : baseStyles.baseErrorText
            }
          >
            {props.errorText}
          </div>
        </div>
      ) : (
        <React.Fragment>
          <div>{props.children}</div>
          <div
            className={
              props.errorTextCssClass
                ? [baseStyles.baseErrorText, props.errorTextCssClass].join(" ")
                : baseStyles.baseErrorText
            }
          >
            {props.errorText}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default BaseContainer;
