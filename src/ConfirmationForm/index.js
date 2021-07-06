import React from "react";
import Button from "../Button/index.js";
import styles from "./styles.module.css";

const ConfirmationForm = (props) => {
  const emptyFunc = () => {};

  const {
    approveFunction = emptyFunc,
    handleDialogClose = emptyFunc,
    refuseFunction = emptyFunc,
  } = props;

  const approveAndCloseFunction = () => {
    approveFunction();
    handleDialogClose();
  };

  return (
    <div>
      <section className={styles.confirmationBoxModalContent}>
        <div className={styles.processingContainer}>{props.title}</div>
        <div className={styles.confirmationBoxButtons}>
          <Button
            onClick={approveAndCloseFunction}
            label={props.textYes}
            accentColor={props.accentColor}
            inputCssClass={styles.yesAndNoButton}
            baseContainerCssClass={styles.maxWidth}
          />
          <Button
            onClick={refuseFunction}
            label={props.textNo}
            accentColor={props.accentColor}
            inputCssClass={styles.yesAndNoButton}
            baseContainerCssClass={styles.maxWidth}
          />
        </div>
      </section>
    </div>
  );
};

export default ConfirmationForm;
