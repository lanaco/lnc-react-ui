import React, { useState } from "react";
import BaseContainer from "../Base/BaseContainer";
import { getLighterColor } from "../Base/ColorBlender";
import styles from "./styles.module.css";

const DropDown = (props) => {
  const [focus, setFocus] = useState(false);

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

  if (props.accentColor) {
    const style = {
      backgroundColor: focus
        ? "white"
        : getLighterColor(props.accentColor, 0.75),
      borderBottom: "2px solid " + props.accentColor,
    };

    return (
      <BaseContainer {...props}>
        <select
          className={
            props.inputCssClass
              ? [styles.standardInputDropDown, props.inputCssClass].join(" ")
              : styles.standardInputDropDown
          }
          disabled={props.disabled}
          default={props.value}
          title={props.tooltipText}
          onChange={handleOnChange}
          value={props.value}
          style={style}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
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
      </BaseContainer>
    );
  }

  return (
    <BaseContainer {...props}>
      <select
        className={
          props.inputCssClass
            ? [styles.standardInputDropDown, props.inputCssClass].join(" ")
            : styles.standardInputDropDown
        }
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
    </BaseContainer>
  );
};

export default DropDown;
