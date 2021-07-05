import React from "react";
import styles from "./styles.module.css";
import { freeze } from "./Helper/dataViewHelper";
import IconButton from "../IconButton/index.js";

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
  const { Icons = {} } = props;

  //====== LIFECYCLE ======

  //====== EVENTS ======

  //====== METHODS ======

  const freezeLoading = (args = []) => freeze([IsLoading, ...args]);

  //====== RENDER ======

  const renderFirst = () => {
    return (
      <div className={styles.movementFlexItem}>
        <IconButton
          iconClassName={Icons.LeftDouble}
          onClick={goToFirstItem}
          disabled={freezeLoading([!CanGoToFirstItem])}
          tooltipText={Localization.First}
        ></IconButton>
      </div>
    );
  };

  const renderLast = () => {
    return (
      <div className={styles.movementFlexItem}>
        <IconButton
          iconClassName={Icons.RightDouble}
          onClick={goToLastItem}
          disabled={freezeLoading([!CanGoToLastItem])}
          tooltipText={Localization.Last}
        ></IconButton>
      </div>
    );
  };

  const renderNext = () => {
    return (
      <div className={styles.movementFlexItem}>
        <IconButton
          iconClassName={Icons.Right}
          onClick={goToNextItem}
          disabled={freezeLoading([!CanGoToNextItem])}
          tooltipText={Localization.Next}
        ></IconButton>
      </div>
    );
  };

  const renderPrevious = () => {
    return (
      <div className={styles.movementFlexItem}>
        <IconButton
          iconClassName={Icons.Left}
          onClick={goToPreviousItem}
          disabled={freezeLoading([!CanGoToPreviousItem])}
          tooltipText={Localization.Previous}
        ></IconButton>
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
          <IconButton
            iconClassName={Icons.Save}
            onClick={() => {}}
            disabled={false}
            tooltipText={Localization.Dirty}
            inputCssClass={styles.dirtyInfoButton}
          ></IconButton>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default FormViewMovement;
