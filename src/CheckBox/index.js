import React from "react";
import {styles} from "./styles.js";

const CheckBox = (props) => {
  const handleChange = (e) => {
    if (props.preventDefault) {
      e.preventDefault();
    }
    props.onChange(props.id, e.target.checked);
  }
    return (
      <div className={styles.checkBoxLine}>
        <input
          type="checkbox"
          checked={props.checked ? "checked" : ""}
          onChange={handleChange}
          disabled={props.disabled}
        />
        <label className={styles.checkBoxLabel}>{props.value}</label>
      </div>
    );
};

export default CheckBox;