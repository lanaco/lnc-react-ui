import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import React from "react";
// import {styles} from "./styles.js";


const useStyles = makeStyles({
  ".containerButton": {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateRows:
    "var(--base-label-size) minmax(55%, auto) var(\n      --base-error-text-size\n    )",
    paddingTop: "3px",
    paddingLeft: "1px",
    paddingRight: "1px",
    paddingBottom: "1px"
  },
  ".labelButton": {
    fontSize: "var(--base-additional-text-font-size)",
    fontFamily: "inherit",
    fontWeight: 400,
    color: "#545454",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "left",
    alignItems: "flex-end"
  },
  ".errorTextButton": {
    fontSize: "var(--base-additional-text-font-size)",
    fontFamily: "inherit",
    fontWeight: 400,
    color: "var(--base-error-color)",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "left",
    alignItems: "flex-start"
  },
  ".standardInputButton": {
    fontFamily: "inherit",
    WebkitAppearance: "none",
    appearance: "none",
    outline: "none",
    width: "100%",
    height: "100%",
    transition: "all var(--transition-duration)",
    fontSize: "var(--font-size)",
    backgroundColor: "var(--add-button-bg-color-primary)",
    background: "var(--lanaco-accent-color)",
    color: "var(--add-button-text-color)",
    padding: "5px 15px"
  },
  ".standardInputButton span": { alignItems: "center", textAlign: "center" },
  ".standardInputButton > span > span": { paddingRight: "5px" },
  ".standardInputButton:hover": { background: "#004b6f" },
  ".standardInputButton:disabled": {
    backgroundColor: "var(--disabled-bg-color)",
    color: "var(--disabled-text-color)"
  },
  ".standardInputIconButton": {
    fontWeight: "var(--button-icon-font-weight) !important",
    fontSize: "0.9em !important",
    height: "100%",
    width: "100%"
  }
});

const Button = (props) => {
  const classes = useStyles();

  const handleOnClick = (e) => {
    if (props.preventDefault) {
      e.preventDefault();
    }
    props.onClick(props.id, e.target.value);
  };

  return (
    <div className={classes.containerButton}>
      <label className={classes.labelButton}></label>
      <button
        onClick={handleOnClick}
        // className={(props.className) ? [styles.standardInputButton, props.className].join(" ") : styles.standardInputButton}
        className={clsx(classes.standardInputButton, className)}
        disabled={props.disabled}
        title={props.tooltipText}
      >
        <span>
          <span>{props.label}</span>
          <i className={props.icon + ((props.classNameIcon) ? (props.classNameIcon) : classes.standardInputIconButton)}></i>
        </span>
      </button>
      <div className={(props.classNameErrorText) ? (props.classNameErrorText) : classes.errorTextButton}>{props.errorText}</div>
    </div>
  );
};

export default (Button);
