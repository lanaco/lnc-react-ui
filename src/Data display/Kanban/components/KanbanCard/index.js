import React from "react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import Icon from "../../../../General/Icon";
import DropdownMenu from "../../../../Utility/DropdownMenu/index";
import DropdownItem from "../../../../Utility/DropdownMenu/DropdownItem";
import { Handle } from "../Handle";

const StyledCard = styled.div`
  height: 100%;
  width: 100%;
  padding: ${(props) =>
    `18px 20px 18px ${props.handle == true ? "10px" : "20px"}`};
  position: relative;
  word-wrap: break-word;
  white-space: pre-wrap;
  word-break: break-word;
  display: flex;
  gap: 8px;
  & .card-action-lnc {
    position: absolute;
    right: 10px;
    cursor: pointer;
  }

  & > .kanban-card-content {
    ${(props) => props.clickable && "cursor: pointer;"}
  }
`;

const Actions = styled.div`
  display: flex;

  & > *:first-of-type:not(:last-of-type) {
    opacity: 0;
  }

  & > *:first-of-type:not(:last-of-type):focus-visible {
    opacity: 1;
  }
`;

const KanbanCard = React.memo(
  React.forwardRef(
    (
      {
        id,
        containerId,
        item,
        handle,
        handleProps,
        actionsMenu,
        actions,
        onDetails,
        color,
        size,
        className,
        style,
        children,
        ...rest
      },
      ref
    ) => {
      const theme = useTheme();

      return (
        <StyledCard
          ref={ref}
          handle={handle}
          theme={theme}
          className={className}
          style={style}
          clickable={onDetails ? true : false}
          {...rest}
        >
          {handle && (
            <Actions className={"Actions"}>
              <Handle {...handleProps} />
            </Actions>
          )}
          {actionsMenu && (
            <DropdownMenu
              className="card-action-lnc"
              horizontalAlignment="right"
              verticalAlignment="bottom"
              color={color}
              size={size}
              control={
                <Icon
                  color="neutral"
                  className="card-action-lnc"
                  icon="ellipsis-v"
                />
              }
            >
              {actions?.map((action, index) => {
                if (action?.show != false)
                  return (
                    <DropdownItem
                      key={index}
                      icon={action.icon}
                      disabled={action.enable == false}
                      onClick={(e) => action.onAction(e, item, containerId)}
                    >
                      {action.name}
                    </DropdownItem>
                  );
              })}
            </DropdownMenu>
          )}
          <div
            className="kanban-card-content-lnc"
            onClick={(e) => {
              onDetails && onDetails(e, item, containerId);
            }}
          >
            {children}
          </div>
        </StyledCard>
      );
    }
  )
);

KanbanCard.defaultProps = {
  __TYPE__: "KANBAN_CARD",
  handle: true,
  actionsMenu: false,
  actions: [],
  //-------------------------
  // onDetails: (e, item, columnId) => { },
  //-------------------------
  style: {},
  color: "primary",
  size: "small",
};

KanbanCard.propTypes = {
  __TYPE__: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  containerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  style: PropTypes.object,
  handle: PropTypes.bool,
  handleProps: PropTypes.any,
  /**
   * Show actions menu on Card
   */
  actionsMenu: PropTypes.bool,
  /**
   * type of: [{ name: `<string>`, show: `<bool>`, enable: `<bool>`, onAction: `<func>`, icon: `<string>`}]
   * show and enable are true by default
   */
  actions: PropTypes.array,
  //-------------------------------------------------------------
  /**
   * (e, item, columnId) => { }
   */
  onDetails: PropTypes.func,
  //-------------------------------------------------------------
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "information",
    "neutral",
    "gray"
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default KanbanCard;
