import React from "react";
import styles from "./styles.module.css";
import ItemCounterTypes from "./ItemCounterTypes";

const ItemCounter = (props) => {
  const { Items = [], ContainerWrapperClassName = "" } = props;

  const getClassForType = (typeCode) => {
    if (typeCode === ItemCounterTypes.Success.code) return styles.success;
    else if (typeCode === ItemCounterTypes.Danger.code) return styles.danger;
    else if (typeCode === ItemCounterTypes.Warning.code) return styles.warning;
  };

  if (Items) {
    return (
      <div
        className={
          ContainerWrapperClassName
            ? [styles.ContainerWrapper, ContainerWrapperClassName].join(" ")
            : styles.ContainerWrapper
        }
      >
        {Items.map((item, i) => (
          <div className={styles.container} key={i}>
            <div
              className={styles.number + " " + getClassForType(item.type.code)}
            >
              {item.number}
            </div>
            <div className={styles.number}># of {item.description}</div>
          </div>
        ))}
      </div>
    );
  } else {
    return <div />;
  }
};

export default ItemCounter;
