import React from "react";
import styles from './styles.module.css'

const DropDown = (props) => {
  const handleOnChange = (e) => {
    if (props.preventDefault) {
      e.preventDefault();
    }
    props.onChange(props.id, e.target.value);
  };
  const getItems = () => {
    let name = "name";
    let value = "value";

    if (props.mapNameTo) name = props.mapNameTo;

    if (props.mapValueTo) value = props.mapValueTo;

    return props.items.map((el, i) => {
      return (
        <option key={i} value={el[value]}>
          {el[name]}
        </option>
      );
    });
  };

    return (
      <div
        className={props.useSideLabel ? styles.containerWithSideLabelDropDown : styles.containerDropDown}
      >
        <label className={styles.labelDropDown}>
          {props.label}
          {props.required ? "*" : ""}
        </label>
        <select
          className={(props.className) ? [styles.standardInputDropDown, props.className].join(" ") : styles.standardInputDropDown}
          disabled={props.disabled}
          default={props.value}
          title={props.tooltipText}
          onChange={handleOnChange}
          value={props.value}
        >
          {!props.withoutEmpty ? (
            <option key={-1} value={-1}>
              ???
            </option>
          ) : (
            ""
          )}
          {getItems()}
        </select>
        {props.errorText ? (
          <div className={(props.classNameErrorText) ? (props.classNameErrorText) : styles.errorTextTextInputDropDown}>{props.errorText}</div>
        ) : null}
      </div>
    );
};

export default DropDown;
