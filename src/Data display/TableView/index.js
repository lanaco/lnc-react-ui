import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import ActionsToolbar from "./ActionsToolbar";
import { useState } from "react";
import Pagination from "../../Utility/Pagination/index";
import { getCustomRender, renderCustomElement } from "../../_utils/utils";
import Table from "../Table";

const StyledView = styled.div`
  & .table-view-pagination-lnc {
    padding: 0 0.625rem;
  }
  & .table-view-toolbar-lnc {
    margin: 0 0.625rem;
  }
`;

const TableView = React.forwardRef((props, ref) => {
  const {
    __TYPE__ = "TABLE_VIEW",
    goToPreviousView,
    tableProps = {},
    paginationProps = {},
    actionsToolbarProps = {},
    rowsSingleSelect = true,
    rowsMultiSelect = false,
    loading = false,
    showCreate = true,
    enableCreate = true,
    enableDetails = true,
    showEdit,
    enableEditOnSelection,
    showDelete = true,
    enableDeleteOnSelection = true,
    showCopy = true,
    enableCopyOnSelection = true,
    customActions,
    pagination = true,
    readOnly = false,
    actionsDropdownZIndex = null,
    actionsDropdownPlacement = null,
    actionDropdownProps,
    //----------------
    onCreate = () => {},
    onEdit = () => {},
    onDelete = () => {},
    onDetails = () => {},
    onCopy = () => {},
    onFilter = () => {},
    onSort = () => {},
    onPageChange = () => {},
    onEmptyRowsSelection = () => {},
    //------------------
    className = "",
    style = {},
    color = "primary",
    size = "small",
    children,
    ...rest
  } = props;

  const toolbarProps = {
    ...actionsToolbarProps,
    showCreate,
    enableCreate,
    showCopy,
    enableCopyOnSelection,
    showEdit,
    enableEditOnSelection,
    showDelete,
    enableDeleteOnSelection,
    customActions,
    readOnly,
  };

  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectedRow = (row, isSelected) => {
    if (isSelected) {
      rowsMultiSelect
        ? setSelectedRows([...selectedRows, row])
        : rowsSingleSelect
        ? setSelectedRows([row])
        : null;
    } else {
      rowsMultiSelect
        ? setSelectedRows((rows) => rows.filter((r) => r != row))
        : setSelectedRows([]);
    }
  };

  const handleRowClick = (e, rowData) => {
    //QUICKFIX ignore when click is on checkbox (row selection checkbox)
    if (e.target?.type !== "checkbox" && e.target?.className !== "checkmark") {
      if (tableProps?.onRowClick) tableProps.onRowClick(e, rowData);

      handleDetails(rowData, e);
    }
  };

  const handleDetails = (rowData, e) => {
    onDetails(rowData, e);
  };

  const handleCreate = (e) => {
    onCreate(e);
  };

  const handleCopy = (e) => {
    onCopy(selectedRows, e);
  };

  const handleEdit = (e) => {
    onEdit(selectedRows, e);
    setSelectedRows([]);
  };

  const handleDelete = (e) => {
    onDelete(selectedRows, e);
    setSelectedRows([]);
  };

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const renderToolbar = () => {
    return (
      renderCustomElement(
        getCustomRender("ACTIONS_TOOLBAR", children),
        {
          ...toolbarProps,
          size: toolbarProps?.size ? toolbarProps.size : size,
          color: toolbarProps?.color ? toolbarProps.color : color,
          className: "table-view-toolbar-lnc " + toolbarProps?.className,
        },
        children
      ) || (
        <ActionsToolbar
          {...toolbarProps}
          className={"table-view-toolbar-lnc " + toolbarProps?.className}
          size={toolbarProps?.size ? toolbarProps.size : size}
          color={toolbarProps?.color ? toolbarProps.color : color}
          selectedRowsLength={selectedRows?.length ? selectedRows.length : 0}
          onCreate={handleCreate}
          onCopy={handleCopy}
          onEdit={handleEdit}
          onDelete={handleDelete}
          actionsDropdownZIndex={actionsDropdownZIndex}
          actionDropdownProps={actionDropdownProps}
          actionsDropdownPlacement={actionsDropdownPlacement}
        />
      )
    );
  };

  const renderTable = () => {
    return (
      renderCustomElement(
        getCustomRender("TABLE", children),
        {
          ...tableProps,
          size: tableProps?.size ? tableProps.size : size,
          color: tableProps?.color ? tableProps.color : color,
          className: "table-view-pagination-lnc " + tableProps?.className,
        },
        children
      ) || (
        <Table
          size={tableProps?.size ? tableProps.size : size}
          color={tableProps?.color ? tableProps.color : color}
          EnableSelection={
            (rowsSingleSelect || rowsMultiSelect) && readOnly == false
          }
          onSelectRow={(e, row, isSelected) =>
            handleSelectedRow(row, !isSelected)
          }
          SelectedData={selectedRows}
          onRowClick={(e, rowData) => handleRowClick(e, rowData)}
          {...tableProps}
        />
      )
    );
  };

  const renderPagination = () => {
    return (
      renderCustomElement(
        getCustomRender("PAGINATION", children),
        {
          ...paginationProps,
          size: paginationProps?.size ? paginationProps.size : size,
          color: paginationProps?.color ? paginationProps.color : color,
          className: "table-view-pagination-lnc " + paginationProps?.className,
        },
        children
      ) || (
        <Pagination
          {...paginationProps}
          size={paginationProps?.size ? paginationProps.size : size}
          color={paginationProps?.color ? paginationProps.color : color}
          className={"table-view-pagination-lnc " + paginationProps?.className}
          onPageChange={handlePageChange}
        />
      )
    );
  };

  return (
    <StyledView ref={ref} {...rest}>
      {renderToolbar()}
      {renderTable()}
      {pagination == true && renderPagination()}
    </StyledView>
  );
});

// TODO : type
// TableView.defaultProps = {
//   __TYPE__: "TABLE_VIEW",
//   tableProps: {},
//   actionsToolbarProps: {},
//   actionsDropdownZIndex: null,
//   actionsDropdownPlacement: null,
//   paginationProps: {},
//   rowsSingleSelect: true,
//   rowsMultiSelect: false,
//   loading: false,
//   showCreate: true,
//   enableCreate: true,
//   enableDetails: true,
//   showDelete: true,
//   enableDeleteOnSelection: true,
//   showCopy: true,
//   enableCopyOnSelection: true,
//   pagination: true,
//   readOnly: false,
//   //-----------------------
//   onCreate: () => {},
//   onEdit: (row) => {},
//   onDelete: (row) => {},
//   onDetails: (row) => {},
//   onCopy: (row) => {},
//   onFilter: () => {},
//   onSort: () => {},
//   onPageChange: (page) => {},
//   //-----------------------
//   style: {},
//   size: "small",
//   color: "primary",
// };

TableView.propTypes = {
  __TYPE__: PropTypes.string,
  tableProps: PropTypes.object,
  actionsToolbarProps: PropTypes.object,
  paginationProps: PropTypes.object,
  rowsSingleSelect: PropTypes.bool,
  rowsMultiSelect: PropTypes.bool,
  loading: PropTypes.bool,
  showCreate: PropTypes.bool,
  actionsDropdownZIndex: PropTypes.any,
  actionsDropdownPlacement: PropTypes.any,
  /**
   * Enable create
   */
  enableCreate: PropTypes.bool,
  /**
   * Enable details on row click
   */
  enableDetails: PropTypes.bool,
  showEdit: PropTypes.bool,
  /**
   * Enable edit when one row is selected
   */
  enableEditOnSelection: PropTypes.bool,
  showDelete: PropTypes.bool,
  /**
   * Enable delete when one row is selected
   */
  enableDeleteOnSelection: PropTypes.bool,
  showCopy: PropTypes.bool,
  /**
   * Enable copy when one row is selected
   */
  enableCopyOnSelection: PropTypes.bool,
  /**
   * Actions that will be shown in toolbar with existing actions
   * type of [{name: `<string>`, show: `<bool>`, enable: `<bool>`, enableOnSelection: `<bool>`, onAction: `<func>`, customAction: `<elemet>`}, ...]
   */
  customActions: PropTypes.array,
  /**
   * Determines whether will pagination be shown in view
   */
  pagination: PropTypes.bool,
  /**
   * If `readOnly={true}` actions Delete, Edit and Copy won't be shown. Row Selction will be disabled.
   */
  readOnly: PropTypes.bool,
  //-------------------------------------------------------------
  onCreate: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onDetails: PropTypes.func,
  onCopy: PropTypes.func,
  onFilter: PropTypes.func,
  onSort: PropTypes.func,
  onPageChange: PropTypes.func,
  //------------------------------------------------------------
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "information",
    "neutral",
    "gray",
  ]),
};

export default TableView;

TableView.displayName = 'TABLE_VIEW';