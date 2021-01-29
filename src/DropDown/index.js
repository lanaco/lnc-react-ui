import React from "react";
import baseStyles from "../Base/styles.module.css";
import styles from './styles.module.css';

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
    <div className={baseStyles.baseContainer}>
      <label className={props.labelCssClass ? [baseStyles.baseLabel, props.labelCssClass].join(" ") : baseStyles.baseLabel}>
        {props.label}
        {props.required ? "*" : ""}
      </label>
      <select
        className={(props.inputCssClass) ? [styles.standardInputDropDown, props.inputCssClass].join(" ") : styles.standardInputDropDown}
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
      <div className={props.errorTextCssClass ? [baseStyles.baseErrorText, props.errorTextCssClass].join(" ") : baseStyles.baseErrorText}>{props.errorText}</div>
    </div>
  );
};

export default DropDown;
