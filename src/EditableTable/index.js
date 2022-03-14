import React, { useRef, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import { getCustomRender, renderCustomElement } from "../_utils/utils";
import theme from "../_utils/theme";
import Table from "../Table/index";
import EditableTableCell from "./components/EditableTableCell";
import EditableTableRow from "./components/EditableTableRow";

const EditableTable = forwardRef((props, ref) => {
  //
  var { Data, onRowFocusChange, onDiscard, onInputChange } = props;

  //================ STATE =================================================================

  const focusedCell = useRef({
    FocusedCell: null,
    PreviousFocusedCell: null,
  });

  const mountedCells = useRef([]);
  const firstCellInLastRow = useRef(null);

  const tableRef = useRef();

  //================ LIFECYCLE =============================================================

  // Functions exposed to parent via ref
  useImperativeHandle(
    ref,
    () => ({
      focusFirstCellOfLastRow: () => {
        if (firstCellInLastRow.current) firstCellInLastRow.current.focus();
      },
      focusLastActiveCell: () => {
        try {
          var cell = mountedCells.current.find(
            (x) =>
              x.row === focusedCell.current.PreviousFocusedCell.row &&
              x.cell === focusedCell.current.PreviousFocusedCell.cell
          );

          if (cell.ref) cell.ref.focus();
        } catch (error) {}
      },
    }),
    [
      props, // Update functions when certain state changes
    ]
  );

  //================ EVENTS ================================================================

  const handleDataChange = (e, value, rowIndex, cellIndex, column, rowData) => {
    if (onInputChange)
      onInputChange(e, value, rowIndex, cellIndex, column, rowData);
  };

  const onFocusChanged = (e, focused, rowIndex, cellIndex, divRef) => {
    // On FOCUS
    if (focused) {
      focusedCell.current = {
        ...focusedCell.current,
        FocusedCell: {
          row: rowIndex,
          cell: cellIndex,
          ref: divRef,
        },
      };
    }

    // On BLUR
    if (!focused) {
      focusedCell.current = {
        PreviousFocusedCell: focusedCell.current.FocusedCell,
        FocusedCell: null,
      };

      handleOnSave(e, rowIndex, -1);
    }
  };

  //================ METHODS ===============================================================

  const handleOnSave = (e, rowIndex) => {
    // If focus is outside of the table
    if (
      e.relatedTarget === null ||
      e.relatedTarget.closest("tbody") === null ||
      !e.relatedTarget.closest("tbody").hasAttribute("data-tbody")
    ) {
      onRowFocusChange(e, rowIndex, -1);
    }

    //===============================

    // If focus is on a cell in another row
    if (
      e.relatedTarget &&
      e.relatedTarget.closest("tbody") &&
      e.relatedTarget.closest("tbody").hasAttribute("data-tbody") &&
      parseInt(e.relatedTarget.closest("td").getAttribute("data-rowindex")) !==
        rowIndex
    ) {
      onRowFocusChange(
        e,
        rowIndex,
        parseInt(e.relatedTarget.closest("td").getAttribute("data-rowindex"))
      );
    }
  };

  const handleCellMount = (rowIndex, cellIndex, cellRef) => {
    // Save the the first cell of the last row to a separate ref
    if (rowIndex === Data.length - 1 && cellIndex === 0) {
      firstCellInLastRow.current = cellRef.current;
    }

    // Add first mounted cell
    if (mountedCells.current.length === 0) {
      mountedCells.current = [
        { row: rowIndex, cell: cellIndex, ref: cellRef.current },
      ];
    }

    // Update cell ref if the cell is already added
    if (
      mountedCells.current.length > 0 &&
      mountedCells.current.find(
        (x) => x.row === rowIndex && x.cell === cellIndex
      )
    ) {
      //---

      var cell = mountedCells.current.find(
        (x) => x.row === rowIndex && x.cell === cellIndex
      );

      cell.ref = cellRef.current;

      //---
    }
    // Add next mounted cell
    else if (mountedCells.current.length > 0) {
      mountedCells.current = [
        ...mountedCells.current,
        { row: rowIndex, cell: cellIndex, ref: cellRef.current },
      ];
    }
  };

  //================ RENDER ================================================================

  const renderSpecialLastRow = () => {
    return (
      renderCustomElement(
        getCustomRender("TABLE_SPECIAL_LAST_ROW", props.children),
        {
          TabIndexOffset: 50,
        }
      ) || <></>
    );
  };

  const renderEditableTableCell = () => {
    var cellProps = {
      TabIndexOffset: 50,
      onFocusChanged: onFocusChanged,
      onChange: handleDataChange,
      onDiscard: onDiscard,
      onMount: handleCellMount,
    };

    return (
      renderCustomElement(
        getCustomRender("TABLE_CELL", props.children),
        cellProps
      ) || <EditableTableCell {...cellProps} />
    );
  };

  return (
    <>
      <Table ref={tableRef} {...props} Data={Data} VisibilityPattern={null}>
        <EditableTableRow />
        {props.children}
        {renderEditableTableCell()}
        {renderSpecialLastRow()}
      </Table>
    </>
  );
});

EditableTable.defaultProps = {
  __TYPE__: "EDITABLE_TABLE",
  //--------------------
  onSave: () => {},
  cellDataChanged: (obj) => obj,
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
  size: "small",
  color: "primary",
  theme: theme,
  className: "",
};

EditableTable.propTypes = {
  __TYPE__: PropTypes.string,
  //--------------------
  onSave: PropTypes.func,
  cellDataChanged: PropTypes.func,
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

export default EditableTable;
