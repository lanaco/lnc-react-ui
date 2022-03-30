import React, { useEffect, forwardRef, useImperativeHandle } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { getCustomRender, renderCustomElement } from "../../_utils/utils";
import { isObject, isFinite, cloneDeep } from "lodash";
import { useScreenSize } from "../../_utils/utils";
import theme from "../../_utils/theme";
import { screenSizes } from "./constants/constants";
import TableRow from "./components/TableRow";
import TableCell from "./components/TableCell";
import TableSelectionCell from "./components/TableSelectionCell";
import TableHeadRow from "./components/TableHeadRow";
import TableHeadCell from "./components/TableHeadCell";
import TableHeadSelectionCell from "./components/TableHeadSelectionCell";
import TableRowStatusIndicatorCell from "./components/TableRowStatusIndicatorCell";
import TableHeadRowStatusIndicatorCell from "./components/TableHeadRowStatusIndicatorCell";
import { useMeasure } from "react-use";
import Spinner from "../../Feedback/Spinner/index";
import Fade from "react-reveal/Fade";

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
  opacity: 0.7;
  background-color: white;
  filter: alpha(opacity=10);
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

/**
 * A table component.
 */
const Table = forwardRef((props, ref) => {
  //================== PROPS ===========================================

  var {
    EnableSelection,
    EnableOrdering,
    EnableSelectAll,
    EnableLoader,
    PreRenderedTableBody = false,
    //--------------------
    EnableRowStatusIndicator,
    EnableRowTextHighlight,
    GetRowStatusIndicatorColor,
    GetRowTextHighlightColor,
    //--------------------
    NoDataText,
    //--------------------
    Loading,
    // TODO: add alignText prop to Column object
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

  //================== LIFECYCLE =======================================

  // Functions exposed to parent via ref
  useImperativeHandle(
    ref,
    () => ({
      getTableData: () => Data,
    }),
    [
      Data, // Update functions when certain state changes
    ]
  );

  const [tableRef, { width }] = useMeasure();

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

        if (EnableRowStatusIndicator === true) {
          reduceWidthByAmount += (3 / width) * 100;
        }

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

        if (EnableRowStatusIndicator === true) {
          reduceWidthByAmount += (3 / width) * 100;
        }

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

    if (isFinite(sum) && (sum > 101 || sum < 98))
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
        {EnableRowStatusIndicator === true &&
          renderRowStatusIndicatorCell(rowData)}

        {EnableSelection === true &&
          renderSelectionCell(rowSelection.IsSelected, rowData)}

        {columnsToRender.map((column, cellIndex) => {
          return renderCell(rowData, column, cellIndex, index, columnsToRender);
        })}
      </>
    );

    return (
      renderCustomElement(
        getCustomRender("TABLE_ROW", props.children),
        rowProps,
        children
      ) || (
        <TableRow {...rowProps} key={index}>
          {children}
        </TableRow>
      )
    );
  };

  const renderCell = (rowData, column, index, rowIndex, columnsToRender) => {
    var cellProps = {
      RowData: rowData,
      Column: column,
      ColumnsToRender: columnsToRender,
      Index: index,
      RowIndex: rowIndex,
      key: index,
      EnableSelection,
      RowIdentifier,
      EnableRowTextHighlight,
      GetRowTextHighlightColor,
      ...themeProps,
    };

    return (
      renderCustomElement(
        getCustomRender("TABLE_CELL", props.children),
        cellProps
      ) || <TableCell {...cellProps} key={index} />
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
      renderCustomElement(
        getCustomRender("TABLE_SELLECTION_CELL", props.children),
        selectionCellProps
      ) || (
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
        {EnableRowStatusIndicator === true &&
          renderHeadRowStatusIndicatorCell()}
        {EnableSelection === true && renderHeadSelectionCell()}
        {filterColumns().map((col, index) => renderHeadCell(col, index))}
      </>
    );

    return (
      renderCustomElement(
        getCustomRender("TABLE_HEAD_ROW", props.children),
        headRowProps,
        children
      ) || (
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
      renderCustomElement(
        getCustomRender("TABLE_HEAD_CELL", props.children),
        cellProps
      ) || <TableHeadCell {...cellProps} key={index} />
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
      renderCustomElement(
        getCustomRender("TABLE_HEAD_SELECTION_CELL", props.children),
        cellProps
      ) || (
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
      renderCustomElement(getCustomRender("TABLE_HEADER", props.children), {
        Data,
        Columns,
        ...themeProps,
      }) || <></>
    );
  };

  const renderFooter = () => {
    return (
      renderCustomElement(getCustomRender("TABLE_FOOTER", props.children), {
        Data,
        Columns,
        ...themeProps,
      }) || <></>
    );
  };

  const renderSpecialLastRow = () => {
    return (
      renderCustomElement(
        getCustomRender("TABLE_SPECIAL_LAST_ROW", props.children),
        {
          Data,
          Columns,
          ColumnsToRender: filterColumns(),
          Disabled: Loading,
          ...themeProps,
        }
      ) || <></>
    );
  };

  const renderNoDataRow = () => {
    if (Data === null || Data === undefined || (Data && Data.length === 0)) {
      var colspan = filterColumns().length;

      if (EnableSelection) colspan++;

      return (
        <tr>
          <td colSpan={colspan}>
            <NoDataRow {...themeProps}>{NoDataText}</NoDataRow>
          </td>
        </tr>
      );
    }

    return <></>;
  };

  const renderRowStatusIndicatorCell = (rowData) => {
    var cellProps = {
      ...themeProps,
      key: -1,
      RowData: rowData,
      GetRowStatusIndicatorColor,
    };

    if (EnableRowStatusIndicator === true)
      return (
        <>
          {renderCustomElement(
            getCustomRender("TABLE_ROW_STATUS_INDICATOR_CELL", props.children),
            cellProps
          ) || <TableRowStatusIndicatorCell {...cellProps} />}
        </>
      );

    return <></>;
  };

  const renderHeadRowStatusIndicatorCell = () => {
    var cellProps = {
      ...themeProps,
      key: -1,
    };

    if (EnableRowStatusIndicator === true)
      return (
        <>
          {renderCustomElement(
            getCustomRender(
              "TABLE_HEAD_ROW_STATUS_INDICATOR_CELL",
              props.children
            ),
            cellProps
          ) || <TableHeadRowStatusIndicatorCell {...cellProps} />}
        </>
      );

    return <></>;
  };

  const renderSpinner = () => {
    if (EnableLoader === true && Loading === true)
      return (
        <>
          <LoaderContainer></LoaderContainer>
          <LoaderContainerTransparent>
            <Loader>
              {renderCustomElement(
                getCustomRender("TABLE_LOADER", props.children),
                {
                  ...themeProps,
                  Loading,
                }
              ) || <Spinner />}
            </Loader>
          </LoaderContainerTransparent>
        </>
      );

    return <></>;
  };

  const renderTableBody = () => {
    var bodyProps = cloneDeep(props);
    delete bodyProps.__TYPE__;

    var children = (
      <>
        {Data.map((rowData, index) => renderRow(rowData, index))}
        {renderNoDataRow()}
      </>
    );

    return (
      renderCustomElement(
        getCustomRender("TABLE_BODY", props.children),
        bodyProps,
        PreRenderedTableBody ? children : undefined
      ) || (
        <HtmlBody data-tbody={true} {...themeProps}>
          {children}
        </HtmlBody>
      )
    );
  };

  const renderTable = () => {
    var containerProps = {
      className,
      ...themeProps,
    };

    var children = (
      <div>
        {renderSpinner()}

        {renderHeader()}

        <HtmlTable {...themeProps} data-table={true} ref={tableRef}>
          <HtmlHead {...themeProps}>{renderHeadRow()}</HtmlHead>

          {renderTableBody()}
          {/* <HtmlBody data-tbody={true} {...themeProps}>
            {Data.map((rowData, index) => renderRow(rowData, index))}
            {renderNoDataRow()}
          </HtmlBody> */}
        </HtmlTable>

        {renderSpecialLastRow()}
        {renderFooter()}
      </div>
    );

    return (
      renderCustomElement(
        getCustomRender("TABLE_CONTAINER", props.children),
        containerProps,
        children
      ) || <Container {...containerProps}>{children}</Container>
    );
  };

  return renderTable();
});

Table.defaultProps = {
  __TYPE__: "TABLE",
  ID: "",
  //--------------------
  Loading: false,
  Columns: [],
  Data: [],
  //--------------------
  EnableSelection: false,
  EnableOrdering: false,
  EnableLoader: false,
  EnableSelectAll: false,
  EnableRowStatusIndicator: false,
  EnableRowTextHighlight: false,
  GetRowStatusIndicatorColor: () => {},
  GetRowTextHighlightColor: () => {},
  //--------------------
  NoDataText: "No data to show",
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
  size: "small",
  color: "primary",
  theme: theme,
  className: "",
};

Table.propTypes = {
  /**
   * This property determines where the component is rendered.
   * Should not be overridden!
   */
  __TYPE__: PropTypes.string,
  /**
   *
   */
  ID: PropTypes.string.isRequired,
  //----------------------------------------
  /**
   * Show a selection checkbox in the first cell of every row.
   * Value of the checkbox is determined by the `SelectedData` property.
   */
  EnableSelection: PropTypes.bool,
  /**
   * Show ordering arrows in header cells.
   */
  EnableOrdering: PropTypes.bool,
  /**
   * Show a spinner with backdrop on top of the table when `Loading` is set to `true`.
   */
  EnableLoader: PropTypes.bool,
  /**
   * Show a selection checkbox in the first cell of the table header.
   * Value of the checkbox is determined by the `SelectedEntirePage` property.
   */
  EnableSelectAll: PropTypes.bool,
  /**
   * Show a special status indicator cell on the left edge of the row
   */
  EnableRowStatusIndicator: PropTypes.bool,
  /**
   *
   */
  EnableRowTextHighlight: PropTypes.bool,
  /**
   *
   */
  GetRowStatusIndicatorColor: PropTypes.func,
  /**
   *
   */
  GetRowTextHighlightColor: PropTypes.func,
  //----------------------------------------
  /**
   * Specify the text that is shown when there are 0 rows in the `Data`.
   */
  NoDataText: PropTypes.string,
  /**
   *  Disables some events and actions when set to `true`. Also triggers the spinner if `EnableLoader` is set to `true`.
   */
  Loading: PropTypes.bool,
  /**
   * Defines the table columns.
   * @param id - Column identifier
   * @param displayName - Text displayed in the header
   * @param accessor - Access the property in `Data`
   * @param width - Default column width (overridden by the VisibilityPattern)
   * @param sortable - Can be sorted
   *
   */
  Columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Defines the data displayed in each row.
   */
  Data: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Define the selected data.
   * @param id - Column identifier (mandatory field)
   */
  SelectedData: PropTypes.arrayOf(PropTypes.object),
  /**
   *  Value of the `SelectAll` checkbox.
   */
  SelectedEntirePage: PropTypes.bool,
  /**
   *  Defines which field in a data object is the row identifier.
   */
  RowIdentifier: PropTypes.string,
  /**
   * An object that defines the width and order of columns for different screen sizes.
   * (`XS`,`S`,`M`,`L`,`XL`)
   */
  VisibilityPattern: PropTypes.object,
  /**
   * Describe how the data is ordered.
   * @param columnId - Column identifier, maps to the id on the Column object
   */
  Ordering: PropTypes.object,
  //----------------------------------------
  /**
   * Triggered on header cell click.
   * @param event - event object
   * @param column - column definition
   * @param ordering - updated ordering object, or undefined if ordering is not enabled or the column is not sortable
   */
  onColumnClick: PropTypes.func,
  /**
   * Triggered on table row click.
   * @param event - event object
   * @param rowData - row data
   */
  onRowClick: PropTypes.func,
  /**
   * Triggered on selection checkbox click.
   * @param event - event object
   * @param rowData - row data
   * @param isSelected - the value of selection checkbox
   */
  onSelectRow: PropTypes.func,
  /**
   * Triggered on select all checkbox click.
   * @param event - event object
   * @param isSelected - the value of select all checkbox
   */
  onSelectAll: PropTypes.func,
  //----------------------------------------
  /**
   * Theme object.
   */
  theme: PropTypes.object.isRequired,
  /**
   * `className` applied to the component container.
   */
  className: PropTypes.string,
  /**
   * Defines size of the component (padding, margin, font etc.).
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /**
   *  Defines the palette color for the component.
   */
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