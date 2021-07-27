import React from "react";
import "./style.css";
import { freeze } from "../Helper/helper";
import IconButton from "../IconButton/index";

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

  //====== LIFECYCLE ======

  //====== EVENTS ======

  //====== METHODS ======

  const freezeLoading = (args = []) => freeze([IsLoading, ...args]);

  //====== RENDER ======

  const renderFirst = () => {
    return (
      <div className="dataview-flex-item">
        <IconButton
          iconClassName="lnc-left-double"
          onClick={goToFirstItem}
          disabled={freezeLoading([!CanGoToFirstItem])}
          tooltipText={Localization.First || "First"}
        ></IconButton>
      </div>
    );
  };

  const renderLast = () => {
    return (
      <div className="dataview-flex-item">
        <IconButton
          iconClassName="lnc-right-double"
          onClick={goToLastItem}
          disabled={freezeLoading([!CanGoToLastItem])}
          tooltipText={Localization.Last || "Last"}
        ></IconButton>
      </div>
    );
  };

  const renderNext = () => {
    return (
      <div className="dataview-flex-item">
        <IconButton
          iconClassName="lnc-right"
          onClick={goToNextItem}
          disabled={freezeLoading([!CanGoToNextItem])}
          tooltipText={Localization.Next || "Next"}
        ></IconButton>
      </div>
    );
  };

  const renderPrevious = () => {
    return (
      <div className="dataview-flex-item">
        <IconButton
          iconClassName="lnc-left"
          onClick={goToPreviousItem}
          disabled={freezeLoading([!CanGoToPreviousItem])}
          tooltipText={Localization.Previous || "Previous"}
        ></IconButton>
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
