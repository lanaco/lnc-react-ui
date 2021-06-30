import React from "react";
import styles from "./styles.module.css";
import Icon from "../Icon/index";

const DropdownMenu = (props) => {
  const { actionData = () => {}, items = [] } = props;

  return (
    <div className={props.disabled ? styles.disabled : styles.dropdown}>
      <span className={styles.dropbtn} disabled={props.disabled}>
        {props.label}&nbsp;&nbsp;
        <span className={styles.iconSpan}>
          <i iconClassName={props.downDoubleIconClassName}></i>
        </span>
      </span>

      <div className={styles.dropdownContent}>
        {items.map((x, i) => (
          <a
            key={i}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              x.action(actionData);
            }}
          >
            <span className={styles.linkInnerSpan}>
              <span className={styles.linkIconSpan}>
                <Icon iconClassName={x.iconClassName}></Icon>
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
