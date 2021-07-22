import React from "react";
import styles from "./styles.module.css";

const DropdownContent = (props) => {
  const { onSelect, items, value, cursor } = props;

  return (
    <div>
      {items.map((el, i) => {
        let className = cursor === i ? styles.linkActive : styles.link;
        return (
          <a
            key={i}
            href="#"
            className={className}
            onClick={() => {
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
