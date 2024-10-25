import React from "react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import DropdownMenu from "../../../../Utility/DropdownMenu/index";
import DropdownItem from "../../../../Utility/DropdownMenu/DropdownItem";
import Icon from "../../../../General/Icon";

const StyledHeader = styled.div`
  font-family: ${(props) => props.theme?.typography?.fontFamily};
  position: relative;
  width: 100%;
  & .column-action-lnc {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }

  & > span {
    ${(props) => props.clickable && "cursor: pointer;"}
  }
`;

const KanbanHeader = React.memo(
  React.forwardRef(
    (
      {
        __TYPE__ = "KANBAN_HEADER",
        id,
        item,
        column,
        actionsMenu = false,
        actions = [],
        onDetails = () => {},
        color = "primary",
        size = "small",
        className = "",
        style = {},
        children,
        ...rest
      },
      ref
    ) => {
      const theme = useTheme();

      return (
        <StyledHeader
          ref={ref}
          theme={theme}
          className={className}
          style={style}
          clickable={onDetails ? true : false}
          {...rest}
        >
          <span onClick={(e) => onDetails(e, item, column)}>{children}</span>
          {actionsMenu && (
            <DropdownMenu
              className="column-action-lnc"
              horizontalAlignment="right"
              verticalAlignment="bottom"
              color={color}
              size={size}
              control={
                <Icon
                  color="neutral"
                  className="column-action-lnc"
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
                      onClick={(e) => {
                        action.onAction(e, item, column);
                      }}
                    >
                      {action.name}
                    </DropdownItem>
                  );
              })}
            </DropdownMenu>
          )}
        </StyledHeader>
      );
    }
  )
);

// // TODO : type
// KanbanHeader.defaultProps = {
//   __TYPE__: "KANBAN_HEADER",
//   actionsMenu: false,
//   actions: [],
//   //-------------------------
//   onDetails: (e, item, column) => {},
//   //-------------------------
//   style: {},
//   color: "primary",
//   size: "small",
// };

KanbanHeader.propTypes = {
  __TYPE__: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Show actions menu on Card
   */
  actionsMenu: PropTypes.bool,
  /**
   * type of: [{ name: `<string>`, show: `<bool>`, enable: `<bool>`, onAction: `<func>`, icon: `<string>`}]
   * show and enable are true by default
   */
  actions: PropTypes.array,
  //---------------------------------
  onDetails: PropTypes.func,
  //---------------------------------
  className: PropTypes.string,
  style: PropTypes.object,
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

export default KanbanHeader;

KanbanHeader.displayName = 'KANBAN_HEADER';