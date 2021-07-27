import React from "react";
import styles from "./styles.module.css";

const TagItem = (props) => {
  const { id, toggleTagSelection, disabled, text, selected } = props;

  const getClassForChecked = () => {
    return selected ? styles.selectedItem : "";
  };

  return (
    <div className={styles.tagItemWrapper}>
      <button
        className={styles.tagItemButton + " " + getClassForChecked()}
        type="button"
        id={id}
        onClick={() => toggleTagSelection(id)}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
};

export default TagItem;
