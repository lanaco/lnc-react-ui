import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import IconButton from "../../General/IconButton/index";
import DropdownMenu from "../../Utility/DropdownMenu/index";
import DropdownItem from "../../Utility/DropdownMenu/DropdownItem";
import Separator from "../../Utility/DropdownMenu/Separator";
import Button from "../../General/Button/index";
import { getColorRgbaValue } from "../../_utils/utils";
import { useTheme } from "../../ThemeProvider";

const StyledToolbar = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 6px;
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 100%);
  background-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Toolbar",
      props.color,
      "enabled",
      "background",
      "backgroundOpacity"
    )};
  border: ${(props) =>
    `1px solid ${getColorRgbaValue(
      props.theme,
      "Toolbar",
      props.color,
      "enabled",
      "border",
      "borderOpacity"
    )}`};
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
    readOnly,
    actionDropdownProps,
    actionsDropdownZIndex,
    actionsDropdownPlacement,
    //----------------
    onCreate,
    onEdit,
    onDelete,
    onCopy,
    className,
    style,
    color,
    size,
    ...rest
  } = props;

  const { theme } = useTheme();

  return (
    <StyledToolbar
      ref={ref}
      theme={theme}
      color={color}
      className={`lnc-table-view-actions-toolbar ${className}`}
      style={style}
      {...rest}
    >
      <div>
        {showCreate && readOnly == false && (
          <Button
            leadingIcon="plus"
            btnType="outline"
            type="button"
            color={color}
            size={size}
            title={createText}
            disabled={!enableCreate}
            onClick={onCreate}
            text={createText}
          />
        )}
      </div>
      <div>
        <DropdownMenu
          className="lnc-table-view-actions-toolbar-dropdown"
          color={color}
          size={size}
          zIndex={actionsDropdownZIndex}
          placement={actionsDropdownPlacement}
          {...actionDropdownProps}
          control={
            <Button
              text={actionsText}
              btnType="outline"
              trailingIcon={"angle-down"}
              color={color}
              size={size}
              type="button"
            />
          }
        >
          {showCopy && readOnly == false && (
            <DropdownItem
              icon="copy"
              disabled={!(enableCopyOnSelection && selectedRowsLength > 0)}
              onClick={onCopy}
            >
              {copyText}
            </DropdownItem>
          )}
          {showEdit && readOnly == false && (
            <DropdownItem
              icon="pen"
              disabled={!(enableEditOnSelection && selectedRowsLength > 0)}
              onClick={onEdit}
            >
              {editText}
            </DropdownItem>
          )}
          {showDelete && readOnly == false && (
            <DropdownItem
              icon="trash"
              disabled={!(enableDeleteOnSelection && selectedRowsLength > 0)}
              onClick={onDelete}
            >
              {deleteText}
            </DropdownItem>
          )}
          <Separator />
          {customActions?.map((action, index) => {
            if (action?.show != false)
              return (
                <DropdownItem
                  key={index}
                  icon={action.icon}
                  disabled={
                    !(
                      (action.enableOnSelection == true &&
                        selectedRowsLength > 0) ||
                      (action.enable == true &&
                        action.enableOnSelection == false)
                    )
                  }
                  onClick={action.onAction}
                >
                  {action.name}
                </DropdownItem>
              );
          })}
        </DropdownMenu>
      </div>
    </StyledToolbar>
  );
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
  readOnly: false,
  //-----------------------
  onCreate: () => {},
  onEdit: () => {},
  onDelete: () => {},
  onCopy: () => {},
  //-----------------------
  style: {},
  color: "primary",
  size: "small",
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
  /**
   * If `readOnly={true}` actions Delete, Edit and Copy won't be shown.
   */
  readOnly: PropTypes.bool,
  //-------------------------------------------------------------
  onCreate: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onCopy: PropTypes.func,
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

export default ActionsToolbar;
