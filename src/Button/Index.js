import React from "react";
import webfont from "webfont";
// import "../BaseStyle/BaseStyle.css";
// import "../BaseStyle/index.css";
import styles from './styles.module.css';

const Button = (props) => {

 
webfont({
  files: "src/BaseStyle/*.svg",
  fontName: "LNC_ICONS"
})
  .then(result => {
    console.log("SVG:", result);
 
    return result;
  })
  .catch(error => {
    throw error;
  });


  const handleOnClick = (e) => {
    if (props.preventDefault) {
      e.preventDefault();
    }
    props.onClick(props.id, e.target.value);
  };
    
      return (
        <div className={styles.containerButton}>
          <label className={styles.labelButton}></label>
          <button
            onClick={handleOnClick}
            className={(props.className) ? [styles.standardInputButton, props.className].join(" ") : styles.standardInputButton}
            disabled={props.disabled}
            title={props.tooltipText}
          >
            <span>
              <span>{props.label}</span>
              <i className={"lnc lnc-arrow-down-up"}></i>
            </span>
          </button>
          <div className={(props.classNameErrorText) ? (props.classNameErrorText) : styles.errorTextButton}>{props.errorText}</div>
        </div>
      );
    };

 export default (Button);
