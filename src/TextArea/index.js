import React, { useEffect, useState } from "react";
import baseStyles from "../Base/styles.module.css";
import styles from './styles.module.css';

const TextArea = (props) => {
  const [val, setVal] = useState(props.value);

  useEffect(() => {
    setVal(props.value);
  }, [props.value]);

  const handleOnChange = (e) => {
    if (props.preventDefault) {
      e.preventDefault();
    }
    setVal(e.target.value);
  };

  const handleOnBlur = (e) => {
    if (props.preventDefault) {
      e.preventDefault();
    }
    props.onChange(props.id, e.target.value);
  }

  const numberOfRows = props.rows ? props.rows : 1;
  const numberOfColumns = props.cols ? props.cols : 50;

  const autosize = (e) => {
    var el = e.currentTarget;
    setTimeout(function () {
      el.style.cssText = "height:auto; padding:0";
      // for box-sizing other than "content-box" use:
      // el.style.cssText = '-moz-box-sizing:content-box';
      el.style.cssText = "height: " + el.scrollHeight + "px;";
    }, 0);
  };

  return (
    <div className={baseStyles.baseContainer}>
      <label className={props.labelCssClass ? [baseStyles.baseLabel, props.labelCssClass].join(" ") : baseStyles.baseLabel}>
        {props.label}
        {props.required ? "*" : ""}
      </label>
      <textarea
        id={"textArea" + props.id}
        value={val ? val : ""}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        className={(props.inputCssClass) ? [styles.standardInputTextArea, props.inputCssClass].join(" ") : styles.standardInputTextArea}
        disabled={props.disabled}
        title={props.tooltipText}
        onKeyDown={autosize}
        rows={numberOfRows}
        cols={numberOfColumns}
      ></textarea>
      <div className={props.errorTextCssClass ? [baseStyles.baseErrorText, props.errorTextCssClass].join(" ") : baseStyles.baseErrorText}>{props.errorText}</div>
    </div>
  );
};

export default TextArea;
