import React from "react";
import style from "./style.module.css";
import { freeze } from "../DataView/Helper/dataViewHelper";
import TextIconButton from "../TextIconButton/index";

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

  const freezeLoading = (args = []) => freeze([IsLoading, ...args]);

  //====== RENDER ======

  const renderFirst = () => {
    return (
      <div className={style["dataview-flex-item"]}>
        <TextIconButton
          iconClassName="lnc-left-double"
          onClick={goToFirstItem}
          disabled={freezeLoading([!CanGoToFirstItem])}
          tooltipText={Localization.First || "First"}
        />
      </div>
    );
  };

  const renderLast = () => {
    return (
      <div className={style["dataview-flex-item"]}>
        <TextIconButton
          iconClassName="lnc-right-double"
          onClick={goToLastItem}
          disabled={freezeLoading([!CanGoToLastItem])}
          tooltipText={Localization.Last || "Last"}
        />
      </div>
    );
  };

  const renderNext = () => {
    return (
      <div className={style["dataview-flex-item"]}>
        <TextIconButton
          iconClassName="lnc-right"
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
        <TextIconButton
          iconClassName="lnc-left"
          onClick={goToPreviousItem}
          disabled={freezeLoading([!CanGoToPreviousItem])}
          tooltipText={Localization.Previous || "Previous"}
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
