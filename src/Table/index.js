import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { getChildComponentByType, renderCustomElement } from "../_utils/utils";
import { isObject, isFinite } from "lodash";
import { useScreenSize } from "../_utils/utils";
import theme from "../_utils/theme";
import { screenSizes } from "../AdvancedGrid/constants/constants";
import TableRow from "./components/TableRow";
import TableCell from "./components/TableCell";
import TableSelectionCell from "./components/TableSelectionCell";
import TableHeadRow from "./components/TableHeadRow";
import TableHeadCell from "./components/TableHeadCell";
import TableHeadSelectionCell from "./components/TableHeadSelectionCell";
import { useMeasure } from "react-use";
import Spinner from "../Spinner/index";

const Container = styled.div`
  padding: 10px;
  margin: 2px;
  border: 1px solid #80808080;
  border-radius: 2px;
  overflow-x: auto;
  white-space: nowrap;
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  font-family: ${(props) => props.theme.typography.fontFamily};
  position: relative;
`;

const LoaderContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  background-color: #eceaea;
  z-index: 10000000;
  opacity: 0.2;
  filter: alpha(opacity=20);
`;

const LoaderContainerTransparent = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 10000000;
`;

const Loader = styled.div`
  position: absolute;
  top: 48%;
  left: 47%;
`;

const HtmlTable = styled.table`
  // table-layout: fixed;
  width: 100%;
  white-space: nowrap;
  border-collapse: collapse;
`;

const HtmlHead = styled.thead``;

const HtmlBody = styled.tbody``;

const NoDataRow = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  font-family: ${(props) => props.theme.typography.fontFamily};
  padding: 8px 8px 8px 8px;
  background-color: whitesmoke;
  border-radius: 3px;
  margin-top: 4px;
`;

const Table = (props) => {
  //================== PROPS ===========================================

  var {
    EnableSelection,
    EnableOrdering,
    EnableSelectAll,
    EnableLoader,
    //--------------------
    Loading,
    Columns,
    Data,
    SelectedData,
    SelectedEntirePage,
    RowIdentifier,
    VisibilityPattern,
    Ordering,
    //--------------------
    onColumnClick,
    onRowClick,
    onSelectRow,
    onSelectAll,
    //--------------------
    onCellClick,
    onCellFocus,
    onCellBlur,
    //--------------------
    theme,
    color,
    size,
    className,
  } = props;

  const themeProps = {
    theme,
    color,
    size,
  };

  const tableContainerRender = useRef(null);
  const tableLoaderRender = useRef(null);

  const tableRowRender = useRef(null);
  const tableCellRender = useRef(null);
  const tableSelectionCellRender = useRef(null);

  const tableHeadRowRender = useRef(null);
  const tableHeadCellRender = useRef(null);
  const tableHeadSelectionCellRender = useRef(null);

  const tableHeaderRender = useRef(null);
  const tableFooterRender = useRef(null);

  //================== LIFECYCLE =======================================

  useEffect(() => {
    var customTableContainer = getChildComponentByType(
      "TABLE_CONTAINER",
      props.children
    );

    var customTableLoader = getChildComponentByType(
      "TABLE_LOADER",
      props.children
    );

    var customTableRow = getChildComponentByType("TABLE_ROW", props.children);
    var customTableCell = getChildComponentByType("TABLE_CELL", props.children);
    var customTableSelectionCell = getChildComponentByType(
      "TABLE_SELECTION_CELL",
      props.children
    );

    var customTableHeadCell = getChildComponentByType(
      "TABLE_HEAD_CELL",
      props.children
    );

    var customTableRowCell = getChildComponentByType(
      "TABLE_ROW_CELL",
      props.children
    );

    var customTableHeader = getChildComponentByType(
      "TABLE_HEADER",
      props.children
    );

    var customTableFooter = getChildComponentByType(
      "TABLE_FOOTER",
      props.children
    );

    if (customTableContainer && React.isValidElement(customTableContainer))
      tableContainerRender.current = customTableContainer;

    if (customTableLoader && React.isValidElement(customTableLoader))
      tableLoaderRender.current = customTableLoader;

    if (customTableRow && React.isValidElement(customTableRow))
      tableRowRender.current = customTableRow;

    if (customTableCell && React.isValidElement(customTableCell))
      tableCellRender.current = customTableCell;

    if (
      customTableSelectionCell &&
      React.isValidElement(customTableSelectionCell)
    )
      tableSelectionCellRender.current = customTableSelectionCell;

    if (customTableHeadCell && React.isValidElement(customTableHeadCell))
      tableHeadCellRender.current = customTableCell;

    if (customTableRowCell && React.isValidElement(customTableRowCell))
      tableHeadRowRender.current = customTableRowCell;

    if (customTableHeader && React.isValidElement(customTableHeader))
      tableHeaderRender.current = customTableHeader;

    if (customTableFooter && React.isValidElement(customTableFooter))
      tableFooterRender.current = customTableFooter;
  }, []);

  const [tBodyRef, { width }] = useMeasure();

  var screenSize = useScreenSize();

  useEffect(() => {
    if (
      EnableSelection === true &&
      (RowIdentifier === null || RowIdentifier === "")
    )
      console.error(
        "Error: Selection is enabled but the 'RowIdentifier' is empty"
      );
  }, []);

  useEffect(() => {
    if (Columns === null || Columns === undefined || Columns.length === 0)
      console.error("Error: Columns array must have at least one item.");
  }, [Columns]);

  useEffect(() => {
    if (VisibilityPattern) {
      if (!VisibilityPattern.hasOwnProperty(screenSizes.XS.type))
        console.error(getVisibilityPatternError(screenSizes.XS.type));

      if (!VisibilityPattern.hasOwnProperty(screenSizes.S.type))
        console.error(getVisibilityPatternError(screenSizes.S.type));

      if (!VisibilityPattern.hasOwnProperty(screenSizes.M.type))
        console.error(getVisibilityPatternError(screenSizes.M.type));

      if (!VisibilityPattern.hasOwnProperty(screenSizes.L.type))
        console.error(getVisibilityPatternError(screenSizes.L.type));

      if (!VisibilityPattern.hasOwnProperty(screenSizes.XL.type))
        console.error(getVisibilityPatternError(screenSizes.XL.type));
    }
  }, [VisibilityPattern]);

  //================== METHODS =========================================

  const getVisibilityPatternError = (type) =>
    `Error: 'VisibilityPattern' missing property ${type}.`;

  const filterColumns = () => {
    let columnsToRender = [];

    // Calculate columns visibility and size
    if (isObject(VisibilityPattern)) {
      var reduceWidthByAmount = 0;

      columnsToRender = VisibilityPattern[screenSize].map((colForSize) => {
        let col = Columns.find((x) => String(x.id) === String(colForSize.id));

        return {
          ...col,
          ...colForSize,
        };
      });

      if (EnableSelection === true) {
        var reduceWidthByAmount =
          ((getSelectionCellWidthBySize() / width) * 100) /
          columnsToRender.length;

        columnsToRender = columnsToRender.map((col) => ({
          ...col,
          width: col.width - reduceWidthByAmount,
        }));
      }
    } else {
      columnsToRender = Columns.map((x) => ({ ...x }));

      if (EnableSelection === true) {
        var reduceWidthByAmount =
          ((getSelectionCellWidthBySize() / width) * 100) /
          columnsToRender.length;

        columnsToRender = columnsToRender.map((col) => ({
          ...col,
          width: col.width - reduceWidthByAmount,
        }));
      }
    }

    return columnsToRender;
  };

  const checkColumnsWidthSum = (columnsToRender, index) => {
    var reduceWidthByAmount = 0;
    var widthSum = columnsToRender
      .map((x) => x.width)
      .reduce((prev, next) => prev + next);

    if (EnableSelection === true)
      reduceWidthByAmount = (getSelectionCellWidthBySize() / width) * 100;

    var sum = widthSum + reduceWidthByAmount;

    if (isFinite(sum) && (sum > 100 || sum < 99))
      console.error(`Error: Row ${index} - sum of column widths is ${sum}.`);
  };

  const calculateRowSelection = (rowData) => {
    let rowSelection = {};

    // Check if row is selected
    let row = SelectedData.find(
      (x) => String(x[RowIdentifier]) === String(rowData[RowIdentifier])
    );

    if (row !== null && row !== undefined) rowSelection.IsSelected = true;
    else rowSelection.IsSelected = false;

    return rowSelection;
  };

  const getSelectionCellWidthBySize = () => {
    if (size === "small") return 30;
    if (size === "medium") return 36;
    if (size === "large") return 42;

    return 30;
  };

  //================== RENDER ==========================================

  const renderRow = (rowData = {}, index) => {
    let rowSelection = {};
    var columnsToRender = filterColumns();

    checkColumnsWidthSum(columnsToRender, index);

    // Check if row is selected
    if (EnableSelection === true) rowSelection = calculateRowSelection(rowData);

    var rowProps = {
      onRowClick,
      onSelectRow,
      RowData: rowData,
      SelectedData,
      EnableSelection,
      Columns,
      ColumnsToRender: columnsToRender,
      Index: index,
      key: index,
      ...themeProps,
      ...rowSelection,
    };

    var children = (
      <>
        {EnableSelection === true &&
          renderSelectionCell(rowSelection.IsSelected, rowData)}

        {columnsToRender.map((column, cellIndex) => {
          return renderCell(rowData, column, cellIndex, index);
        })}
      </>
    );

    return (
      renderCustomElement(tableRowRender, rowProps, children) || (
        <TableRow {...rowProps} key={index}>
          {children}
        </TableRow>
      )
    );
  };

  const renderCell = (rowData, column, index, rowIndex) => {
    var cellProps = {
      RowData: rowData,
      Column: column,
      Index: index,
      RowIndex: rowIndex,
      key: index,
      EnableSelection,
      onCellFocus,
      onCellBlur,
      ...themeProps,
    };

    return (
      renderCustomElement(tableCellRender, cellProps) || (
        <TableCell {...cellProps} key={index} />
      )
    );
  };

  const renderSelectionCell = (isSelected, rowData, index = -1) => {
    var selectionCellProps = {
      SelectedData,
      RowData: rowData,
      onSelectRow,
      Index: index,
      key: index,
      IsSelected: isSelected,
      ...themeProps,
    };

    return (
      renderCustomElement(tableSelectionCellRender, selectionCellProps) || (
        <TableSelectionCell
          {...selectionCellProps}
          key={index}
          width={(getSelectionCellWidthBySize() / width) * 100}
        />
      )
    );
  };

  const renderHeadRow = () => {
    var headRowProps = {
      Columns,
      ...themeProps,
    };

    var children = (
      <>
        {EnableSelection === true && renderHeadSelectionCell()}
        {filterColumns().map((col, index) => renderHeadCell(col, index))}
      </>
    );

    return (
      renderCustomElement(tableHeadRowRender, headRowProps, children) || (
        <TableHeadRow {...headRowProps} key={0}>
          {children}
        </TableHeadRow>
      )
    );
  };

  const renderHeadCell = (column, index) => {
    var cellProps = {
      Index: index,
      Column: column,
      Ordering,
      EnableOrdering,
      EnableSelectAll,
      onColumnClick,
      ...themeProps,
    };

    return (
      renderCustomElement(tableHeadCellRender, cellProps) || (
        <TableHeadCell {...cellProps} key={index} />
      )
    );
  };

  const renderHeadSelectionCell = () => {
    var cellProps = {
      Index: -1,
      IsSelected: SelectedEntirePage,
      onSelectAll,
      EnableSelectAll,
      ...themeProps,
    };

    return (
      renderCustomElement(tableHeadSelectionCellRender, cellProps) || (
        <TableHeadSelectionCell
          {...cellProps}
          key={-1}
          width={(getSelectionCellWidthBySize() / width) * 100}
        />
      )
    );
  };

  const renderHeader = () => {
    return (
      renderCustomElement(tableHeaderRender, {
        Data,
        Columns,
        ...themeProps,
      }) || <></>
    );
  };

  const renderFooter = () => {
    return (
      renderCustomElement(tableFooterRender, {
        Data,
        Columns,
        ...themeProps,
      }) || <></>
    );
  };

  const renderNoDataRow = () => {
    if (Data === null || Data === undefined || (Data && Data.length === 0)) {
      var colspan = filterColumns().length;

      if (EnableSelection) colspan++;

      return (
        <tr>
          <td colSpan={colspan}>
            <NoDataRow {...themeProps}>{"No data to show"}</NoDataRow>
          </td>
        </tr>
      );
    }

    return <></>;
  };

  const renderSpinner = () => {
    if (EnableLoader === true && Loading === true)
      return (
        <>
          <LoaderContainer></LoaderContainer>
          <LoaderContainerTransparent>
            <Loader>
              {renderCustomElement(tableLoaderRender, {
                ...themeProps,
                Loading,
              }) || <Spinner />}
            </Loader>
          </LoaderContainerTransparent>
        </>
      );

    return <></>;
  };

  const renderTable = () => {
    var containerProps = {
      className,
      ...themeProps,
    };

    var children = (
      <>
        {renderSpinner()}
        {renderHeader()}
        <HtmlTable {...themeProps}>
          <HtmlHead {...themeProps}>{renderHeadRow()}</HtmlHead>
          <HtmlBody ref={tBodyRef} {...themeProps}>
            {Data.map((rowData, index) => renderRow(rowData, index))}
            {renderNoDataRow()}
          </HtmlBody>
        </HtmlTable>
        {renderFooter()}
      </>
    );

    return (
      renderCustomElement(tableContainerRender, containerProps, children) || (
        <Container {...containerProps}>{children}</Container>
      )
    );
  };

  return renderTable();
};

Table.defaultProps = {
  __TYPE__: "TABLE",
  //--------------------
  Loading: false,
  Columns: [],
  Data: [],
  EnableSelection: false,
  EnableOrdering: false,
  EnableLoader: false,
  EnableSelectAll: false,
  SelectedData: [],
  SelectedEntirePage: false,
  RowIdentifier: "id",
  VisibilityPattern: {},
  Ordering: {},
  //--------------------
  onColumnClick: () => {},
  onRowClick: () => {},
  onSelectRow: () => {},
  onSelectAll: () => {},
  //--------------------
  onCellClick: () => {},
  onCellFocus: () => {},
  onCellBlur: () => {},
  //--------------------
  size: "small",
  color: "primary",
  theme: theme,
  className: "",
};

Table.propTypes = {
  __TYPE__: PropTypes.string,
  //----------------------------------------
  EnableSelection: PropTypes.bool,
  EnableOrdering: PropTypes.bool,
  EnableLoader: PropTypes.bool,
  EnableSelectAll: PropTypes.bool,
  //----------------------------------------
  Loading: PropTypes.bool,
  Columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  Data: PropTypes.arrayOf(PropTypes.object).isRequired,
  SelectedData: PropTypes.arrayOf(PropTypes.object),
  SelectedEntirePage: PropTypes.bool,
  RowIdentifier: PropTypes.string,
  VisibilityPattern: PropTypes.object,
  Ordering: PropTypes.object,
  //----------------------------------------
  onColumnClick: PropTypes.func,
  onRowClick: PropTypes.func,
  onSelectRow: PropTypes.func,
  onSelectAll: PropTypes.func,
  //----------------------------------------
  onCellClick: PropTypes.func,
  onCellFocus: PropTypes.func,
  onCellBlur: PropTypes.func,
  //----------------------------------------
  theme: PropTypes.object.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "gray",
    "white",
    "black",
  ]),
};

export default Table;
