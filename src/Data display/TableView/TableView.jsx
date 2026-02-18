/* eslint-disable react/prop-types */
import { forwardRef, useRef } from "react";
import styled from "@emotion/styled";
import ActionsToolbar from "./ActionsToolbar";
import { useState } from "react";
import Pagination from "../../Utility/Pagination/Pagination";
import { getCustomRender, renderCustomElement } from "../../_utils/utils";
import Table from "../Table/Table";

const StyledView = styled.div`
  & .table-view-pagination-lnc {
    padding: 0 0.625rem;
  }
  & .table-view-toolbar-lnc {
    margin: 0 0.625rem;
  }
`;

const TableView = forwardRef((props, ref) => {
  const {
    tableProps = {},
    paginationProps = {},
    actionsToolbarProps = {},
    rowsSingleSelect = true,
    rowsMultiSelect = false,
    showCreate = true,
    enableCreate = true,
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
    onPageChange = () => {},
    //------------------
    color = "primary",
    size = "small",
    children,
    onChangeRowsSelection = () => {},
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
  const selectedRowsRef = useRef([]);

  const handleSelectedRow = (row, isSelected) => {
    if (isSelected) {
      if (rowsMultiSelect || rowsSingleSelect) {
        selectedRowsRef.current = rowsMultiSelect
          ? [...selectedRowsRef.current, row]
          : [row];
        onChangeRowsSelection(selectedRowsRef?.current);
        setSelectedRows(selectedRowsRef?.current);
      }
    } else {
      selectedRowsRef.current = rowsMultiSelect
        ? selectedRowsRef?.current?.filter((r) => r != row)
        : [];
      onChangeRowsSelection?.(selectedRowsRef?.current);

      setSelectedRows(selectedRowsRef?.current);
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
    selectedRowsRef.current = [];
    setSelectedRows([]);
    onChangeRowsSelection([]);
  };

  const handleDelete = (e) => {
    onDelete(selectedRows, e);
    selectedRowsRef.current = [];
    setSelectedRows([]);
    onChangeRowsSelection([]);
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
        children,
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
          selectedRows={selectedRowsRef?.current}
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
        children,
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
        children,
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

export default TableView;

TableView.displayName = "TABLE_VIEW";
