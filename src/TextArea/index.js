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

  const autosize = (e) => {
    var el = e.currentTarget;
    console.log("AUTOSIZE:", el)
    setTimeout(function () {
     // el.style.cssText = "height:auto; padding:0";
      // for box-sizing other than "content-box" use:
      // el.style.cssText = '-moz-box-sizing:content-box';
      el.style.cssText = "height: " + el.scrollHeight + "px;";
    }, 0);
  };

    return (
      <div
        className={
          props.useSideLabel ? baseStyles.baseContainer : baseStyles.baseContainer
        }
      >
        <label className={styles.labelTextArea}>
          {props.label}
          {props.required ? "*" : ""}
        </label>
        <textarea
          id={"textArea" + props.id}
          value={val ? val : ""}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          className={(props.className) ? [styles.standardInputTextArea, props.className].join(" ") : styles.standardInputTextArea}
          disabled={props.disabled}
          title={props.tooltipText}
          onKeyDown={autosize}
          rows={props.rows ? props.rows : 1}
          cols={props.cols ? props.cols : 50}
        ></textarea>
        <div className={(props.classNameErrorText) ? (props.classNameErrorText) : styles.errorTextTextArea}>{props.errorText}</div>
      </div>
    );
};

export default TextArea;
