import React from "react";
import styles from './styles.module.css';

const IconButton = (props) => {
  const handleOnClick = (e) => {
    if (props.preventDefault) {
      e.preventDefault();
    }
    props.onClick(props.id, e.target.value);
  };

  return (
    <button
      onClick={handleOnClick}
      className={(props.inputCssClass) ? [styles.buttonIconIconButton, props.inputCssClass].join(" ") : styles.buttonIconIconButton}
      disabled={props.disabled}
      title={props.tooltipText}
    >
      <span>
        <i className={props.iconClassName}></i>
      </span>
    </button>
  );
};

export default IconButton;
