import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { getChildComponentByType, renderCustomElement } from "../_utils/utils";
import theme from "../_utils/theme";
import Table from "../Table/index";
import EditableTableCell from "./components/EditableTableCell";
import EditableTableRow from "./components/EditableTableRow";

const EditableTable = (props) => {
  //
  //================ STATE =================================================================

  const [state, setState] = useState({});

  const tableCellRender = useRef(null);

  //================ LIFECYCLE =============================================================

  useEffect(() => {
    loadCustomRenderers();
  }, []);

  //================ METHODS ===============================================================

  const loadCustomRenderers = () => {
    var customTableCell = getChildComponentByType("TABLE_CELL", props.children);

    if (customTableCell && React.isValidElement(customTableCell))
      tableCellRender.current = customTableCell;
  };

  //================ RENDER ================================================================

  return (
    <Table {...props} VisibilityPattern={null}>
      {/* {props.children} */}
      <EditableTableRow />
      <EditableTableCell />
    </Table>
  );
};

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
