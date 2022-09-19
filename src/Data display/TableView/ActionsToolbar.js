import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import IconButton from "../../General/IconButton/index";
import DropdownMenu from "../../Utility/DropdownMenu/index";
import DropdownItem from "../../Utility/DropdownMenu/DropdownItem";
import Separator from "../../Utility/DropdownMenu/Separator";
import Button from "../../General/Button/index";

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

const ActionsToolbar = React.forwardRef((props, ref) => {
    const {
        showCreate,
        enableCreate,
        createText,
        showEdit,
        enableEditOnSelection,
        editText,
        showDelete,
        enableDeleteOnSelection,
        deleteText,
        showCopy,
        enableCopyOnSelection,
        copyText,
        actionsText,
        customActions,
        selectedRowsLength,
        //----------------
        onCreate,
        onEdit,
        onDelete,
        onCopy,
    } = props;


    return <StyledToolbar>
        <div>
            {showCreate && <Button leadingIcon="plus" type="outline" color="primary" title={createText} disabled={!enableCreate} onClick={onCreate} text={createText} />}
        </div>
        <div>
            <DropdownMenu control={<Button text={actionsText} type="outline" trailingIcon={"angle-down"}/>}>
                {showCopy && <DropdownItem icon="copy" disabled={!(enableCopyOnSelection && selectedRowsLength == 1)} onClick={onCopy}>{copyText}</DropdownItem>}
                {showEdit && <DropdownItem icon="pen" disabled={!(enableEditOnSelection && selectedRowsLength == 1)} onClick={onEdit}>{editText}</DropdownItem>}
                {showDelete && <DropdownItem icon="trash" disabled={!(enableDeleteOnSelection && selectedRowsLength == 1)} onClick={onDelete}>{deleteText}</DropdownItem>}
                <Separator />
                {customActions?.map((action, index) => {
                    if (action?.show != false) return (
                        <DropdownItem 
                        key={index}
                        icon={action.icon}
                        disabled={!((action.enableOnSelection == true && selectedRowsLength == 1) || (action.enable == true && action.enableOnSelection == false))} 
                        onClick={action.onAction}>
                            {action.name}
                        </DropdownItem>
                    )
                }
                )}
            </DropdownMenu>
        </div>
    </StyledToolbar>
});

ActionsToolbar.defaultProps = {
    __TYPE__: "ACTIONS_TOOLBAR",
    showCreate: true,
    enableCreate: true,
    createText: "Create New item",
    showEdit: true,
    enableEditOnSelection: true,
    editText: "Edit",
    showDelete: true,
    enableDeleteOnSelection: true,
    deleteText: "Delete",
    showCopy: true,
    enableCopyOnSelection: true,
    copyText: "Copy",
    actionsText: "Actions",
    selectetedRowsLength: 0,
    //-----------------------
    onCreate: () => { },
    onEdit: () => { },
    onDelete: () => { },
    onCopy: () => { },
};

ActionsToolbar.propTypes = {
    /**
  * This property determines where the component is rendered.
  * Should not be overridden!
  */
    __TYPE__: PropTypes.string,
    showCreate: PropTypes.bool,
    enableCreate: PropTypes.bool,
    createText: PropTypes.string,
    showEdit: PropTypes.bool,
    enableEditOnSelection: PropTypes.bool,
    editText: PropTypes.string,
    showDelete: PropTypes.bool,
    enableDeleteOnSelection: PropTypes.bool,
    deleteText: PropTypes.string,
    showCopy: PropTypes.bool,
    enableCopyOnSelection: PropTypes.bool,
    copyText: PropTypes.string,
    actionsText: PropTypes.string,
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
    onCopy: PropTypes.func,
};

export default ActionsToolbar;