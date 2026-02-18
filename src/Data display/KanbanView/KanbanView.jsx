/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import styled from "@emotion/styled";
import KanbanActionsToolbar from "./KanbanActionsToolbar";
import { getCustomRender, renderCustomElement } from "../../_utils/utils";
import Kanban from "../Kanban/Kanban";
import KanbanCard from "../Kanban/components/KanbanCard/KanbanCard";
import KanbanHeader from "../Kanban/components/KanbanHeader/KanbanHeader";
import KanbanFooter from "../Kanban/components/KanbanFooter/KanbanFooter";

const StyledView = styled.div`
  & .kanban-view-footer-lnc {
    padding: 0 0.625rem;
  }
  & .kanban-view-toolbar-lnc {
    margin: 0 0.625rem;
  }
`;

const KanbanView = forwardRef((props, ref) => {
  const {
    toolbarActions = [],
    kanbanProps = {},
    actionsToolbarProps = {},
    footerProps = {},
    showCreate = true,
    enableCreate = true,

    customCardActions = [],
    customColumnActions = [],

    editCardText = "Edit",
    enableEditCard = true,
    showEditCard = true,
    deleteCardText = "Delete",
    enableDeleteCard = true,
    showDeleteCard = true,
    editColumnText = "Edit",
    enableEditColumn = true,
    showEditColumn = true,
    deleteColumnText = "Delete",
    enableDeleteColumn = true,
    showDeleteColumn = true,

    showAddNewCard = false,
    showLoadMoreCards = false,
    //----------------
    onCreate = () => {},
    onEditCard = () => {},
    onDeleteCard = () => {},
    onEditColumn = () => {},
    onDeleteColumn = () => {},
    onCardDetails = () => {},
    onColumnDetails = () => {},
    onAddNewCard = () => {},
    onLoadMoreCards = () => {},
    //------------------
    className = "",
    style = {},
    size = "small",
    color = "primary",
    children,
    ...rest
  } = props;

  const toolbarProps = {
    ...actionsToolbarProps,
    showCreate,
    enableCreate,
    onCreate,
    actions: toolbarActions,
  };

  const handleCreate = (e) => {
    onCreate(e);
  };

  const renderToolbar = () => {
    return (
      renderCustomElement(
        getCustomRender("KANBAN_VIEW_ACTIONS_TOOLBAR", children),
        {
          ...toolbarProps,
          size: toolbarProps?.size ? toolbarProps.size : size,
          color: toolbarProps?.color ? toolbarProps.color : color,
          className: "kanban-view-toolbar-lnc " + toolbarProps?.className,
        },
        children,
      ) || (
        <KanbanActionsToolbar
          {...toolbarProps}
          className={"kanban-view-toolbar-lnc " + toolbarProps?.className}
          size={toolbarProps?.size ? toolbarProps.size : size}
          color={toolbarProps?.color ? toolbarProps.color : color}
          onCreate={handleCreate}
        />
      )
    );
  };

  const renderKanban = () => {
    return (
      renderCustomElement(
        getCustomRender("KANBAN", children),
        {
          ...kanbanProps,
          size: kanbanProps?.size ? kanbanProps.size : size,
          color: kanbanProps?.color ? kanbanProps.color : color,
          className: kanbanProps?.className,
        },
        children,
      ) || (
        <Kanban
          size={kanbanProps?.size ? kanbanProps.size : size}
          color={kanbanProps?.color ? kanbanProps.color : color}
          {...kanbanProps}
        >
          <KanbanHeader
            onDetails={onColumnDetails}
            actionsMenu={true}
            actions={[
              {
                name: editColumnText,
                enable: enableEditColumn,
                show: showEditColumn,
                onAction: onEditColumn,
                icon: "pen",
              },
              {
                name: deleteColumnText,
                enable: enableDeleteColumn,
                show: showDeleteColumn,
                onAction: onDeleteColumn,
                icon: "trash",
              },
              ...customColumnActions,
            ]}
          ></KanbanHeader>
          <KanbanCard
            onDetails={onCardDetails}
            actionsMenu={true}
            actions={[
              {
                name: editCardText,
                enable: enableEditCard,
                show: showEditCard,
                onAction: onEditCard,
                icon: "pen",
              },
              {
                name: deleteCardText,
                enable: enableDeleteCard,
                show: showDeleteCard,
                onAction: onDeleteCard,
                icon: "trash",
              },
              ...customCardActions,
            ]}
          ></KanbanCard>
          {children}
          <KanbanFooter
            showAddNewCard={showAddNewCard}
            showLoadMoreCards={showLoadMoreCards}
            onAddNewCard={onAddNewCard}
            onLoadMoreCards={onLoadMoreCards}
          ></KanbanFooter>
        </Kanban>
      )
    );
  };

  const renderFooter = () => {
    return (
      renderCustomElement(
        getCustomRender("KANBAN_VIEW_FOOTER", children),
        {
          ...footerProps,
          size: footerProps?.size ? footerProps.size : size,
          color: footerProps?.color ? footerProps.color : color,
          className: "kanban-view-footer-lnc " + footerProps?.className,
        },
        children,
      ) || null
    );
  };

  return (
    <StyledView ref={ref} className={className} style={style} {...rest}>
      {renderToolbar()}
      {renderKanban()}
      {renderFooter()}
    </StyledView>
  );
});

// TODO : type
// KanbanView.defaultProps = {
//   __TYPE__: "KANBAN_VIEW",
//   kanbanProps: {},
//   actionsToolbarProps: {},
//   footerProps: {},
//   loading: false,
//   showCreate: true,
//   enableCreate: true,
//   toolbarActions: [],
//   customCardActions: [],
//   customColumnActions: [],
//   editCardText: "Edit",
//   enableEditCard: true,
//   showEditCard: true,
//   deleteCardText: "Delete",
//   enableDeleteCard: true,
//   showDeleteCard: true,

//   editColumnText: "Edit",
//   enableEditColumn: true,
//   showEditColumn: true,
//   deleteColumnText: "Delete",
//   enableDeleteColumn: true,
//   showDeleteColumn: true,

//   showAddNewCard: false,
//   showLoadMoreCards: false,
//   //-----------------------
//   onCreate: (e) => {},
//   onEditCard: (e, item, columnId) => {},
//   onDeleteCard: (e, item, columnId) => {},
//   onEditColumn: (e, item, column) => {},
//   onDeleteColumn: (e, item, column) => {},
//   onCardDetails: (e, item, columnId) => {},
//   onColumnDetails: (e, item, column) => {},
//   onLoadMoreCards: (e, columnId) => {},
//   onAddNewCard: (e, columnId) => {},
//   //-----------------------
//   style: {},
//   size: "small",
//   color: "primary",
// };

export default KanbanView;

KanbanView.displayName = "KanbanView";
