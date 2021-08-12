import React from "react";
import PropTypes from "prop-types";
import DropDown from "../DropDown/index";
import Button from "../Button/index";
import styled from "@emotion/styled";
import theme from "../_utils/theme";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;

  border: 1.5px solid rgba(165, 164, 164, 0.4);
  border-radius: 3px;
  padding: 4px;
  font-size: ${theme.typography.small.fontSize};
  font-family: ${theme.typography.fontFamily};
`;

const Item = styled.div`
  padding-left: 6px;
  display: flex;
  align-items: center;
`;

const ItemText = styled.div`
  padding-left: 6px;
  padding-right: 12px;
  display: flex;
  align-items: center;
`;

const ItemCurrentPage = styled.div`
  padding-left: 6px;
  display: flex;
  align-items: center;
`;

const ItemDropdown = styled.div`
  padding-left: 14px;
  display: flex;
  align-items: center;
`;

const Pagination = (props) => {
  //======================== PROPS ============================================

  const {
    EnableExports,
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
    Export,
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
    return <ItemText key={-1}>{getShowingNumberOfRows()}</ItemText>;
  };

  const renderCurrentPage = () => {
    return <ItemCurrentPage key={0}>{CurrentPage}</ItemCurrentPage>;
  };

  const renderFirst = () => {
    return (
      <Item key={1}>
        <Button
          icon="angle-double-left"
          onClick={() => goToFirstPage(PageSize, CurrentPage)}
          disabled={freezeLoading([!CanGoToFirstPage])}
          tooltip={Localization.First}
        />
      </Item>
    );
  };

  const renderPrevious = () => {
    return (
      <Item key={2}>
        <Button
          icon="angle-left"
          onClick={() => goToPreviousPage(PageSize, CurrentPage)}
          disabled={freezeLoading([!CanGoToPreviousPage])}
          tooltip={Localization.Previous}
        />
      </Item>
    );
  };

  const renderNext = () => {
    return (
      <Item key={3}>
        <Button
          icon="angle-right"
          onClick={() => goToNextPage(PageSize, CurrentPage)}
          disabled={freezeLoading([!CanGoToNextPage])}
          tooltip={Localization.Next}
        />
      </Item>
    );
  };

  const renderLast = () => {
    return (
      <Item key={4}>
        <Button
          icon="angle-double-right"
          onClick={() => goToLastPage(PageSize, CurrentPage)}
          disabled={freezeLoading([!CanGoToLastPage])}
          tooltip={Localization.Last}
        />
      </Item>
    );
  };

  const renderPageSize = () => {
    return (
      <ItemDropdown key={5}>
        <DropDown
          items={getPageSizes()}
          value={PageSize}
          disabled={freezeLoading()}
          onChange={handlePageSizeChanged}
          withoutEmpty={true}
        />
      </ItemDropdown>
    );
  };

  // const renderExportButtons = () => {
  //   if (!EnableExports) return <></>;

  //   return (
  //     <span className={style["export-buttons"]} key={6}>
  //       <Button
  //         tooltip={Localization.ExportToExcel}
  //         onClick={exportToExcel}
  //         disabled={freezeLoading()}
  //         icon="lnc-file-excel"
  //       />
  //     </span>
  //   );
  // };

  return (
    <Container>
      {renderRowInformation()}
      {renderFirst()}
      {renderPrevious()}
      {renderCurrentPage()}
      {renderNext()}
      {renderLast()}
      {renderPageSize()}
      {/* {renderExportButtons()} */}
    </Container>
  );
};

Pagination.defaultProps = {
  Config: {},
  Localization: {
    First: "First",
    Last: "Last",
    Next: "Next",
    Previous: "Previous",
  },
  //------------------------------
  EnableExports: false,
  CurrentPage: 1,
  IsLoading: false,
  DataCount: 0,
  PageSizes: [10, 20, 30, 40, 50],
  PageSize: 10,
  OnPageSizeChanged: () => {},
  LoadedDataCount: 0,
  CanGoToNextPage: false,
  CanGoToPreviousPage: false,
  CanGoToFirstPage: false,
  CanGoToLastPage: false,
  goToNextPage: () => {},
  goToPreviousPage: () => {},
  goToFirstPage: () => {},
  goToLastPage: () => {},
  Export: () => {},
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
