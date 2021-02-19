import React from "react";
import styles from "./styles.module.css";
import Button from "../Button/Index.js";

const ConfirmationForm = (props) => {
  const approveFunction = () => {
    props.approveFunction();
    props.handleDialogClose();
  };

  return (
    <div>
      <section className={styles.confirmationBoxModalContent}>
        <div className={styles.processingContainer}>{props.title}</div>
        <br />
        <Button
          className={styles.button}
          onClick={approveFunction}
          label={props.textYes}
        />
        <Button
          className={styles.button}
          onClick={props.refuseFunction}
          label={props.textNo}
        />
      </section>
    </div>
  );
};

export default ConfirmationForm;
