import React from "react";
import Button from "../Button/index.js";
import styles from "./styles.module.css";

const ConfirmationForm = (props) => {
  const approveFunction = () => {
    props.approveFunction();
    props.handleDialogClose();
  };

  return (
    <div>
      <section className={styles.confirmationBoxModalContent}>
        <div className={styles.processingContainer}>{props.title}</div>
        <div className={styles.yesAndNo}>
          <br />
          <Button
            className={styles.button}
            onClick={approveFunction}
            label={props.textYes}
            accentColor={props.accentColor}
          />
          <Button
            className={styles.button}
            onClick={props.refuseFunction}
            label={props.textNo}
            accentColor={props.accentColor}
          />
        </div>
      </section>
    </div>
  );
};

export default ConfirmationForm;
