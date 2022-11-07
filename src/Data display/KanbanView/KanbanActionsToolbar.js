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
  border: ${props => `1px solid ${getColorRgbaValue(
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

const KanbanActionsToolbar = React.forwardRef((props, ref) => {
  const {
    showCreate,
    enableCreate,
    createText,
    actionsText,
    actions,
    //----------------
    onCreate,
    //-------------------
    className,
    style,
    color,
    size,
    ...rest
  } = props;

  const { theme } = useTheme();

  return (
    <StyledToolbar ref={ref} theme={theme} color={color} className={className} style={style} {...rest}>
      <div>
        {showCreate && (
          <Button
            leadingIcon="plus"
            btnType="outline"
            color={color}
            size={size}
            title={createText}
            disabled={!enableCreate}
            onClick={onCreate}
            text={createText}
          />
        )}
      </div>
      {actions?.length > 0 && <div>
        <DropdownMenu
          color={color}
          size={size}
          control={
            <Button
              text={actionsText}
              btnType="outline"
              trailingIcon={"angle-down"}
              color={color}
              size={size}
            />
          }
        >
          {actions?.map((action, index) => {
            if (action?.show != false)
              return (
                <DropdownItem
                  key={index}
                  icon={action.icon}
                  disabled={!action.enable}
                  onClick={action.onAction}
                >
                  {action.name}
                </DropdownItem>
              );
          })}
        </DropdownMenu>
      </div>}
    </StyledToolbar>
  );
});

KanbanActionsToolbar.defaultProps = {
  __TYPE__: "KANBAN_VIEW_ACTIONS_TOOLBAR",
  showCreate: true,
  enableCreate: true,
  createText: "Create New item",
  actionsText: "Actions",
  actions: [],
  //-----------------------
  onCreate: () => { },
   //-----------------------
  style: {},
  color: "primary",
  size: "small"
};

KanbanActionsToolbar.propTypes = {
  /**
   * This property determines where the component is rendered.
   * Should not be overridden!
   */
  __TYPE__: PropTypes.string,
  showCreate: PropTypes.bool,
  enableCreate: PropTypes.bool,
  createText: PropTypes.string,
  actionsText: PropTypes.string,
  /**
   * Actions that will be shown in toolbar with existing actions
   * actions=[{name: `<string>`, show: `<bool>`, enable: `<bool>`, onAction: `PropTypes.func`}, ...]
   */
  actions: PropTypes.array,
  //-------------------------------------------------------------
  onCreate: PropTypes.func,
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
    "neutral"
  ]),
};

export default KanbanActionsToolbar;
