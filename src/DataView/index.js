import React, { useEffect, useState } from "react";
import ComponentBox from "../ComponentBox/index";
import ConfirmationForm from "../ConfirmationForm/index";
import DropdownMenu from "../DropdownMenu/index";
import IconButton from "../IconButton/index.js";
import FormMode from "./Constants/FormMode";
import ViewType from "./Constants/ViewType";
import FormViewMovement from "./FormViewMovement";
import { freeze, mergeCSS } from "./Helper/Helper";
import styles from "./styles.module.css";
import TableView from "./TableView";

const DataView = (props) => {
  const emptyFunc = () => {};
  const [deleteConfirmationBoxOpen, setDeleteConfirmationBoxOpen] = useState(
    false
  );
  //======== PROPS ========

  const { General, Options, Ordering, Pagination, Table, Form } =
    props.Config || {};

  const {
    ChangeToFormView = emptyFunc,
    ChangeToTableView = emptyFunc,
    ChangeToEditMode = emptyFunc,
    OnPageSizeChanged = emptyFunc,
    OnFieldChange = emptyFunc,
    OnSelection = emptyFunc,
    OnSelectAll = emptyFunc,
    FormView = emptyFunc,
    FilteringView = () => <></>,
    OnHeaderClick = emptyFunc,
    OnRefresh = emptyFunc,
    GoToAdd = emptyFunc,
    GoToAddWithCopy = emptyFunc,
    DiscardEdited = emptyFunc,
    SetSelectedData = emptyFunc,
    ClearSelectedData = emptyFunc,
    Localization = {},
    Export = () => {},
    Icons = {
      DownDouble: "lnc-down-double",
      Refresh: "lnc-refresh",
      Trash: "lnc-trash",
      CloseX: "lnc-x",
      Plus: "lnc-plus",
      Repeat: "lnc-repeat",
      Clone: "lnc-clone",
      Table: "lnc-table",
      RightDouble: "lnc-right-double",
      Right: "lnc-right",
      LeftDouble: "lnc-left-double",
      Left: "lnc-left",
      Save: "lnc-save",
      Edit: "lnc-edit",
      Eye: "lnc-eye",
      FileExcel: "lnc-file-excel",
    },
  } = props;

  const { Lookup = {} } = props;

  const { OnAdd = emptyFunc, OnUpdate = emptyFunc, OnDelete = emptyFunc } =
    props.CRUD || {};

  const {
    CanGoToNextItem = false,
    CanGoToPreviousItem = false,
    CanGoToFirstItem = false,
    CanGoToLastItem = false,
  } = props.Config.Form || {};

  const {
    goToNextItem = emptyFunc,
    goToPreviousItem = emptyFunc,
    goToFirstItem = emptyFunc,
    goToLastItem = emptyFunc,
  } = props.FormViewMovementActions || {};

  const {
    goToNextPage = emptyFunc,
    goToPreviousPage = emptyFunc,
    goToFirstPage = emptyFunc,
    goToLastPage = emptyFunc,
  } = props.TableViewMovementActions || {};

  //======== LOOKUP ========

  useEffect(() => {
    if (General.IsLookup) SetSelectedData(Lookup.SelectedData);
  }, [Lookup.SelectedData]);

  useEffect(() => {
    return function cleanup() {
      if (General.IsLookup) ClearSelectedData();
    };
  }, []);

  //======== CONFIGS ========

  const formViewMovementConfig = {
    Dirty: Form.Dirty,
    IsLoading: General.IsLoading || false,
    CanGoToNextItem: CanGoToNextItem || false,
    CanGoToPreviousItem: CanGoToPreviousItem || false,
    CanGoToFirstItem: CanGoToFirstItem || false,
    CanGoToLastItem: CanGoToLastItem || false,
    goToNextItem,
    goToPreviousItem,
    goToFirstItem,
    goToLastItem,
    FormMode: Form.Mode,
  };

  const tableViewConfig = {
    Columns: Table.Columns,
    Data: Table.Data,
    IsLoading: General.IsLoading,
    SelectedEntirePage: Table.SelectedEntirePage,
    EnablePagination: Options.EnablePagination || false,
    EnableSelection: Options.EnableSelection || false,
    EnableFormView: Options.EnableFormView || false,
    EnableSwitchReadOnlyMode: Options.EnableSwitchReadOnlyMode || true,
    ReadOnly: Options.ReadOnly || false,
    SelectionType: Table.SelectionType,
    OnSelection: OnSelection,
    OnSelectAll: OnSelectAll,
    SelectionIndicator: Table.SelectionIndicator || "id",
    SelectedData: Table.SelectedData,
    ChangeToFormView: ChangeToFormView,
    //---------------------------
    EnableOrdering: Options.EnableOrdering,
    Column: Ordering.Column,
    Accessor: Ordering.Accessor,
    Ascending: Ordering.Ascending,
    Descending: Ordering.Descending,
    OnHeaderClick: OnHeaderClick,
    //---------------------------
    PaginationConfig: {
      ...Pagination,
      IsLoading: General.IsLoading,
      OnPageSizeChanged,
      goToNextPage,
      goToPreviousPage,
      goToFirstPage,
      goToLastPage,
      EnableExports: Options.EnableExports,
    },
  };

  //======== METHODS ========

  const freezeLoading = (args = []) => {
    return freeze([General.IsLoading || FormMode === FormMode.READ, ...args]);
  };

  //======== RENDER ========

  const renderLookupTakeValues = () => {
    if (General.IsLookup) {
      return (
        <div className={styles.flexItem}>
          <IconButton
            tooltipText={Localization.TakeValues}
            onClick={() => {
              Lookup.TakeValues(Table.SelectedData);
              if (ClearSelectedData) ClearSelectedData();
            }}
            disabled={freezeLoading([Table.SelectedData.length === 0])}
            iconClassName={"lnc-plus"}
          ></IconButton>
        </div>
      );
    }

    return <></>;
  };

  const renderContextMenu = () => {
    if (
      Options.EnableActions &&
      General.CurrentView === ViewType.TABLE_VIEW &&
      Table.Actions &&
      Table.Actions.length > 0
    ) {
      return (
        <div className={[styles.flexItem, styles.contextMenu].join(" ")}>
          <DropdownMenu
            disabled={freezeLoading([Table.SelectedData.length === 0])}
            items={Table.Actions || []}
            label={Localization.Actions}
            actionData={Table.SelectedData}
            downDoubleIconClassName={Icons.DownDouble}
          />
        </div>
      );
    } else return <></>;
  };

  const renderRefreshButton = () => {
    if (General.CurrentView !== ViewType.TABLE_VIEW || !General.DataFromBackend)
      return <></>;

    return (
      <div className={styles.flexItem}>
        <IconButton
          tooltipText={Localization.Refresh}
          onClick={OnRefresh}
          disabled={freezeLoading()}
          iconClassName={Icons.Refresh}
        ></IconButton>
      </div>
    );
  };

  const renderDeleteSelectedButton = () => {
    if (
      Options.ReadOnly ||
      !Options.EnableDelete ||
      General.CurrentView === ViewType.FORM_VIEW
    )
      return <></>;

    return (
      <div className={styles.flexItem}>
        <IconButton
          onClick={() => setDeleteConfirmationBoxOpen(true)}
          disabled={freezeLoading([Table.SelectedData.length === 0])}
          tooltipText={Localization.DeleteSelected}
          iconClassName={Icons.Trash}
        ></IconButton>
      </div>
    );
  };

  const renderDeleteConfirmationBox = () => {
    if (!Options.EnableDelete || General.CurrentView === ViewType.FORM_VIEW)
      return <></>;

    return (
      <ComponentBox
        basic={true}
        id={"AreYouSure?"}
        open={deleteConfirmationBoxOpen}
        size={"small"}
        handleDialogClose={() => setDeleteConfirmationBoxOpen(false)}
        closeIconClassName={Icons.CloseX}
      >
        <ConfirmationForm
          handleDialogClose={() => setDeleteConfirmationBoxOpen(false)}
          refuseFunction={() => setDeleteConfirmationBoxOpen(false)}
          approveFunction={OnDelete}
          closeIconClassName={Icons.CloseX}
          textYes={Localization ? Localization.Yes : "Yes"}
          textNo={Localization ? Localization.No : "No"}
          title={Localization ? Localization.AreYouSure : "Are you sure"}
          accentColor={props.accentColor}
        ></ConfirmationForm>
      </ComponentBox>
    );
  };

  const renderGoToAddButton = () => {
    if (Options.ReadOnly) return <></>;
    if (Options.EnableAdd && General.CurrentView !== ViewType.FORM_VIEW)
      return (
        <div className={styles.flexItem}>
          <IconButton
            tooltipText={Localization.Add}
            onClick={GoToAdd}
            disabled={freezeLoading()}
            iconClassName={Icons.Plus}
          ></IconButton>
        </div>
      );

    return null;
  };

  const renderAddWithCopyButton = () => {
    if (
      Options.EnableAdd &&
      General.CurrentView === ViewType.FORM_VIEW &&
      Form.Mode === "EDIT"
    ) {
      return (
        <div className={styles.flexItem}>
          <IconButton
            tooltipText={Localization.AddWithCopy}
            onClick={GoToAddWithCopy}
            disabled={freezeLoading()}
            iconClassName={Icons.Clone}
          ></IconButton>
        </div>
      );
    }
    return <></>;
  };

  const renderChangeToTableView = () => {
    if (!Options.EnableFormView || General.CurrentView !== ViewType.FORM_VIEW)
      return <></>;

    return (
      <div className={styles.flexItem}>
        <IconButton
          tooltipText={Localization.ToTableView}
          onClick={ChangeToTableView}
          disabled={freezeLoading()}
          iconClassName={Icons.Table}
        ></IconButton>
      </div>
    );
  };

  const renderSwitchToEditModeButton = () => {
    if (
      Options.ReadOnly ||
      !Options.EnableSwitchReadOnlyMode ||
      !Options.EnableFormView ||
      General.CurrentView !== ViewType.FORM_VIEW
    )
      return <></>;

    return (
      <div className={styles.flexItem}>
        <IconButton
          tooltipText={
            Form.Mode === FormMode.READ
              ? Localization.FormEditMode
              : Localization.FormReadMode
          }
          onClick={ChangeToEditMode}
          disabled={freezeLoading()}
          iconClassName={Form.Mode === FormMode.READ ? Icons.Edit : Icons.Eye}
        ></IconButton>
      </div>
    );
  };

  const renderFromViewMovement = () => {
    if (!Options.EnableFormViewMovement || Form.Mode === "ADD") return <></>;

    return (
      <FormViewMovement
        Config={formViewMovementConfig}
        Localization={Localization.FormViewMovement}
        Icons={Icons}
      />
    );
  };

  const renderFiltering = () => {
    if (!Options.EnableFilters || General.CurrentView === ViewType.FORM_VIEW)
      return <></>;

    return FilteringView();
  };

  const getBorderClass = () => {
    let className = " ";

    if (Form.Mode === FormMode.READ) className = " " + styles.successBorder;

    if (Form.Dirty && Form.Mode !== FormMode.ADD && Options.EnableEdit)
      className = " " + styles.editedBorder;

    if (!Form.Dirty && Form.Mode !== FormMode.ADD && Options.EnableEdit)
      className = " " + styles.successBorder;

    if (Form.Mode === FormMode.READ) {
      className += " " + styles.disabledChildren;
    }

    return className;
  };

  const renderFormView = () => {
    if (!Options.EnableFormView) return <></>;

    let component = (
      <div className={getBorderClass()}>
        {FormView({
          IsLoading: General.IsLoading,
          Data: Form.Data,
          OnFieldChange: OnFieldChange,
          EnableEdit: Options.EnableEdit,
          EnableAdd: Options.EnableAdd,
          FormMode: Form.Mode,
          OnAdd: Options.EnableAdd ? OnAdd : emptyFunc,
          OnUpdate: Options.EnableEdit ? OnUpdate : emptyFunc,
          Dirty: Form.Dirty,
          DiscardEdited: Options.EnableEdit ? DiscardEdited : emptyFunc,
        })}
      </div>
    );

    if (General.DataFromBackend)
      return (
        <div>
          {renderFromViewMovement()}
          {component}
        </div>
      );

    if (!General.DataFromBackend)
      return (
        <ComponentBox
          basic={true}
          id={"FormViewInModal"}
          open={true}
          size={"medium"}
          title={props.modalLabel || ""}
          handleDialogClose={ChangeToTableView}
          closeIconClassName={Icons.CloseX}
        >
          {component}
        </ComponentBox>
      );
  };

  const renderView = () => {
    if (General.CurrentView === "TableView")
      return (
        <TableView
          Config={tableViewConfig}
          Localization={Localization.TableView}
          Export={Export}
          Icons={Icons}
          accentColor={props.accentColor}
        />
      );

    if (General.DataFromBackend && General.CurrentView === "FormView")
      return <div>{renderFormView()}</div>;

    if (!General.DataFromBackend && General.CurrentView === "FormView")
      return (
        <>
          <TableView Config={tableViewConfig} Icons={Icons} />
          {renderFormView()}
        </>
      );
  };

  const renderComponent = () => {
    return (
      <div>
        <div className={styles.flexContainer}>
          <div className={styles.flexInnerContainer}>
            {renderChangeToTableView()}
            {renderSwitchToEditModeButton()}
            {renderGoToAddButton()}
            {renderDeleteSelectedButton()}
            {renderDeleteConfirmationBox()}
            {renderAddWithCopyButton()}
            {renderLookupTakeValues()}
            {renderRefreshButton()}
            {renderContextMenu()}
          </div>
          <div className={styles.filterContainerHolder}>
            {renderFiltering()}
          </div>
        </div>
        <div className={mergeCSS([styles.view])}>{renderView()}</div>
      </div>
    );
  };

  return renderComponent();
};

export default DataView;
