import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const StyledView = styled.div`
  & .table-view-pagination-lnc {
    padding: 0 0.625rem;
  }
  & .table-view-toolbar-lnc {
    margin: 0 0.625rem;
  }
`;

const KanbanView = React.forwardRef((props, ref) => {
    const {

      //----------------
      
      //------------------
      className,
      style,
      size,
      color,
      children,
      ...rest
    } = props;

    return <StyledView></StyledView>
});


KanbanView.defaultProps = {
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
    //-----------------------
    //-----------------------
    style: {},
    size: "small",
    color: "primary",
  };

KanbanView.propTypes = {
    tableProps: PropTypes.object,
    toolbarProps: PropTypes.object,
    paginationProps: PropTypes.object,
    rowsSingleSelect: PropTypes.bool,
    rowsMultiSelect: PropTypes.bool,
    loading: PropTypes.bool,
    showCreate: PropTypes.bool,
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
     * customActions=[{name: `<string>`, show: `<bool>`, enable: `<bool>`, enableOnSelection: `<bool>`, onAction: `PropTypes.func`, customAction: `PropTypes.element`}, ...]
     */
    customActions: PropTypes.array,
    //-------------------------------------------------------------
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
    ]),
  };
  
  export default KanbanView;