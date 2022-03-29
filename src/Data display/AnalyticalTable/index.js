import React, { useRef, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import { getCustomRender, renderCustomElement } from "../../_utils/utils";
import theme from "../../_utils/theme";
import Table from "../Table/index";
import AnalyticalTableRow from "./components/AnalyticalTableRow";
import AnalyticalTableCell from "./components/AnalyticalTableCell";

const AnalyticalTable = forwardRef((props, ref) => {
  //
  var { Data, GroupBy = {} } = props;

  //================ STATE =================================================================

  //================ LIFECYCLE =============================================================

  // Functions exposed to parent via ref
  useImperativeHandle(ref, () => ({}), [
    props, // Update functions when certain state changes
  ]);

  //================ EVENTS ================================================================

  //================ METHODS ===============================================================

  //================ RENDER ================================================================

  const renderAnalyticalTableRow = () => {
    var rowProps = { GroupBy: props.GroupBy };

    return (
      renderCustomElement(
        getCustomRender("TABLE_ROW", props.children),
        rowProps
      ) || <AnalyticalTableRow {...rowProps} />
    );
  };

  const renderAnalyticalTableCell = () => {
    var cellProps = {};

    return (
      renderCustomElement(
        getCustomRender("TABLE_CELL", props.children),
        cellProps
      ) || <AnalyticalTableCell {...cellProps} />
    );
  };

  return (
    <>
      <Table {...props} Data={Data} VisibilityPattern={null}>
        {props.children}
        {renderAnalyticalTableCell()}
        {renderAnalyticalTableRow()}
      </Table>
    </>
  );
});

AnalyticalTable.defaultProps = {
  __TYPE__: "ANALYTICAL_TABLE",
  //--------------------
  Loading: false,
  Columns: [],
  Data: [],
  //--------------------
  EnableSelection: false,
  EnableOrdering: false,
  EnableLoader: false,
  EnableSelectAll: false,
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
  onRowFocusChange: () => {},
  onDiscard: () => {},
  onInputChange: () => {},
  //--------------------
  size: "small",
  color: "primary",
  theme: theme,
  className: "",
};

AnalyticalTable.propTypes = {
  /**
   * This property determines where the component is rendered.
   * Should not be overridden!
   */
  __TYPE__: PropTypes.string,
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
   *  Triggers when the focus is moved to another row or another component outside of the table
   * @param event - event object
   * @param currentRowIndex - index of the currently focused row
   * @param nextRowIndex - index of the next focused row (-1 if the focuse moves otutside of the table rows)
   */
  onRowFocusChange: () => {},
  /**
   *
   */
  onDiscard: () => {},
  /**
   *
   */
  onInputChange: () => {},
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

export default AnalyticalTable;
