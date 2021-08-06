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
            text={props.textYes || "Yes"}
          />
          <Button onClick={refuseFunction} text={props.textNo || "No"} />
        </div>
      </section>
    </div>
  );
};

export default ConfirmationForm;
