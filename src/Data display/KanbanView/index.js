import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import KanbanActionsToolbar from "./KanbanActionsToolbar";
import { getCustomRender, renderCustomElement } from "../../_utils/utils";
import Kanban from "../Kanban";
import KanbanCard from "../Kanban/components/KanbanCard";
import KanbanHeader from "../Kanban/components/KanbanHeader";
import KanbanFooter from "../Kanban/components/KanbanFooter";

const StyledView = styled.div`
  & .kanban-view-footer-lnc {
    padding: 0 0.625rem;
  }
  & .kanban-view-toolbar-lnc {
    margin: 0 0.625rem;
  }
`;

const KanbanView = React.forwardRef((props, ref) => {
  const {
    toolbarActions,
    kanbanProps,
    actionsToolbarProps,
    footerProps,
    showCreate,
    enableCreate,
    loading,

    customCardActions,
    customColumnActions,

    editCardText,
    enableEditCard,
    showEditCard,
    deleteCardText,
    enableDeleteCard,
    showDeleteCard,
    editColumnText,
    enableEditColumn,
    showEditColumn,
    deleteColumnText,
    enableDeleteColumn,
    showDeleteColumn,

    showAddNewCard,
    showLoadMoreCards,
    //----------------
    onCreate,
    onEditCard,
    onDeleteCard,
    onEditColumn,
    onDeleteColumn,
    onCardDetails,
    onColumnDetails,
    onAddNewCard,
    onLoadMoreCards,
    //------------------
    className,
    style,
    size,
    color,
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
        children
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
        children
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
        children
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

KanbanView.defaultProps = {
  kanbanProps: {},
  actionsToolbarProps: {},
  footerProps: {},
  loading: false,
  showCreate: true,
  enableCreate: true,
  toolbarActions: [],
  customCardActions: [],
  customColumnActions: [],
  editCardText: "Edit",
  enableEditCard: true,
  showEditCard: true,
  deleteCardText: "Delete",
  enableDeleteCard: true,
  showDeleteCard: true,

  editColumnText: "Edit",
  enableEditColumn: true,
  showEditColumn: true,
  deleteColumnText: "Delete",
  enableDeleteColumn: true,
  showDeleteColumn: true,

  showAddNewCard: false,
  showLoadMoreCards: false,
  //-----------------------
  onCreate: (e) => {},
  onEditCard: (e, item, columnId) => {},
  onDeleteCard: (e, item, columnId) => {},
  onEditColumn: (e, item, column) => {},
  onDeleteColumn: (e, item, column) => {},
  onCardDetails: (e, item, columnId) => {},
  onColumnDetails: (e, item, column) => {},
  onLoadMoreCards: (e, columnId) => {},
  onAddNewCard: (e, columnId) => {},
  //-----------------------
  style: {},
  size: "small",
  color: "primary",
};

KanbanView.propTypes = {
  kanbanProps: PropTypes.object,
  actionsToolbarProps: PropTypes.object,
  footerProps: PropTypes.object,
  loading: PropTypes.bool,
  showCreate: PropTypes.bool,
  /**
   * Enable create
   */
  enableCreate: PropTypes.bool,
  /**
   * Actions that will be shown in toolbar with existing actions
   * toolbarActions=[{name: `<string>`, show: `<bool>`, enable: `<bool>`, onAction: `<func>`, customAction: `<element>`}, ...]
   */
  toolbarActions: PropTypes.array,
  customCardActions: PropTypes.array,
  customColumnActions: PropTypes.array,
  editCardText: PropTypes.string,
  enableEditCard: PropTypes.bool,
  showEditCard: PropTypes.bool,
  deleteCardText: PropTypes.string,
  enableDeleteCard: PropTypes.bool,
  showDeleteCard: PropTypes.bool,
  editColumnText: PropTypes.string,
  enableEditColumn: PropTypes.bool,
  showEditColumn: PropTypes.bool,
  deleteColumnText: PropTypes.string,
  enableDeleteColumn: PropTypes.bool,
  showDeleteColumn: PropTypes.bool,
  /**
   * Show Add New Card in all Columns
   */
  showAddNewCard: PropTypes.bool,
  /**
   * Show Load More Cards in all Columns
   */
  showLoadMoreCards: PropTypes.bool,
  //-------------------------------------------------------------
  onCreate: PropTypes.func,
  onEditCard: PropTypes.func,
  onDeleteCard: PropTypes.func,
  onEditColumn: PropTypes.func,
  onDeleteColumn: PropTypes.func,
  onCardDetails: PropTypes.func,
  onColumnDetails: PropTypes.func,
  onLoadMoreCards: PropTypes.func,
  onAddNewCard: PropTypes.func,
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
