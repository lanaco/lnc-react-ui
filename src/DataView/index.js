import React, { useState } from "react";
import Modal from "../Modal/index";
import ConfirmationForm from "../ConfirmationForm/index";
import DropdownMenu from "../DropdownMenu/index";
import Button from "../Button/index.js";
import FormMode from "./Constants/FormMode";
import ViewType from "./Constants/ViewType";
import FormViewMovement from "./FormViewMovement";
import { freeze } from "../Helper/helper";
import styles from "./styles.module.css";
import TableView from "./TableView";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { default as LncPagination } from "../Pagination/index";
import Spinner from "../Spinner/index";
import theme from "../_utils/theme";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./animation.css";

const getBorderSyle = (borderStyle, read, theme, color) => {
  var css = "";
  var borderColor = "";

  if (borderStyle === "edit") borderColor = theme.palette.warning.main;

  if (borderStyle === "success") {
    borderColor = theme.palette.success.main;
  }

  if (borderStyle === "add") {
    borderColor = theme.palette[color].main;
  }

  if (read) {
    css += `
      &:hover {
        cursor: default;
      }

      & * {
        pointer-events: none;
      }
    `;
  }

  if (borderColor !== "") {
    css += `border-top: 4.5px solid ${borderColor};`;
  }

  return css;
};

const Container = styled.div`
  box-shadow: ${(props) => (props.shadow === false ? "0" : "0 0 12px #bebebe")};
  border-radius: 3px;
  padding: 0 4px;
`;

const TableContainer = styled.div`
  font-family: var(--font-base-ubuntu);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const PaginationContainer = styled.div`
  border-top: 1px solid #80808025;
`;

const FormContainer = styled.div`
  height: 100%;
  // overflow-y: auto;
  // max-height: calc(100vh - 120px);
  border-radius: 3px;

  ${(props) =>
    getBorderSyle(props.borderStyle, props.read, props.theme, props.color)}
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  padding: 4px 0;
  border-radius: 3px;
  font-size: 12px;
  font-family: "Ubuntu";
`;

const FlexItem = styled.div`
  padding-right: 6px;
  font-size: 1.4em;
  max-height: 40px;
`;

const LoaderContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  background-color: #eceaea;
  z-index: 10000000;
  opacity: 0.2;
  filter: alpha(opacity=20);
`;

const LoaderContainerTransparent = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 10000000;
`;

const Loader = styled.div`
  position: absolute;
  top: 48%;
  left: 47%;
`;

const DivRelative = styled.div`
  position: relative;
`;

const FilteringContainer = styled.div`
  width: 100%;
`;

const DataView = (props) => {
  const emptyFunc = () => {};
  const [deleteConfirmationBoxOpen, setDeleteConfirmationBoxOpen] = useState(
    false
  );
  //======== PROPS ========

  const { General, Options, Ordering, Pagination, Table, Form } =
    props.Config || {};

  const {
    Shadow = true,
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
    Localization = {},
    Export = () => {},
    Icons = {
      Checkbox: "lnc-checkbox",
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
      ArrowUp: "lnc-arrow-up",
      ArrowDown: "lnc-arrow-down",
      ArrowDownUp: "lnc-arrow-down-up",
    },
  } = props;

  const { Lookup = {}, theme, size, color } = props;

  const { OnAdd = emptyFunc, OnUpdate = emptyFunc, OnDelete = emptyFunc } =
    props.CRUD || {};

  const {
    CanGoToNextItem = false,
    CanGoToPreviousItem = false,
    CanGoToFirstItem = false,
    CanGoToLastItem = false,
  } = Form || {};

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

  let themeProps = { theme, size, color };

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
    IsLookup: General.IsLookup,
    LookupTakeItem: Lookup.LookupTakeItem ? Lookup.LookupTakeItem : () => {},
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
      Localization: Localization.Pagination,
    },
  };

  //======== METHODS ========

  const freezeLoading = (args = []) => {
    return freeze([General.IsLoading || FormMode === FormMode.READ, ...args]);
  };

  const getBorderStyleProp = () => {
    if (Form.Dirty && Form.Mode === FormMode.EDIT && Options.EnableEdit)
      return "edit";

    if (!Form.Dirty && Form.Mode === FormMode.EDIT && Options.EnableEdit)
      return "success";

    if (Form.Mode === FormMode.ADD) return "add";
  };

  //======== RENDER ========

  const renderContextMenu = () => {
    if (
      Options.EnableActions &&
      General.CurrentView === ViewType.TABLE_VIEW &&
      Table.Actions &&
      Table.Actions.length > 0
    ) {
      return (
        <FlexItem>
          <DropdownMenu
            disabled={freezeLoading([Table.SelectedData.length === 0])}
            items={Table.Actions || []}
            label={Localization.Actions}
            actionData={Table.SelectedData}
            downDoubleIconClassName={Icons.DownDouble}
          />
        </FlexItem>
      );
    } else return <></>;
  };

  const renderRefreshButton = () => {
    if (General.CurrentView !== ViewType.TABLE_VIEW || !General.DataFromBackend)
      return false;

    return (
      <FlexItem>
        <Button
          tooltip={Localization.Refresh}
          onClick={freezeLoading() ? () => {} : OnRefresh}
          icon={"sync-alt"}
          inverted={true}
        />
      </FlexItem>
    );
  };

  const renderDeleteSelectedButton = () => {
    if (
      Options.ReadOnly ||
      !Options.EnableDelete ||
      General.CurrentView === ViewType.FORM_VIEW
    )
      return false;

    let loading = freezeLoading([Table.SelectedData.length === 0]);

    return (
      <FlexItem>
        <Button
          onClick={
            loading ? () => {} : () => setDeleteConfirmationBoxOpen(true)
          }
          disabled={props.disabled || Table.SelectedData.length === 0}
          tooltip={Localization.DeleteSelected}
          icon={"trash"}
          inverted={true}
        />
      </FlexItem>
    );
  };

  const renderDeleteConfirmationBox = () => {
    if (!Options.EnableDelete || General.CurrentView === ViewType.FORM_VIEW)
      return <></>;

    return (
      <ConfirmationForm
        basic={true}
        open={deleteConfirmationBoxOpen}
        onClose={() => setDeleteConfirmationBoxOpen(false)}
        onDecline={() => setDeleteConfirmationBoxOpen(false)}
        onConfirm={OnDelete}
        localization={Localization}
        header={Localization ? Localization.AreYouSure : "Are you sure"}
        clickOutsideToClose={false}
      />
    );
  };

  const renderGoToAddButton = () => {
    if (Options.ReadOnly) return <></>;

    if (Options.EnableAdd && General.CurrentView !== ViewType.FORM_VIEW)
      return (
        <FlexItem>
          <Button
            tooltip={Localization.Add}
            onClick={freezeLoading() ? () => {} : GoToAdd}
            icon={"plus"}
            inverted={true}
            disabled={props.disabled}
          />
        </FlexItem>
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
          <Button
            tooltip={Localization.AddWithCopy}
            onClick={freezeLoading() ? () => {} : GoToAddWithCopy}
            icon={"clone"}
            inverted={true}
          />
        </div>
      );
    }
    return <></>;
  };

  const renderChangeToTableView = () => {
    if (!Options.EnableFormView || General.CurrentView !== ViewType.FORM_VIEW)
      return false;

    return (
      <FlexItem>
        <Button
          tooltip={Localization.ToTableView}
          onClick={freezeLoading() ? () => {} : ChangeToTableView}
          icon={"table"}
          inverted={true}
        />
      </FlexItem>
    );
  };

  const renderSwitchToEditModeButton = () => {
    if (
      Options.ReadOnly ||
      !Options.EnableSwitchReadOnlyMode ||
      !Options.EnableFormView ||
      General.CurrentView !== ViewType.FORM_VIEW
    )
      return false;

    return (
      <FlexItem>
        <Button
          tooltip={
            Form.Mode === FormMode.READ
              ? Localization.FormEditMode
              : Localization.FormReadMode
          }
          onClick={freezeLoading() ? () => {} : ChangeToEditMode}
          icon={Form.Mode === FormMode.READ ? "edit" : "eye"}
          inverted={true}
        />
      </FlexItem>
    );
  };

  const renderPagination = () => {
    if (!Options.EnablePagination || General.CurrentView !== "TableView")
      return <span></span>;

    return (
      <PaginationContainer>
        <LncPagination
          {...tableViewConfig.PaginationConfig}
          inverted={true}
          Export={Export}
        />
      </PaginationContainer>
    );
  };

  const renderSpinner = () => {
    if (!General.IsLoading) return <></>;

    return (
      <>
        <LoaderContainer></LoaderContainer>
        <LoaderContainerTransparent>
          <Loader>
            {Table.Data !== null && Table.Data.length > 2 ? <Spinner /> : <></>}
          </Loader>
        </LoaderContainerTransparent>
      </>
    );
  };

  const renderFiltering = () => {
    if (!Options.EnableFilters || General.CurrentView === ViewType.FORM_VIEW)
      return <></>;

    return <FilteringContainer>{FilteringView()}</FilteringContainer>;
  };

  const renderFormViewMovement = () => {
    if (
      !Options.EnableFormViewMovement ||
      Form.Mode === "ADD" ||
      General.CurrentView === "TableView"
    )
      return false;

    return (
      <FormViewMovement
        Config={formViewMovementConfig}
        Localization={Localization.FormViewMovement}
        Icons={Icons}
      />
    );
  };

  const renderHeader = () => {
    var x1 =
      Form === null || General.CurrentView === "TableView" ? false : true;

    var x2 =
      Options.ReadOnly ||
      !Options.EnableDelete ||
      General.CurrentView === "FormView" ||
      General.IsLookup ||
      OnDelete === null
        ? false
        : true;

    var x3 =
      Options.ReadOnly || General.IsLookup || Form === null ? false : true;

    var x4 =
      Options.EnableFormViewMovement &&
      Form !== null &&
      General.CurrentView === "FormView" &&
      Form.Mode !== "ADD"
        ? true
        : false;

    var x5 =
      Options.ReadOnly ||
      !Options.EnableSwitchReadOnlyMode ||
      Form === null ||
      Form === undefined ||
      General.CurrentView !== "FormView"
        ? false
        : true;

    var x6 = General.CurrentView !== "TableView" ? false : true;

    var x7 =
      General.IsLookup && Table.SelectionType === "multiple" ? true : false;

    var x8 =
      Options.EnableActions &&
      General.CurrentView === ViewType.TABLE_VIEW &&
      Table.Actions &&
      Table.Actions.length > 0;

    if (x1 || x2 || x3 || x4 || x5 || x6 || x7 || x8)
      return (
        <HeaderContainer>
          {renderChangeToTableView()}
          {renderDeleteSelectedButton()}
          {renderGoToAddButton()}
          {renderFormViewMovement()}
          {renderSwitchToEditModeButton()}
          {renderRefreshButton()}
          {renderContextMenu()}
          {/* {renderAddWithCopyButton()} */}
        </HeaderContainer>
      );

    return <></>;
  };

  const renderTable = () => {
    return (
      !(General.CurrentView !== "TableView" && General.DataFromBackend) && (
        <DivRelative>
          {renderSpinner()}
          <TableView
            Config={tableViewConfig}
            Localization={Localization.TableView}
            Export={Export}
            Icons={Icons}
            accentColor={props.accentColor}
            disabled={props.disabled}
          />
        </DivRelative>
      )
    );
  };

  const renderForm = () => {
    var renderForm =
      General.CurrentView === "FormView" && Form !== null && Form !== undefined;

    var component = renderForm && (
      <FormContainer
        borderStyle={getBorderStyleProp()}
        read={Form.Mode === FormMode.READ}
        {...themeProps}
      >
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
      </FormContainer>
    );

    if (General.DataFromBackend) {
      return component;
    }

    if (renderForm && !General.DataFromBackend) {
      return (
        <Modal
          id={"FormViewInModal"}
          basic={true}
          open={true}
          size={"medium"}
          header={props.modalLabel || ""}
          onClose={ChangeToTableView}
        >
          {component}
        </Modal>
      );
    }

    return <></>;
  };

  const renderComponent = () => {
    let key = General.CurrentView !== "TableView" && General.DataFromBackend;

    return (
      <Container {...themeProps} shadow={Shadow}>
        {renderFiltering()}
        {renderHeader()}

        <SwitchTransition mode="out-in">
          <CSSTransition
            key={key}
            addEndListener={(node, done) => {
              node.addEventListener("transitionend", done, false);
            }}
            classNames="fade1"
          >
            <TableContainer {...themeProps}>
              {renderTable()}
              {renderForm()}
              {renderDeleteConfirmationBox()}
            </TableContainer>
          </CSSTransition>
        </SwitchTransition>

        <SwitchTransition mode="out-in">
          <CSSTransition
            key={
              Options.EnablePagination && General.CurrentView !== "TableView"
            }
            addEndListener={(node, done) => {
              node.addEventListener("transitionend", done, false);
            }}
            classNames="fade2"
          >
            {renderPagination()}
          </CSSTransition>
        </SwitchTransition>
      </Container>
    );
  };

  return renderComponent();
};

DataView.defaultProps = {
  theme: theme,
  size: "small",
  color: "primary",
};

DataView.propTypes = {
  theme: PropTypes.object.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
};

export default DataView;
