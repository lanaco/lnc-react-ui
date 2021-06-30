import React from "react";
import BaseContainer from "../Base/BaseContainer";
import styles from "./styles.module.css";

const CheckBox = (props) => {
  const { onChange = () => {} } = props;

  const handleChange = (e) => {
    if (props.preventDefault) {
      e.preventDefault();
    }
    onChange(props.id, e.target.checked);
  };

  return (
    <BaseContainer {...props} label="">
      <div className={styles.checkBoxLine}>
        <input
          type="checkbox"
          checked={props.checked ? "checked" : ""}
          onChange={handleChange}
          disabled={props.disabled}
          style={{ cursor: "pointer" }}
        />
        <label className={styles.checkBoxLabel}>{props.label}</label>
      </div>
    </BaseContainer>
  );
};

export default CheckBox;
