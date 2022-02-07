import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { getChildComponentByType, renderCustomElement } from "../_utils/utils";
import { isObject } from "lodash";
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

const Container = styled.div`
  padding: 10px;
  margin: 2px;
  border: 1px solid #80808080;
  border-radius: 2px;
  overflow-x: auto;
  white-space: nowrap;
  font-size: ${theme.typography.small.fontSize};
  font-family: ${theme.typography.fontFamily};
`;

const HtmlTable = styled.table`
  table-layout: fixed;
  width: 100%;
  white-space: nowrap;
  border-collapse: collapse;
`;

const HtmlHead = styled.thead``;

const HtmlBody = styled.tbody``;

const Table = (props) => {
  //================== PROPS ===========================================

  var {
    EnableSelection,
    EnableOrdering,
    EnableSelectAll,
    //--------------------
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

  const [
    tBodyRef,
    { x, y, width, height, top, right, bottom, left },
  ] = useMeasure();

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
    console.log(width);
  }, [width]);

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
        var reduceWidthByAmount = ((32 / width) * 100) / columnsToRender.length;

        columnsToRender = columnsToRender.map((col) => ({
          ...col,
          width: col.width - reduceWidthByAmount,
        }));
      }
    } else {
      columnsToRender = Columns.map((x) => ({ ...x }));
    }

    return columnsToRender;
  };

  const checkColumnsWidthSum = (columnsToRender, index) => {
    //
    var widthSum = columnsToRender
      .map((x) => x.width)
      .reduce((prev, next) => prev + next);

    // if (widthSum !== 100)
    //   console.error(
    //     `Error: Row ${index} - sum of column widths is ${widthSum}.`
    //   );
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

  //================== RENDER ==========================================

  const renderRow = (rowData = {}, index) => {
    let rowSelection = {};
    var columnsToRender = filterColumns();

    checkColumnsWidthSum(columnsToRender, index);

    // Check if row is selected
    if (EnableSelection) calculateRowSelection(rowData);

    var rowProps = {
      onRowClick,
      onSelectRow,
      RowData: rowData,
      SelectedData,
      EnableSelection,
      Columns,
      ColumnsToRender: columnsToRender,
      Index: index,
      ...themeProps,
      ...rowSelection,
    };

    var children = (
      <>
        {EnableSelection === true &&
          renderSelectionCell(rowSelection.IsSelected, rowData)}

        {columnsToRender.map((column, index) => {
          return renderCell(rowData, column, index);
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

  const renderCell = (rowData, column, index) => {
    var cellProps = {
      RowData: rowData,
      Column: column,
      Index: index,
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
      IsSelected: isSelected,
      ...themeProps,
    };

    return (
      renderCustomElement(tableSelectionCellRender, selectionCellProps) || (
        <TableSelectionCell
          {...selectionCellProps}
          key={index}
          width={(32 / width) * 100}
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
      ...themeProps,
    };

    return (
      renderCustomElement(tableHeadSelectionCellRender, cellProps) || (
        <TableHeadSelectionCell
          {...cellProps}
          key={-1}
          width={(32 / width) * 100}
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

  return (
    <Container className={className}>
      {renderHeader()}

      <HtmlTable>
        <HtmlHead>{renderHeadRow()}</HtmlHead>
        <HtmlBody ref={tBodyRef}>
          {Data.map((rowData, index) => renderRow(rowData, index))}
        </HtmlBody>
      </HtmlTable>

      {renderFooter()}
    </Container>
  );
};

Table.defaultProps = {
  __TYPE__: "TABLE",
  Columns: [],
  Data: [],
  EnableSelection: false,
  EnableOrdering: false,
  SelectedData: [],
  EnableSelectAll: false,
  SelectedEntirePage: false,
  RowIdentifier: "id",
  VisibilityPattern: {},
  Ordering: [],
  //--------------------
  onColumnClick: null,
  onRowClick: null,
  onSelectRow: null,
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
  //----------------------------------------
  Columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  Data: PropTypes.arrayOf(PropTypes.object).isRequired,
  SelectedData: PropTypes.arrayOf(PropTypes.string),
  EnableSelectAll: PropTypes.bool,
  SelectedEntirePage: PropTypes.bool,
  RowIdentifier: PropTypes.string,
  VisibilityPattern: PropTypes.object,
  Ordering: PropTypes.arrayOf(PropTypes.object),
  //----------------------------------------
  onColumnClick: PropTypes.func,
  onRowClick: PropTypes.func,
  onSelectRow: PropTypes.func,
  //----------------------------------------
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
  theme: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default Table;
