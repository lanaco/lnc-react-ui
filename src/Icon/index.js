import React from "react";
import baseStyles from "../Base/styles.module.css";
import styles from './styles.module.css';

const Icon = (props) => {

  let iconClassName = "";

  if (props.iconClassName && props.iconClassName !== "") {
    iconClassName = props.iconClassName.replace("-", "_");
  }

  return (
      <span
        className={styles.iconSpanIcon}
        title={props.tooltipText}
        disabled={props.disabled}
      >
        <i  className={[baseStyles.lnc, baseStyles[iconClassName]].join(" ")}></i>
      </span>
     );
  };

export default Icon;