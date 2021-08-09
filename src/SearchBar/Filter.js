import React from "react";
import styles from "./styles.module.css";
import { mergeCSS } from "../Helper/helper";
import Button from "../Button/index";

const Filter = (props) => {
  //====== PROPS ======

  const { onToggleState, onRemove, id } = props;

  //====== EVENTS ======

  const toggleState = () => {
    onToggleState(id);
  };

  const remove = () => {
    onRemove(id);
  };

  //====== METHODS ======

  const getIsAppliedCss = () => {
    return props.data.isApplied === true ? styles.bgActive : styles.bgNonActive;
  };

  const getIsAppliedColumnNameCss = () => {
    return props.data.isApplied === true ? "" : styles.bgColumnNameNonActive;
  };

  //====== RENDER ======

  const getPopoverContent = (item) => {
    item = props.data;
    let content = "";

    item.statements.forEach((element) => {
      content +=
        element.name +
        " " +
        element.operationType.name.toLowerCase() +
        ' "' +
        element.value +
        '"\n';
    });

    return content;
  };

  let columnName = props.data.statements[0].name;
  let columnValue = props.data.statements[0].value;
  if (columnName.length > 14) {
    columnName = columnName.substring(0, 13) + ".";
  }
  if (columnValue.length > 14) {
    columnValue = columnValue.substring(0, 13) + ".";
  }

  return (
    <div className={mergeCSS([styles.bubbleContent, getIsAppliedCss()])}>
      <span
        className={mergeCSS([styles.columnName, getIsAppliedColumnNameCss()])}
        title={getPopoverContent()}
        onClick={toggleState}
      >
        <b>{columnName}</b>
      </span>
      <span
        className={styles.value}
        title={getPopoverContent()}
        onClick={toggleState}
      >
        {columnValue}
      </span>
      <span className={styles.remove}>
        <Button icon={"times"} spanClassName={styles.xIcon} onClick={remove} />
      </span>
    </div>
  );
};

export default Filter;
