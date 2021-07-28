import React from "react";
import styles from "./styles.module.css";

const DropdownContent = (props) => {
  //====== PROPS ======

  const { onSelect, items, value, cursor } = props;

  //====== LIFECYCLE ======

  //====== EVENTS ======

  //====== METHODS ======

  //====== RENDER ======

  return (
    <div>
      {items.map((el, i) => {
        let className = cursor === i ? styles.linkActive : styles.link;

        return (
          <a
            key={i}
            href="#"
            className={className}
            onClick={(e) => {
              e.preventDefault();
              onSelect(el)(value);
            }}
          >
            {`${el.name} : "${value}"`}
          </a>
        );
      })}
    </div>
  );
};

export default DropdownContent;
