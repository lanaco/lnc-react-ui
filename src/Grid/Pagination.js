import React from "react";
import PropTypes from "prop-types";
import DropDown from "../DropDown/index";
import Button from "../Button/index";
import style from "./style.module.css";

const Pagination = (props) => {
  //======================== PROPS ============================================

  const {
    EnableExports = false,
    CurrentPage = 1,
    IsLoading = false,
    DataCount = 0,
    PageSizes = [10, 20, 30, 40, 50, 100],
    PageSize = 10,
    OnPageSizeChanged = () => {},
    LoadedDataCount = 0,
    CanGoToNextPage = false,
    CanGoToPreviousPage = false,
    CanGoToFirstPage = false,
    CanGoToLastPage = false,
    goToNextPage = () => {},
    goToPreviousPage = () => {},
    goToFirstPage = () => {},
    goToLastPage = () => {},
    Export = () => {},
  } = props.Config || {};

  const { Localization = {} } = props;

  //======================== METHODS ==========================================

  const getShowingNumberOfRows = () => {
    if (DataCount === 0) return Localization.NoRowsToShow || "No data to show";

    let text = Localization.Showing || "Showing ";

    let multiplicator = parseInt(CurrentPage - 1) * parseInt(PageSize);

    text += DataCount === 0 ? 0 : multiplicator + 1;
    text += "-";
    text += parseInt(LoadedDataCount) + multiplicator;
    text += (Localization.Of || " of ") + DataCount;

    return text;
  };

  const freeze = (dependcies) => {
    let freeze = false;

    dependcies.forEach((el) => {
      freeze = freeze || el;
    });

    return freeze;
  };

  const freezeLoading = (args = []) => freeze([IsLoading, ...args]);

  const getPageSizes = () => {
    return PageSizes.map((x) => ({ name: x, value: x }));
  };

  const exportToExcel = () => Export();

  const handlePageSizeChanged = (_, value) => OnPageSizeChanged(value);

  //======================== RENDER ==========================================

  const renderRowInformation = () => {
    return (
      <div
        className={[style["pagination-item"], style["ubuntuFont"]].join(" ")}
        key={-1}
      >
        {getShowingNumberOfRows()}
      </div>
    );
  };

  const renderCurrentPage = () => {
    return (
      <div key={0} className={style["pagination-item"]}>
        {CurrentPage}
      </div>
    );
  };

  const renderFirst = () => {
    return (
      <div className={style["pagination-item"]} key={1}>
        <Button
          icon="angle-double-left"
          onClick={() => goToFirstPage(PageSize, CurrentPage)}
          disabled={freezeLoading([!CanGoToFirstPage])}
          tooltip={Localization.First}
        />
      </div>
    );
  };

  const renderPrevious = () => {
    return (
      <div className={style["pagination-item"]} key={2}>
        <Button
          icon="angle-left"
          onClick={() => goToPreviousPage(PageSize, CurrentPage)}
          disabled={freezeLoading([!CanGoToPreviousPage])}
          tooltip={Localization.Previous}
        />
      </div>
    );
  };

  const renderNext = () => {
    return (
      <div className={style["pagination-item"]} key={3}>
        <Button
          icon="angle-right"
          onClick={() => goToNextPage(PageSize, CurrentPage)}
          disabled={freezeLoading([!CanGoToNextPage])}
          tooltip={Localization.Next}
        />
      </div>
    );
  };

  const renderLast = () => {
    return (
      <div className={style["pagination-item"]} key={4}>
        <Button
          icon="angle-double-right"
          onClick={() => goToLastPage(PageSize, CurrentPage)}
          disabled={freezeLoading([!CanGoToLastPage])}
          tooltip={Localization.Last}
        />
      </div>
    );
  };

  const renderPageSize = () => {
    return (
      <div className={style["pagination-item"]} key={5}>
        <DropDown
          items={getPageSizes()}
          value={PageSize}
          disabled={freezeLoading()}
          onChange={handlePageSizeChanged}
          withoutEmpty={true}
        />
      </div>
    );
  };

  const renderExportButtons = () => {
    if (!EnableExports) return <></>;

    return (
      <span className={style["export-buttons"]} key={6}>
        <Button
          tooltip={Localization.ExportToExcel}
          onClick={exportToExcel}
          disabled={freezeLoading()}
          icon="lnc-file-excel"
        />
      </span>
    );
  };

  return (
    <div className={style["pagination-container"]}>
      {renderRowInformation()}
      {renderFirst()}
      {renderPrevious()}
      {renderCurrentPage()}
      {renderNext()}
      {renderLast()}
      {renderPageSize()}
      {/* {renderExportButtons()} */}
    </div>
  );
};

Pagination.propTypes = {
  Config: PropTypes.object,
  Localization: PropTypes.object,
  //------------------------------
  EnableExports: PropTypes.bool,
  CurrentPage: PropTypes.number,
  IsLoading: PropTypes.bool,
  DataCount: PropTypes.number,
  PageSizes: PropTypes.array,
  PageSize: PropTypes.number,
  OnPageSizeChanged: PropTypes.func,
  LoadedDataCount: PropTypes.number,
  CanGoToNextPage: PropTypes.bool,
  CanGoToPreviousPage: PropTypes.bool,
  CanGoToFirstPage: PropTypes.bool,
  CanGoToLastPage: PropTypes.bool,
  goToNextPage: PropTypes.func,
  goToPreviousPage: PropTypes.func,
  goToFirstPage: PropTypes.func,
  goToLastPage: PropTypes.func,
  Export: PropTypes.func,
};

export default Pagination;
