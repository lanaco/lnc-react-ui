import React from "react";
import styles from "./styles.module.css";
import { freeze } from "../Helper/helper";
import Button from "../Button/index.js";

const FormViewMovement = (props) => {
  //====== PROPS ======

  const {
    CanGoToFirstItem,
    CanGoToLastItem,
    CanGoToNextItem,
    CanGoToPreviousItem,
    IsLoading = false,
    goToFirstItem,
    goToLastItem,
    goToNextItem,
    goToPreviousItem,
    Dirty,
    FormMode,
  } = props.Config;

  const { Localization = {} } = props;

  //====== LIFECYCLE ======

  //====== EVENTS ======

  //====== METHODS ======

  const freezeLoading = (args = []) => freeze([IsLoading, ...args]);

  //====== RENDER ======

  const renderFirst = () => {
    return (
      <div className={styles.movementFlexItem}>
        <Button
          icon={"angle-double-left"}
          onClick={goToFirstItem}
          disabled={freezeLoading([!CanGoToFirstItem])}
          tooltip={Localization.First}
        />
      </div>
    );
  };

  const renderLast = () => {
    return (
      <div className={styles.movementFlexItem}>
        <Button
          icon={"angle-double-right"}
          onClick={goToLastItem}
          disabled={freezeLoading([!CanGoToLastItem])}
          tooltip={Localization.Last}
        />
      </div>
    );
  };

  const renderNext = () => {
    return (
      <div className={styles.movementFlexItem}>
        <Button
          icon={"angle-right"}
          onClick={goToNextItem}
          disabled={freezeLoading([!CanGoToNextItem])}
          tooltip={Localization.Next}
        />
      </div>
    );
  };

  const renderPrevious = () => {
    return (
      <div className={styles.movementFlexItem}>
        <Button
          icon={"angle-left"}
          onClick={goToPreviousItem}
          disabled={freezeLoading([!CanGoToPreviousItem])}
          tooltip={Localization.Previous}
        />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.flexContainerLeft}>
        {renderFirst()}
        {renderPrevious()}
        {renderNext()}
        {renderLast()}
      </div>
      <div className={styles.flexContainerRight}>
        {Dirty && FormMode === "EDIT" ? (
          <Button
            icon={"save"}
            onClick={() => {}}
            disabled={false}
            tooltip={Localization.Dirty}
            className={styles.dirtyInfoButton}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default FormViewMovement;
