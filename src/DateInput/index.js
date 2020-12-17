import React from "react";
import styles from './styles.module.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const DateInput = (props) => {
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

  const getLabelData = () => {
    let labelData = {
      hasLabel: props.label ? true : false,
    };

    labelData.color = labelData.hasLabel
      ? props.label.color
        ? props.label.color
        : "black"
      : null;

    labelData.backgroundColor = labelData.hasLabel
      ? props.label.background
        ? props.label.background
        : "white"
      : null;

    labelData.doRoundBorders = labelData.hasLabel
      ? props.label.hasBackground
        ? props.label.hasBackground
        : false
      : false;

    return labelData;
  };

  const getLabel = () => {
    let labelData = getLabelData();
    if (labelData.hasLabel) {
      return (
        <div
          className={
            styles.labelDateInput +
            (labelData.doRoundBorders ? " " + styles.labelWithBackgroundDateInput : "")
          }
        >
          {props.label}
          {props.required ? "*" : ""}
        </div>
      );
    }

    return <></>;
  };

  const getInput = () => {
    return (
      <div className={styles.datePickerWrapperDateInput}>
        <DatePicker
          selected={getValue()}
          onChange={handleChange}
          dateFormat="dd.MM.yyyy."
          disabled={props.disabled}
          className={styles.standardInputDateInput}
        />
      </div>
    );
  };

    return (
      <div
        className={
          props.useSideLabel ? styles.containerWithSideLabelDateInput : styles.containerDateInput
        }
      >
        {getLabel()}
        <div>{getInput()}</div>
        {props.errorText ? (
          <div className={styles.errorTextDateInput}>{props.errorText}</div>
        ) : null}
      </div>
    );
};

export default DateInput;
