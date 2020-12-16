import React from "react";
import {styles} from "./styles.js";

const Icon = (props) => {

  return (
      <span
        className={styles.iconSpanIcon}
        title={props.tooltipText}
        disabled={props.disabled}
      >
        <i className={props.iconClassName}></i>
      </span>
     );
  };

export default Icon;