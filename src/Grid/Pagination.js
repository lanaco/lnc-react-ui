import React from "react";
import PropTypes from "prop-types";
import DropDown from "../DropDown/index";
import IconButton from "../IconButton/index";
import { freeze } from "../Helper/helper";
import "./style.css";

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

  const freezeLoading = (args = []) => freeze([IsLoading, ...args]);

  const getPageSizes = () => {
    return PageSizes.map((x) => ({ name: x, value: x }));
  };

  const exportToExcel = () => Export();

  const handlePageSizeChanged = (_, value) => OnPageSizeChanged(value);

  //======================== RENDER ==========================================

  const renderRowInformation = () => {
    return <div className="pagination-item">{getShowingNumberOfRows()}</div>;
  };

  const renderCurrentPage = () => {
    return <div className="pagination-item">{CurrentPage}</div>;
  };

  const renderFirst = () => {
    return (
      <div className="pagination-item">
        <IconButton
          iconClassName="lnc-left-double"
          onClick={() => goToFirstPage(PageSize, CurrentPage)}
          disabled={freezeLoading([!CanGoToFirstPage])}
          tooltipText={Localization.First}
        ></IconButton>
      </div>
    );
  };

  const renderPrevious = () => {
    return (
      <div className="pagination-item">
        <IconButton
          iconClassName="lnc-left"
          onClick={() => goToPreviousPage(PageSize, CurrentPage)}
          disabled={freezeLoading([!CanGoToPreviousPage])}
          tooltipText={Localization.Previous}
        ></IconButton>
      </div>
    );
  };

  const renderNext = () => {
    return (
      <div className="pagination-item">
        <IconButton
          iconClassName="lnc-right"
          onClick={() => goToNextPage(PageSize, CurrentPage)}
          disabled={freezeLoading([!CanGoToNextPage])}
          tooltipText={Localization.Next}
        ></IconButton>
      </div>
    );
  };

  const renderLast = () => {
    return (
      <div className="pagination-item">
        <IconButton
          iconClassName="lnc-right-double"
          onClick={() => goToLastPage(PageSize, CurrentPage)}
          disabled={freezeLoading([!CanGoToLastPage])}
          tooltipText={Localization.Last}
        ></IconButton>
      </div>
    );
  };

  const renderPageSize = () => {
    return (
      <div className="pagination-item">
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
      <span className="export-buttons">
        <IconButton
          tooltipText={Localization.ExportToExcel}
          onClick={exportToExcel}
          disabled={freezeLoading()}
          iconClassName="lnc-file-excel"
        />
      </span>
    );
  };

  return (
    <div className="pagination-container">
      <span className="pagination-container-inner">
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
