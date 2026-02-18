/* eslint-disable react/prop-types */
import { memo, forwardRef } from "react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import Icon from "../../../../General/Icon/Icon";
import DropdownMenu from "../../../../Utility/DropdownMenu/DropdownMenu";
import DropdownItem from "../../../../Utility/DropdownMenu/DropdownItem";
import { Handle } from "../Handle/Handle";

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

const KanbanCard = memo(
  forwardRef(
    (
      {
        containerId,
        item,
        handle = true,
        handleProps,
        actionsMenu = false,
        actions = [],
        onDetails,
        color = "primary",
        size = "small",
        className = "",
        style = {},
        children,
        ...rest
      },
      ref,
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
    },
  ),
);

// TODO : type
// KanbanCard.defaultProps = {
//   __TYPE__: "KANBAN_CARD",
//   handle: true,
//   actionsMenu: false,
//   actions: [],
//   //-------------------------
//   // onDetails: (e, item, columnId) => { },
//   //-------------------------
//   style: {},
//   color: "primary",
//   size: "small",
// };

export default KanbanCard;

KanbanCard.displayName = "KANBAN_CARD";
