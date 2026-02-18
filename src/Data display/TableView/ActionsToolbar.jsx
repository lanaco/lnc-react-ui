/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import styled from "@emotion/styled";
import DropdownMenu from "../../Utility/DropdownMenu/DropdownMenu";
import DropdownItem from "../../Utility/DropdownMenu/DropdownItem";
import Separator from "../../Utility/DropdownMenu/Separator";
import Button from "../../General/Button/Button";
import { getColorRgbaValue } from "../../_utils/utils";
import { useTheme } from "../../ThemeProvider/ThemeProvider";

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
      "backgroundOpacity",
    )};
  border: ${(props) =>
    `1px solid ${getColorRgbaValue(
      props.theme,
      "Toolbar",
      props.color,
      "enabled",
      "border",
      "borderOpacity",
    )}`};
  gap: 6px;
  justify-content: space-between;
  & > div {
    display: flex;
    gap: 0.5rem;
  }
`;

const ActionsToolbar = forwardRef((props, ref) => {
  const {
    showCreate = true,
    enableCreate = true,
    createText = "Create new item",
    showEdit = true,
    enableEditOnSelection = true,
    editText = "Edit",
    showDelete = true,
    enableDeleteOnSelection = true,
    deleteText = "Delete",
    showCopy = true,
    enableCopyOnSelection = true,
    copyText = "Copy",
    actionsText = "Actions",
    customActions,
    selectedRowsLength = 0,
    readOnly = false,
    actionDropdownProps,
    actionsDropdownZIndex,
    actionsDropdownPlacement,
    //----------------
    onCreate = () => {},
    onEdit = () => {},
    onDelete = () => {},
    onCopy = () => {},
    className = "",
    style = {},
    color = "primary",
    size = "small",
    selectedRows,
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
                  onClick={() => {
                    action.onAction(selectedRows);
                  }}
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

// TODO : type
// ActionsToolbar.defaultProps = {
//   __TYPE__: "ACTIONS_TOOLBAR",
//   showCreate: true,
//   enableCreate: true,
//   createText: "Create New item",
//   showEdit: true,
//   enableEditOnSelection: true,
//   editText: "Edit",
//   showDelete: true,
//   enableDeleteOnSelection: true,
//   deleteText: "Delete",
//   showCopy: true,
//   enableCopyOnSelection: true,
//   copyText: "Copy",
//   actionsText: "Actions",
//   selectetedRowsLength: 0,
//   readOnly: false,
//   //-----------------------
//   onCreate: () => {},
//   onEdit: () => {},
//   onDelete: () => {},
//   onCopy: () => {},
//   //-----------------------
//   style: {},
//   color: "primary",
//   size: "small",
// };

export default ActionsToolbar;

ActionsToolbar.displayName = "ACTIONS_TOOLBAR";
