import React, { useEffect, useState } from "react";
import BaseContainer from "../Base/BaseContainer";
import styles from './styles.module.css';

const TextArea = (props) => {
  const [val, setVal] = useState(props.value);
  const [focus, setFocus] = useState(false);

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

  if (props.accentColor) {

    const style = {
      backgroundColor: focus ? "white" : getLighterColor(props.accentColor, 0.75),
      borderBottom: "2px solid " + props.accentColor
    };

    return (
      <BaseContainer {...props}>
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
          style={style}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        ></textarea>
      </BaseContainer>
    );
  }

  return (
    <BaseContainer {...props}>
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
    </BaseContainer>
  );
};

export default TextArea;
