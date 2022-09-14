import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import IconButton from "../../General/IconButton/index";
import Button from "../../General/Button/index";
import { useEffect } from "react";

const StyledToolbar = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 6px;
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 100%);
  background-color: rgba(248, 250, 252, 100%);
  border: 1px solid rgba(203, 213, 225, 100%);
  gap: 6px;
  justify-content: space-between;
  & > div {
    display: flex;
    gap: 0.5rem;
  }
}
`;

const TableViewToolbar = React.forwardRef((props, ref) => {
    const {
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
        selectedRowsLength,
        //----------------
        onCreate,
        onEdit,
        onDelete,
        onDetails,
        onCopy,
        onCustomAction,
    } = props;

    useEffect(() => {
      console.log("cus", customActions);
    }, [customActions])
    

    return <StyledToolbar>
        <div>
            {customActions?.map((action, index) =>
                {if(action?.show != false) return (
                 action.icon ?
                 <IconButton key={index} icon={action.icon} type="outline" color="primary" title={action.name} disabled={!((action.enableOnSelection == true && selectedRowsLength == 1) || (action.enable == true && action.enableOnSelection == false))} onClick={action.onAction} />
                 :
                <Button key={index} text={action.name} type="outline" color="primary" title={action.name} disabled={!((action.enableOnSelection == true && selectedRowsLength == 1) || (action.enable == true && action.enableOnSelection == false))} onClick={action.onAction} />
                )}
            )}
        </div>
        <div>
            {showDetails && <IconButton icon="sticky-note" type="outline" color="primary" title="details" disabled={!(enableDetailsOnSelection && selectedRowsLength == 1)} onClick={onDetails} />}
            {showCreate && <IconButton icon="plus" type="outline" color="primary" title="create" disabled={!enableCreate} onClick={onCreate}/>}
            {showCopy && <IconButton icon="copy" type="outline" color="primary" title="copy" disabled={!(enableCopyOnSelection && selectedRowsLength == 1)} onClick={onCopy}/>}
            {showEdit && <IconButton icon="pen" type="outline" color="secondary" title="edit" disabled={!(enableEditOnSelection && selectedRowsLength == 1)} onClick={onEdit}/>}
            {showDelete && <IconButton icon="trash" type="outline" color="danger" title="delete" disabled={!(enableDeleteOnSelection && selectedRowsLength == 1)} onClick={onDelete}/>}
        </div>
    </StyledToolbar>
});

TableViewToolbar.defaultProps = {
    showCreate: true,
    enableCreate: true,
    showDetails: true,
    enableDetailsOnSelection: true,
    showDelete: true,
    enableDeleteOnSelection: true,
    showCopy: true,
    enableCopyOnSelection: true,
    selectetedRowsLength: 0,
    //-----------------------
    onCreate: () => { },
    onEdit: () => { },
    onDelete: () => { },
    onDetails: () => { },
    onCopy: () => { },
    onCustomAction: (action, e) => { },
};

TableViewToolbar.propTypes = {
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
     * Actions that will be shown in toolbar with existing actions
     * customActions=[{name: `<string>`, show: `<bool>`, enable: `<bool>`, enableOnSelection: `<bool>`, onAction: `PropTypes.func`}, ...]
     */
    customActions: PropTypes.array,
    selectedRowsLength: PropTypes.number,
    //-------------------------------------------------------------
    onCreate: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onDetails: PropTypes.func,
    onCopy: PropTypes.func,
    onCustomAction: PropTypes.func,
};

export default TableViewToolbar;