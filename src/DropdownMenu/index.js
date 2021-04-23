import React from "react";
import styles from "./styles.module.css";

const DropdownMenu = (props) => {
  return (
    <div className={props.disabled ? styles.disabled : styles.dropdown}>
      <span className={styles.dropbtn} disabled={props.disabled}>
        {props.label}&nbsp;&nbsp;
        <span className={styles.iconSpan}>
          <i iconClassName={props.downDoubleIconClassName}></i>
        </span>
      </span>

      <div className={styles.dropdownContent}>
        {props.items.map((x) => (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              x.action(props.actionData);
            }}
          >
            <span className={styles.linkInnerSpan}>
              <span className={styles.linkIconSpan}>
                <i iconClassName={x.iconClassName}></i>
              </span>
              {x.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
