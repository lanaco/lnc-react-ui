import React, { useEffect, useState } from "react";
import ComponentBox from "../ComponentBox/index";
import ConfirmationForm from "../ConfirmationForm/index";
import DropdownMenu from "../DropdownMenu/index";
import Button from "../Button/index.js";
import FormMode from "./Constants/FormMode";
import ViewType from "./Constants/ViewType";
import FormViewMovement from "./FormViewMovement";
import { freeze, mergeCSS } from "../Helper/helper";
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
        cursor: not-allowed;
      }

      & * {
        pointer-events: none;
        opacity: 1;
      }
    `;
  }

  css += `
      border-top: 4.5px solid ${borderColor};
      padding-top: 10px;
    `;

  return css;
};

const Container = styled.div`
  box-shadow: 0 0 12px #bebebe;
  border-radius: 3px;
  padding: 4px;
`;

const TableContainer = styled.div`
  font-family: var(--font-base-ubuntu);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const PaginationContainer = styled.div`
  margin-top: 6px;
`;

const FormContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  max-height: calc(100vh - 120px);
  border: 1.5px solid rgba(165, 164, 164, 0.4);
  border-radius: 3px;
  padding: 4px;

  ${(props) =>
    getBorderSyle(props.borderStyle, props.read, props.theme, props.color)}
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin-bottom: 5px;

  border: 1.5px solid rgba(165, 164, 164, 0.4);
  border-radius: 3px;
  padding: 4px;
  font-size: 12px;
  font-family: "Ubuntu";
`;

const FlexItem = styled.div`
  padding-left: 3px;
  padding-right: 4px;
  font-size: 1.4em;
  max-height: 40px;
`;

const DeveloperMessageContainer = styled.div`
  margin-top: 5px;
  padding: 8px;
  border: 2px solid rgba(255, 0, 0, 0.725);
  background-color: rgba(252, 79, 79, 0.104);
  font-size: 11px;
`;

const DeveloperMessage = styled.div`
  color: rgb(180, 3, 3);
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

  const getBorderStyleProp = () => {
    if (Form.Dirty && Form.Mode === FormMode.EDIT && Options.EnableEdit)
      return "edit";

    if (!Form.Dirty && Form.Mode === FormMode.EDIT && Options.EnableEdit)
      return "success";

    if (Form.Mode === FormMode.ADD) return "add";
  };

  //======== RENDER ========

  const renderLookupTakeValues = () => {
    if (General.IsLookup) {
      let loading = freezeLoading([Table.SelectedData.length === 0]);

      return (
        <FlexItem>
          <Button
            tooltip={Localization.TakeValues}
            onClick={() => {
              if (!loading) {
                Lookup.TakeValues(Table.SelectedData);
                if (ClearSelectedData) ClearSelectedData();
              }
            }}
            disabled={Table.SelectedData.length === 0}
            icon={"plus"}
          />
        </FlexItem>
      );
    }

    return false;
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
      return false;

    return (
      <FlexItem>
        <Button
          tooltip={Localization.Refresh}
          onClick={freezeLoading() ? () => {} : OnRefresh}
          // disabled={freezeLoading()}
          icon={"sync-alt"}
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
          disabled={Table.SelectedData.length === 0}
          tooltip={Localization.DeleteSelected}
          icon={"trash"}
        />
      </FlexItem>
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
        <FlexItem>
          <Button
            tooltip={Localization.Add}
            onClick={freezeLoading() ? () => {} : GoToAdd}
            // disabled={freezeLoading()}
            icon={"plus"}
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
            // disabled={freezeLoading()}
            icon={"clone"}
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
          // disabled={freezeLoading()}
          icon={"table"}
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
          // disabled={freezeLoading()}
          icon={Form.Mode === FormMode.READ ? "edit" : "eye"}
        />
      </FlexItem>
    );
  };

  const renderPagination = () => {
    if (!Options.EnablePagination || General.CurrentView !== "TableView")
      return <span></span>;

    return (
      <PaginationContainer>
        <LncPagination {...tableViewConfig.PaginationConfig} Export={Export} />
      </PaginationContainer>
    );
  };

  const renderSpinner = () => {
    if (!General.IsLoading) return <></>;

    return (
      <>
        <LoaderContainer></LoaderContainer>
        <LoaderContainerTransparent>
          <Loader>{Table.Data.length > 2 ? <Spinner /> : <></>}</Loader>
        </LoaderContainerTransparent>
      </>
    );
  };

  const renderFromViewMovement = () => {
    if (!Options.EnableFormViewMovement || Form.Mode === "ADD") return false;

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
      General.IsLookup && Table.SelectionType === TableSelectionType.MULTIPLE
        ? true
        : false;

    if (x1 || x2 || x3 || x4 || x5 || x6 || x7)
      return (
        <HeaderContainer>
          {renderChangeToTableView()}
          {renderDeleteSelectedButton()}
          {renderGoToAddButton()}
          {renderFormViewMovement()}
          {renderSwitchToEditModeButton()}
          {renderRefreshButton()}
          {renderLookupTakeValues()}
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
          />
        </DivRelative>
      )
    );
  };

  const renderForm = () => {
    // if (
    //   General.CurrentView !== "FormView" ||
    //   Form === null ||
    //   Form === undefined
    // )
    //   return <></>;

    var component = !(
      General.CurrentView !== "FormView" ||
      Form === null ||
      Form === undefined
    ) && (
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

    if (!General.DataFromBackend) {
      return (
        <ComponentBox
          id={"FormViewInModal"}
          open={true}
          size={"medium"}
          title={""}
          handleDialogClose={() => {}}
        >
          {component}
        </ComponentBox>
      );
    }
  };

  const renderComponent = () => {
    let key = General.CurrentView !== "TableView" && General.DataFromBackend;

    return (
      <Container {...themeProps}>
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

              {/* {renderDeleteConfirmationBox()}
              {renderDeveloperMessages()} */}
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
      // <div>
      //   <div className={styles.flexContainer}>
      //     <div className={styles.flexInnerContainer}>
      //       {renderChangeToTableView()}
      //       {renderSwitchToEditModeButton()}
      //       {renderGoToAddButton()}
      //       {renderDeleteSelectedButton()}
      //       {renderDeleteConfirmationBox()}
      //       {renderAddWithCopyButton()}
      //       {renderLookupTakeValues()}
      //       {renderRefreshButton()}
      //       {renderContextMenu()}
      //     </div>
      //     <div className={styles.filterContainerHolder}>
      //       {renderFiltering()}
      //     </div>
      //   </div>
      //   <div className={mergeCSS([styles.view])}>{renderView()}</div>
      // </div>
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
