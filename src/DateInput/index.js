import moment from "moment";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BaseContainer from "../Base/BaseContainer";
import { getLighterColor } from "../Base/ColorBlender";
import styles from "./styles.module.css";

const DateInput = (props) => {
  const [focus, setFocus] = useState(false);

  const callOnChange = (id, value) => {
    if (props.onChange) props.onChange(id, value);
  };

  const handleChange = (jsDateObject) => {
    if (jsDateObject === null) callOnChange(props.id, "");
    else callOnChange(props.id, moment(jsDateObject).format("DD.MM.YYYY."));
  };

  const getValue = () => {
    if (props.value === undefined || !props.value) return null;

    return moment(props.value, "DD.MM.YYYY.").toDate();
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
        <DatePicker
          selected={getValue()}
          onChange={handleChange}
          dateFormat={props.dateFormat ? props.dateFormat : "dd.MM.yyyy."}
          disabled={props.disabled}
          className={
            props.inputCssClass
              ? [styles.standardInputDateInput, props.inputCssClass].join(" ")
              : styles.standardInputDateInput
          }
          style={style}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      </BaseContainer>
    );
  }

  return (
    <BaseContainer {...props}>
      <DatePicker
        selected={getValue()}
        onChange={handleChange}
        dateFormat={props.dateFormat ? props.dateFormat : "dd.MM.yyyy."}
        disabled={props.disabled}
        className={
          props.inputCssClass
            ? [styles.standardInputDateInput, props.inputCssClass].join(" ")
            : styles.standardInputDateInput
        }
      />
    </BaseContainer>
  );
};

export default DateInput;
