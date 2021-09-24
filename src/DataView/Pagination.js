import React from "react";
import DropDown from "../DropDown/index";
import Button from "../Button/index.js";
import { freeze } from "../Helper/helper";
import styles from "./styles.module.css";

const TablePagination = (props) => {
  //============== PROPS ==============

  const {
    EnableExports = false,
    CurrentPage,
    IsLoading,
    DataCount,
    PageSizes,
    PageSize,
    OnPageSizeChanged,
    LoadedDataCount,
    CanGoToNextPage,
    CanGoToPreviousPage,
    CanGoToFirstPage,
    CanGoToLastPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
  } = props.Config;

  const { Localization = {}, Export } = props;

  //============== METHODS ==============

  const freezeLoading = (args = []) => freeze([IsLoading, ...args]);

  const getShowingNumberOfRows = () => {
    if (IsLoading) return Localization.Loading;

    if (DataCount === 0) return Localization.NoRowsToShow;

    let text = Localization.Showing;

    if (!IsLoading) {
      let multiplicator = parseInt(CurrentPage - 1) * parseInt(PageSize);

      text += DataCount === 0 ? 0 : multiplicator + 1;
      text += "-";
      text += parseInt(LoadedDataCount) + multiplicator;
      text += Localization.Of + DataCount;
    }

    return text;
  };

  const getPageSizes = () => {
    return PageSizes.map((x) => ({ name: x, value: x }));
  };

  const exportToExcel = () => Export();
  //============== EVENTS ==============

  const handlePageSizeChanged = (_, value) => OnPageSizeChanged(value);

  //============== RENDER ==============

  const renderRowInformation = () => {
    return (
      <div className={styles.tablePaginationItem}>
        {getShowingNumberOfRows()}
      </div>
    );
  };

  const renderCurrentPage = () => {
    return <div className={styles.tablePaginationItem}>{CurrentPage}</div>;
  };

  const renderFirst = () => {
    return (
      <div className={styles.tablePaginationItem}>
        <Button
          icon={"angle-double-left"}
          onClick={goToFirstPage}
          disabled={freezeLoading([!CanGoToFirstPage])}
          tooltip={Localization.First}
        />
      </div>
    );
  };

  const renderPrevious = () => {
    return (
      <div className={styles.tablePaginationItem}>
        <Button
          icon={"angle-left"}
          onClick={goToPreviousPage}
          disabled={freezeLoading([!CanGoToPreviousPage])}
          tooltip={Localization.Previous}
        />
      </div>
    );
  };

  const renderNext = () => {
    return (
      <div className={styles.tablePaginationItem}>
        <Button
          icon={"angle-right"}
          onClick={goToNextPage}
          disabled={freezeLoading([!CanGoToNextPage])}
          tooltip={Localization.Next}
        />
      </div>
    );
  };

  const renderLast = () => {
    return (
      <div className={styles.tablePaginationItem}>
        <Button
          icon={"angle-double-right"}
          onClick={goToLastPage}
          disabled={freezeLoading([!CanGoToLastPage])}
          tooltip={Localization.Last}
        />
      </div>
    );
  };

  const renderPageSize = () => {
    return (
      <div className={styles.tablePaginationItem}>
        <DropDown
          items={getPageSizes()}
          value={PageSize}
          disabled={freezeLoading()}
          onChange={handlePageSizeChanged}
          withoutEmpty={true}
          accentColor={props.accentColor}
        />
      </div>
    );
  };

  const renderExportButtons = () => {
    if (!EnableExports) return <></>;

    return (
      <span className={styles.exportButtons}>
        <Button
          tooltip={Localization.ExportToExcel}
          onClick={exportToExcel}
          disabled={freezeLoading()}
          icon={"file-excel"}
        />
      </span>
    );
  };

  return (
    <div className={styles.tablePaginationContainer}>
      <span className={styles.innerPaginationContainer}>
        {renderRowInformation()}
        {renderFirst()}
        {renderPrevious()}
        {renderCurrentPage()}
        {renderNext()}
        {renderLast()}
        {renderPageSize()}
      </span>
      {renderExportButtons()}
    </div>
  );
};

export default TablePagination;
