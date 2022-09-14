import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import TableViewToolbar from "./TableViewToolbar";
import { useState } from "react";
import Pagination from "../../Utility/Pagination/index";

const StyledView = styled.div``;

const TableView = React.forwardRef((props, ref) => {
  const {
    table,
    loading,
    showCreate,
    enableCreate,
    showDetails,
    enableDetailsOnSelection,
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
    paginationProps,
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

  //selected row -- ref maybe
  const toolbarProps = {
    showCreate,
    enableCreate,
    showCopy,
    enableCopyOnSelection,
    showDetails,
    enableDetailsOnSelection,
    showEdit,
    enableEditOnSelection,
    showDelete,
    enableDeleteOnSelection,
    customActions,
  };

  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectedRow = (row, isSelected) => {
    if (isSelected) {
      setSelectedRows([...selectedRows, row]);
    } else {
      setSelectedRows((rows) => rows.filter((r) => r != row));
    }
  };

  //onSelectRow
  const clonedTable = () => {
    if (table) {
      return React.cloneElement(table, {
        onSelectRow: (e, row, isSelected) => {
          handleSelectedRow(row, isSelected);
        },
        EnableSelection: true,
      });
    }
  };

  const handleCreate = (e) => {
    onCreate(e);
  };

  const handleDetails = (e) => {
    onDetails(selectedRows, e);
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

  const handlePageChange = (e, p) => {
    console.log("p change", p);
    onPageChange(p);
  }

  return (
    <StyledView ref={ref} {...rest}>
      <TableViewToolbar
        {...toolbarProps}
        selectedRowsLength={selectedRows?.length ? selectedRows.length : 0}
        onCreate={handleCreate}
        onCopy={handleCopy}
        onEdit={handleEdit}
        onDetails={handleDetails}
        onDelete={handleDelete}
      />
      {clonedTable()}
      <Pagination {...paginationProps} onPageNumberClick={handlePageChange}/>
    </StyledView>
  );
});

TableView.defaultProps = {
  loading: false,
  showCreate: true,
  enableCreate: true,
  showDetails: true,
  enableDetailsOnSelection: true,
  showDelete: true,
  enableDeleteOnSelection: true,
  showCopy: true,
  enableCopyOnSelection: true,
  pagination: true,
  enableSorting: true,
  enableFiltering: true,
  //-----------------------
  onCreate: () => {},
  onEdit: (row) => {},
  onDelete: (row) => {},
  onDetails: (row) => {},
  onCopy: (row) => {},
  onFilter: () => {},
  onSort: () => {},
  onPageChange: (page) => {},
  //-----------------------
  style: {},
};

TableView.propTypes = {
  //table props multi select, loading, view loading ????
  loading: PropTypes.bool,
  showCreate: PropTypes.bool,
  enableCreate: PropTypes.bool,
  showDetails: PropTypes.bool,
  enableDetailsOnSelection: PropTypes.bool,
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
  paginationProps: PropTypes.object,
  //-------------------------------------------------------------
  onCreate: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onDetails: PropTypes.func,
  onCopy: PropTypes.func,
  onFilter: PropTypes.func,
  onSort: PropTypes.func,
  onPageChange: PropTypes.func,
  //page prop?????
  //------------------------------------------------------------
  className: PropTypes.string,
  style: PropTypes.object,
};

export default TableView;
