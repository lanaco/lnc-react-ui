import React, {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { cloneDeep, isEmpty } from "lodash";
import { getChildComponentByType, renderCustomElement } from "../_utils/utils";
import theme from "../_utils/theme";
import Table from "../Table/index";
import EditableTableCell from "./components/EditableTableCell";
import EditableTableRow from "./components/EditableTableRow";
import EditableTableRowsRenderer from "./components/EditableTableRowsRenderer";

const EditableTable = forwardRef((props, ref) => {
  //
  var { onSave, cellDataChanged, Data, Columns, RowIdentifier } = props;

  //================ STATE =================================================================

  const [data, setData] = useState([]);

  const editedDataRef = useRef([]);

  const focusedCell = useRef({
    FocusedCell: null,
    PreviousFocusedCell: null,
  });

  const tableRef = React.createRef();

  //================ LIFECYCLE =============================================================

  // Functions exposed to parent via ref
  useImperativeHandle(ref, () => ({}), [
    props, // Update functions when certain state changes
  ]);

  useEffect(() => {
    loadCustomRenderers();
  }, []);

  useEffect(() => {
    setData([...Data, { ...props.EmptyDataItem }]);
  }, [Data]);

  //================ EVENTS ================================================================

  const updateDataArray = (editedRow) => {
    var dataCopy = [...data];

    var row = dataCopy.find(
      (x) => String(x[RowIdentifier]) === String(editedRow[RowIdentifier])
    );

    dataCopy[dataCopy.indexOf(row)] = editedRow;

    setData(dataCopy);
  };

  const handleDataChange = (value, column, rowData) => {
    var originalRowData = cloneDeep(rowData);
    var editedDataCopy = cloneDeep(editedDataRef.current);
    var editedRow = {};

    var imutableEditedRow = editedDataCopy.find(
      (x) => String(x[RowIdentifier]) === String(originalRowData[RowIdentifier])
    );

    if (imutableEditedRow) {
      //-----
      editedRow = cloneDeep(imutableEditedRow);
      editedRow[column.accessor] = value;

      editedRow = cellDataChanged(editedRow, imutableEditedRow);
      updateDataArray(editedRow);

      editedDataCopy[editedDataCopy.indexOf(imutableEditedRow)] = editedRow;
      editedDataRef.current = editedDataCopy;
      //-----
    } else {
      //-----
      editedRow = cloneDeep(originalRowData);
      editedRow[column.accessor] = value;

      editedRow = cellDataChanged(editedRow, originalRowData);
      updateDataArray(editedRow);

      editedDataCopy.push(editedRow);
      editedDataRef.current = editedDataCopy;
      //-----
    }
  };

  const handleOnSave = (e, rowIndex) => {
    // If focus is outside of the table
    if (
      e.relatedTarget === null ||
      e.relatedTarget.closest("tbody") === null ||
      (!e.relatedTarget.closest("tbody").hasAttribute("data-tbody") &&
        editedDataRef.current.lenght > 0)
    ) {
      var objectToSave = cloneDeep(editedDataRef.current[0]) || {};
      editedDataRef.current = [];
      onSave(objectToSave);
    }

    //===============================

    // If focus is on a cell in another row
    if (
      e.relatedTarget &&
      e.relatedTarget.closest("tbody") &&
      e.relatedTarget.closest("tbody").hasAttribute("data-tbody") &&
      parseInt(e.relatedTarget.closest("td").getAttribute("data-rowindex")) !==
        rowIndex &&
      editedDataRef.current.length > 0
    ) {
      var objectToSave = cloneDeep(editedDataRef.current[0]) || {};
      editedDataRef.current = [];
      onSave(objectToSave);
    }
  };

  const onFocusChanged = (e, focused, rowIndex, cellIndex, inputRef) => {
    // On FOCUS
    if (focused) {
      focusedCell.current = {
        ...focusedCell.current,
        FocusedCell: {
          row: rowIndex,
          cell: cellIndex,
          ref: inputRef,
        },
      };
    }

    // On BLUR
    if (!focused) {
      focusedCell.current = {
        PreviousFocusedCell: focusedCell.current.FocusedCell,
        FocusedCell: null,
      };

      handleOnSave(e, rowIndex);
    }
  };

  //================ METHODS ===============================================================

  const loadCustomRenderers = () => {
    var customTableCell = getChildComponentByType("TABLE_CELL", props.children);

    if (customTableCell && React.isValidElement(customTableCell))
      tableCellRender.current = customTableCell;
  };

  //================ RENDER ================================================================

  return (
    <>
      <Table ref={tableRef} {...props} Data={data} VisibilityPattern={null}>
        {props.children}
        <EditableTableRow />
        <EditableTableCell
          TabIndexOffset={50}
          onFocusChanged={onFocusChanged}
          onChange={handleDataChange}
        />
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
