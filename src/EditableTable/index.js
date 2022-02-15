import React, {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { getChildComponentByType, renderCustomElement } from "../_utils/utils";
import theme from "../_utils/theme";
import Table from "../Table/index";
import EditableTableCell from "./components/EditableTableCell";
import EditableTableRow from "./components/EditableTableRow";

const EditableTable = forwardRef((props, ref) => {
  //
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
    Ordering,
  } = props;

  //================ STATE =================================================================

  const [state, setState] = useState({
    PreviousFocusedCell: null,
    FocusedCell: null,
    FocusedRowData: null,
  });

  // const stateRef = useRef({
  //   PreviousFocusedCell: null,
  //   FocusedCell: null,
  // });

  const tableRef = React.createRef();

  //================ LIFECYCLE =============================================================

  // Functions exposed to parent via ref
  useImperativeHandle(ref, () => ({}), [
    state, // Update functions when certain state changes
  ]);

  useEffect(() => {
    loadCustomRenderers();
  }, []);

  //================ EVENTS ================================================================

  const onSave = () => console.log("SAVE");

  const onFocusChanged = (e, focused, rowIndex, cellIndex) => {
    // if (focused) {
    //   console.log("focus", {
    //     ...state,
    //     FocusedCell: {
    //       row: rowIndex,
    //       cell: cellIndex,
    //     },
    //   });
    //   if (
    //     state.PreviousFocusedCell &&
    //     state.PreviousFocusedCell.row !== rowIndex
    //   ) {
    //     onSave();
    //   }
    //   setState({
    //     ...state,
    //     FocusedCell: {
    //       row: rowIndex,
    //       cell: cellIndex,
    //     },
    //   });
    // }
    // if (!focused) {
    //   console.log("blur", {
    //     PreviousFocusedCell: { ...state.FocusedCell },
    //     FocusedCell: null,
    //     FocusedRowData: null,
    //   });
    //   setState({
    //     PreviousFocusedCell: { ...state.FocusedCell },
    //     FocusedCell: null,
    //     FocusedRowData: null,
    //   });
    //   if (
    //     e.relatedTarget === null ||
    //     (e.relatedTarget && !e.relatedTarget.hasAttribute("focusable"))
    //   ) {
    //     onSave();
    //   }
    // }
  };

  const onCellFocus = (e, rowIndex, cellIndex) => {};

  const onCellBlur = (e, rowIndex, cellIndex) => {};

  //================ METHODS ===============================================================

  const loadCustomRenderers = () => {
    var customTableCell = getChildComponentByType("TABLE_CELL", props.children);

    if (customTableCell && React.isValidElement(customTableCell))
      tableCellRender.current = customTableCell;
  };

  //================ RENDER ================================================================

  return (
    <>
      <Table
        ref={tableRef}
        {...props}
        VisibilityPattern={null}
        // onCellFocus={onCellFocus}
        // onCellBlur={onCellBlur}
      >
        {/* {props.children} */}
        {/* <EditableTableRow /> */}
        <EditableTableCell onFocusChanged={onFocusChanged} />
      </Table>
    </>
  );
});

EditableTable.defaultProps = {
  __TYPE__: "EDITABLE_TABLE",
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
