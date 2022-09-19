import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import ActionsToolbar from "./ActionsToolbar";
import { useState } from "react";
import Pagination from "../../Utility/Pagination/index";
import { getCustomRender, renderCustomElement } from "../../_utils/utils";
import Table from "../Table";

const StyledView = styled.div``;

const TableView = React.forwardRef((props, ref) => {
  const {
    tableProps,
    paginationProps,
    rowsSingleSelect,
    rowsMultiSelect,
    loading,
    showCreate,
    enableCreate,
    enableDetails,
    showEdit,
    enableEditOnSelection,
    showDelete,
    enableDeleteOnSelection,
    showCopy,
    enableCopyOnSelection,
    customActions,
    pagination,
    enableSorting,
    enableFiltering,
    //----------------
    onCreate,
    onEdit,
    onDelete,
    onDetails,
    onCopy,
    onFilter,
    onSort,
    onPageChange,
    //------------------
    className,
    style,
    children,
    ...rest
  } = props;

  const toolbarProps = {
    showCreate,
    enableCreate,
    showCopy,
    enableCopyOnSelection,
    showEdit,
    enableEditOnSelection,
    showDelete,
    enableDeleteOnSelection,
    customActions,
  };

  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectedRow = (row, isSelected) => {
    if (isSelected) {
      rowsMultiSelect ? setSelectedRows([...selectedRows, row]) : (rowsSingleSelect ? setSelectedRows([row]) : null);
    } else {
      rowsMultiSelect ? setSelectedRows((rows) => rows.filter((r) => r != row)) : setSelectedRows([]);
    }
  };

  const handleRowClick = (e, rowData) => {
    if(tableProps?.onRowClick) tableProps.onRowClick(e, rowData);

    handleDetails(rowData, e)
  };

  const handleDetails = (e) => {
    onDetails(selectedRows, e);
  };

  const handleCreate = (e) => {
    onCreate(e);
  };

  const handleCopy = (e) => {
    onCopy(selectedRows, e);
  };

  const handleEdit = (e) => {
    onEdit(selectedRows, e)
  };

  const handleDelete = (e) => {
    onDelete(selectedRows, e);
  };

  const handlePageChange = (page) => {
    onPageChange(page);
  }

  const renderToolbar = () => {
    return (
      renderCustomElement(
        getCustomRender("ACTIONS_TOOLBAR", children),
        toolbarProps,
        children
      ) || <ActionsToolbar
        {...toolbarProps}
        selectedRowsLength={selectedRows?.length ? selectedRows.length : 0}
        onCreate={handleCreate}
        onCopy={handleCopy}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    );
  };

  const renderTable = () => {
    return (
      renderCustomElement(
        getCustomRender("TABLE", children),
        tableProps,
        children
      ) || <Table
        EnableSelection={rowsSingleSelect || rowsMultiSelect}
        onSelectRow={(e, row, isSelected) => handleSelectedRow(row, !isSelected)}
        SelectedData={selectedRows}
        onRowClick={handleRowClick}
        {...tableProps}
      />
    );
  };


  const renderPagination = () => {
    return (
      renderCustomElement(
        getCustomRender("PAGINATION", children),
        paginationProps,
        children
      ) || <Pagination
        {...paginationProps}
        onPageChange={handlePageChange} />
    );
  };

  return (
    <StyledView ref={ref} {...rest}>
      {renderToolbar()}
      {renderTable()}
      {renderPagination()}
    </StyledView>
  );
});

TableView.defaultProps = {
  tableProps: {},
  tableProps: {},
  paginationProps: {},
  rowsSingleSelect: true,
  rowsMultiSelect: false,
  loading: false,
  showCreate: true,
  enableCreate: true,
  enableDetails: true,
  showDelete: true,
  enableDeleteOnSelection: true,
  showCopy: true,
  enableCopyOnSelection: true,
  pagination: true,
  enableSorting: true,
  enableFiltering: true,
  //-----------------------
  onCreate: () => { },
  onEdit: (row) => { },
  onDelete: (row) => { },
  onDetails: (row) => { },
  onCopy: (row) => { },
  onFilter: () => { },
  onSort: () => { },
  onPageChange: (page) => { },
  //-----------------------
  style: {},
};

TableView.propTypes = {
  tableProps: PropTypes.object,
  toolbarProps: PropTypes.object,
  paginationProps: PropTypes.object,
  rowsSingleSelect: PropTypes.bool,
  rowsMultiSelect: PropTypes.bool,
  //table props multi select, loading, view loading ????
  loading: PropTypes.bool,
  showCreate: PropTypes.bool,
  enableCreate: PropTypes.bool,
  enableDetails: PropTypes.bool,
  showEdit: PropTypes.bool,
  enableEditOnSelection: PropTypes.bool,
  showDelete: PropTypes.bool,
  enableDeleteOnSelection: PropTypes.bool,
  showCopy: PropTypes.bool,
  enableCopyOnSelection: PropTypes.bool,
  /**
 * if enable=`enable` the action is always enabled, if enableOnSelection=`true` it is enabled only when one row is selected. 
 * By default show=`true` and enable=`true`
 */
  /**
   * Actions that will be shown in toolbar with existing actions
   * customActions=[{name: `<string>`, show: `<bool>`, enable: `<bool>`, enableOnSelection: `<bool>`, onAction: `PropTypes.func`, customAction: `PropTypes.element`}, ...]
   */
  customActions: PropTypes.array,
  /**
   * Determines whether will pagination be shown in view
   */
  pagination: PropTypes.bool,
  enableSorting: PropTypes.bool,
  enableFiltering: PropTypes.bool,
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
};

export default TableView;
