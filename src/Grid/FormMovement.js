import React from "react";
import style from "./style.module.css";
import Button from "../Button/index";

const FormMovement = (props) => {
  //====== PROPS ======
  const {
    CanGoToFirstItem = true,
    CanGoToLastItem = true,
    CanGoToNextItem = true,
    CanGoToPreviousItem = true,
    IsLoading = false,
    goToFirstItem = () => {},
    goToLastItem = () => {},
    goToNextItem = () => {},
    goToPreviousItem = () => {},
  } = props.Config;

  const { Localization = {} } = props;

  //====== METHODS ======

  const freeze = (dependcies) => {
    let freeze = false;

    dependcies.forEach((el) => {
      freeze = freeze || el;
    });

    return freeze;
  };

  const freezeLoading = (args = []) => freeze([IsLoading, ...args]);

  //====== RENDER ======

  const renderFirst = () => {
    return (
      <div className={style["dataview-flex-item"]}>
        <Button
          icon="angle-double-left"
          onClick={goToFirstItem}
          disabled={freezeLoading([!CanGoToFirstItem])}
          tooltip={Localization.First || "First"}
        />
      </div>
    );
  };

  const renderLast = () => {
    return (
      <div className={style["dataview-flex-item"]}>
        <Button
          icon="angle-double-right"
          onClick={goToLastItem}
          disabled={freezeLoading([!CanGoToLastItem])}
          tooltip={Localization.Last || "Last"}
        />
      </div>
    );
  };

  const renderNext = () => {
    return (
      <div className={style["dataview-flex-item"]}>
        <Button
          icon="angle-right"
          onClick={goToNextItem}
          disabled={freezeLoading([!CanGoToNextItem])}
          tooltipText={Localization.Next || "Next"}
        />
      </div>
    );
  };

  const renderPrevious = () => {
    return (
      <div className={style["dataview-flex-item"]}>
        <Button
          icon="angle-left"
          onClick={goToPreviousItem}
          disabled={freezeLoading([!CanGoToPreviousItem])}
          tooltip={Localization.Previous || "Previous"}
        />
      </div>
    );
  };

  return (
    <>
      {renderFirst()}
      {renderPrevious()}
      {renderNext()}
      {renderLast()}
    </>
  );
};

export default FormMovement;
