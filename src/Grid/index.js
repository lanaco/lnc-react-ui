import React, { useState, useEffect } from "react";
import FormMovement from "./FormMovement";
import TableSelectionType from "../DataView/Constants/TableSelectionType";
import Table from "./Table";
import Button from "../Button/index";
import { default as TablePagination } from "../Pagination/index";
import { useImmer } from "use-immer";
import { v4 as uuidv4 } from "uuid";
import FormMode from "../DataView/Constants/FormMode";
import { freeze } from "../Helper/helper";
import Modal from "../Modal/index";
import ConfirmationForm from "../ConfirmationForm/index";
import Spinner from "../Spinner/index";

import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../_utils/theme";

const getDefaultState = () => {
  return {
    General: {
      IsLoading: true,
      CurrentView: "TableView",
      IsLookup: false, // Stamp specific
      DataFromBackend: true,
      InitialSetupCompleted: false,
      MapData: {},
      Redirect: false,
      DeleteConfirmationBox: false,
    },
    Options: {
      EnableFormViewMovement: false,
      EnableActions: false,
      EnablePagination: false,
      EnableSelection: false,
      EnableDelete: false,
      EnableEdit: false,
      EnableAdd: false,
      EnableExports: false, // Later...
      EnableFilters: false, // Stamp specific
      EnableOrdering: false,
      EnableSwitchReadOnlyMode: true,
      ReadOnly: false,
    },
    Filtering: {
      Filters: [], // Stamp specific
      FilterProps: [], // Stamp specific
    },
    Ordering: {
      DefaultAccessor: "",
      Column: "",
      Accessor: "",
      Ascending: false,
      Descending: false,
    },
    Pagination: {
      PageSizes: [1, 10, 20, 30, 40, 50],
      PageSize: 10,
      CurrentPage: 1,
      PageCount: 1,
      DataCount: 0,
      LoadedDataCount: 0,
      CanGoToNextPage: false,
      CanGoToPreviousPage: false,
      CanGoToFirstPage: false,
      CanGoToLastPage: false,
    },
    Table: {
      Data: [],
      SelectedData: [],
      SelectedDataIndexes: [],
      SelectionIndicator: "id",
      SelectedEntirePage: false,
      SelectionType: TableSelectionType.MULTIPLE,
      Columns: [],
      Actions: [],
      FooterText: "",
      HeaderText: "",
    },
    Form: {
      Mode: "READ",
      Data: {},
      ItemIndex: null,
      DataItemTemplate: {},
      Dirty: false,
      Deleted: false,
      Added: false,
      Edited: false,
      CanGoToNextItem: true,
      CanGoToPreviousItem: true,
      CanGoToFirstItem: true,
      CanGoToLastItem: true,
    },
  };
};

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
  borderradius: 3px;
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
  border-top: 1px solid #80808025;
  display: flex;
`;

const ItemFooterText = styled.div`
  padding: 10px;
  display: flex;
  align-items: right;
  margin-left: auto;
  font-size: ${(props) => props.theme.typography.small.fontSize};
  font-family: ${(props) => props.theme.typography.fontFamily};
`;

const ItemHeaderText = styled.div`
  max-height: 40px;
  padding-left: 3px;
  padding-right: 4px;
  display: flex;
  align-items: left;
  font-size: ${(props) => props.theme.typography.small.fontSize};
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-weight: bold;
`;

const FormContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  max-height: calc(100vh - 120px);
  ${(props) =>
    getBorderSyle(props.borderStyle, props.read, props.theme, props.color)}
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin-bottom: 5px;
  border-radius: 3px;
  padding: 0px;
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

const Grid = React.forwardRef((props, ref) => {
  //====================== PROPS ======================================================

  const {
    theme,
    size,
    color,
    Columns = [],
    Data = [],
    Config = {},
    Form = null,
    Pagination = {},
    Load = null,
    Localization = {},
    SelectedData = {},
    OnChange = null,
    Developer = false,
  } = props;

  const {
    Added,
    Edited,
    Deleted,
    OnEdit = null,
    OnAdd = null,
    OnDelete = null,
    ClearCrudIndicators = () => {},
  } = props.Crud || {};

  const {
    BeforeOrder = () => true,
    AfterOrder = () => {},
    //-----------------------------------
    BeforePageChange = () => true,
    AfterPageChanged = () => {},
    //-----------------------------------
    BeforePageSizeChange = () => true,
    AfterPageSizeChanged = () => {},
    //-----------------------------------
    BeforeDiscard = () => true,
    AfterDiscard = () => {},
    //-----------------------------------
    FormDataAfterAdd = () => null,
    FormDataAfterEdit = () => null,
    GoToAddFormData = () => null,
    SwitchToTableViewAfterAdd = () => true,
    SwitchToTableViewAfterEdit = () => false,
  } = props.Hooks || {};

  let themeProps = { theme, size, color };

  //====================== STATE ======================================================

  const [noBackendData, setNoBackendData] = useState([]);

  const [itemChanged, setItemChanged] = useState(false);

  const [errors, setErrors] = useState([]);

  const [state, setState] = useImmer({
    General: {
      IsLoading: true,
      CurrentView: "TableView",
      IsLookup: false, // Stamp specific
      DataFromBackend: true,
      InitialSetupCompleted: false,
      MapData: {},
      Redirect: false,
      DeleteConfirmationBox: false,
    },
    Options: {
      EnableFormViewMovement: false,
      EnableActions: false,
      EnablePagination: false,
      EnableSelection: false,
      EnableDelete: false,
      EnableEdit: false,
      EnableAdd: false,
      EnableExports: false, // Later...
      EnableFilters: false, // Stamp specific
      EnableOrdering: false,
      EnableSwitchReadOnlyMode: true,
      ReadOnly: false,
    },
    Filtering: {
      Filters: [], // Stamp specific
      FilterProps: [], // Stamp specific
    },
    Ordering: {
      DefaultAccessor: "",
      Column: "",
      Accessor: "",
      Ascending: false,
      Descending: false,
    },
    Pagination: {
      PageSizes: [10, 20, 30, 40, 50],
      PageSize: 10,
      CurrentPage: 1,
      PageCount: 1,
      DataCount: 0,
      LoadedDataCount: 0,
      CanGoToNextPage: false,
      CanGoToPreviousPage: false,
      CanGoToFirstPage: false,
      CanGoToLastPage: false,
    },
    Table: {
      Data: [],
      SelectedData: [],
      SelectedDataIndexes: [],
      SelectionIndicator: "id",
      SelectedEntirePage: false,
      SelectionType: TableSelectionType.MULTIPLE,
      Columns: [],
      Actions: [],
      FooterText: "",
      HeaderText: "",
    },
    Form: {
      Mode: "READ",
      Data: {},
      ItemIndex: null,
      DataItemTemplate: {},
      Dirty: false,
      Deleted: false,
      Added: false,
      Edited: false,
      CanGoToNextItem: true,
      CanGoToPreviousItem: true,
      CanGoToFirstItem: true,
      CanGoToLastItem: true,
    },
  });

  //====================== LIFECYCLE ======================================================

  useEffect(() => {
    setInitialState();
  }, []);

  useEffect(() => {
    if (SelectedData.Data) {
      setState((draft) => {
        draft.Table.SelectedData = SelectedData.Data;
      });
    }
  }, [SelectedData.Data]);

  useEffect(() => {
    if (Edited) {
      var switchToTable = SwitchToTableViewAfterEdit();

      var formData = FormDataAfterEdit(state.Form.Data);

      setState((draft) => {
        draft.Form.Dirty = false;
        draft.General.IsLoading = false;
        draft.General.CurrentView = switchToTable ? "TableView" : "FormView";

        if (isObject(formData)) {
          draft.Form.Data = { ...state.Form.Data, ...formData };
        }

        if (state.General.DataFromBackend) {
          var data = draft.Table.Data.find(
            (x) => x.Guid === state.Form.Data.Guid
          );

          Object.keys(data).forEach((k) => {
            data[k] = state.Form.Data[k];
          });
        }
      });

      ClearCrudIndicators();
    }
  }, [Edited]);

  useEffect(() => {
    if (Added) {
      var switchToTable = SwitchToTableViewAfterAdd();

      var formData = FormDataAfterAdd(state.Form.Data);
      formData = isObject(formData)
        ? { ...state.Form.DataItemTemplate, ...formData }
        : state.Form.DataItemTemplate;

      if (formData !== null)
        setState((draft) => {
          draft.General.CurrentView = switchToTable ? "TableView" : "FormView";
          draft.Form.Data = formData;
          draft.Form.Dirty = false;
          draft.General.IsLoading = false;
        });

      if (switchToTable)
        Load({ PageSize: state.Pagination.PageSize, CurrentPage: 1 });
      ClearCrudIndicators();
    }
  }, [Added]);

  useEffect(() => {
    if (Deleted) {
      setState((draft) => {
        draft.General.IsLoading = false;
        draft.Table.SelectedData = [];
      });

      Load({ PageSize: state.Pagination.PageSize, CurrentPage: 1 });
      ClearCrudIndicators();
    }
  }, [Deleted]);

  useEffect(() => {
    dataChanged();
  }, [Data]);

  useEffect(() => {
    var defaultState = mergeConfigAndDefaultState();

    if (defaultState.General.DataFromBackend) onPaginationChange();
  }, [props.Pagination]);

  useEffect(() => {
    if (state.Options.EnablePagination && !state.General.DataFromBackend)
      dataChanged();
  }, [state.Pagination]);

  //====================== DEVELOPER VALIDATION ======================================================

  const mergeConfigAndDefaultState = () => {
    var defaultState = getDefaultState();

    for (const cfgProp in Config) {
      for (const property in defaultState[cfgProp]) {
        if (Config[cfgProp].hasOwnProperty(property))
          defaultState[cfgProp][property] = Config[cfgProp][property];
      }
    }

    return defaultState;
  };

  const validateStateOnMount = () => {
    if (!Developer) return;

    var defaultState = mergeConfigAndDefaultState();

    var errors = [];

    if (Columns.length === 0) {
      errors.push("'Columns' property is not set or it's an empty array");
    }

    if (
      defaultState.Options.EnablePagination &&
      defaultState.General.DataFromBackend
    ) {
      if (!Pagination.hasOwnProperty("PageSize")) {
        errors.push(
          "Pagination is enabled but the 'Pagination.PageSize' property is not set."
        );
      }

      if (!Pagination.hasOwnProperty("CurrentPage")) {
        errors.push(
          "Pagination is enabled but the 'Pagination.CurrentPage' property is not set."
        );
      }

      if (!Pagination.hasOwnProperty("PageCount")) {
        errors.push(
          "Pagination is enabled but the 'Pagination.PageCount' property is not set."
        );
      }

      if (!Pagination.hasOwnProperty("DataCount")) {
        errors.push(
          "Pagination is enabled but the 'Pagination.DataCount' property is not set."
        );
      }

      if (Load === null) {
        errors.push(
          "Pagination is enabled but the 'Load' function is not set."
        );
      }

      if (
        defaultState.Pagination.hasOwnProperty("PageSize") &&
        defaultState.Pagination.hasOwnProperty("PageSizes") &&
        !defaultState.Pagination.PageSizes.includes(
          defaultState.Pagination.PageSize
        )
      ) {
        errors.push(`PageSize not in 'Pagination.PageSizes' array.`);
      }
    }

    if (defaultState.Options.EnableOrdering && Load === null) {
      errors.push("Ordering is enabled but the 'Load' function is not set.");
    }

    if (defaultState.Options.EnableFormViewMovement && Form === null) {
      errors.push(
        "From movement is enabled but the 'Form' render function is not set."
      );
    }

    if (defaultState.Options.EnableFormViewMovement && Load === null) {
      errors.push(
        "From movement is enabled but the 'Load' function is not set."
      );
    }

    if (!["single", "multiple"].includes(defaultState.Table.SelectionType)) {
      errors.push("TableSelectionType must be one 'single' or 'multiple'.");
    }

    if (defaultState.General.IsLookup) {
      if (!defaultState.Options.EnableSelection) {
        errors.push("Grid is in Lookup mode but selection is not enabled.");
      }

      if (!SelectedData.hasOwnProperty("Data")) {
        errors.push(
          "Grid is in Lookup mode but 'SelectedData.Data' is not set."
        );
      }

      if (!SelectedData.hasOwnProperty("Identificator")) {
        errors.push(
          "Grid is in Lookup mode but 'SelectedData.Identificator' is not set."
        );
      }

      if (OnChange === null) {
        errors.push(
          "Grid is in Lookup mode but 'OnChange' function is not set."
        );
      }
    }

    var Crud = props.Crud || {};

    if (
      defaultState.Options.EnableAdd &&
      (Crud.OnAdd === null || Crud.OnAdd === undefined)
    ) {
      errors.push("Add is enabled but the 'OnAdd' function is not set.");
    }

    if (
      defaultState.Options.EnableDelete &&
      (Crud.OnDelete === null || Crud.OnDelete === undefined)
    ) {
      errors.push("Delete is enabled but the 'OnDelete' function is not set.");
    }

    if (
      defaultState.Options.EnableEdit &&
      (Crud.OnEdit === null || Crud.OnEdit === undefined)
    ) {
      errors.push("Edit is enabled but the 'OnEdit' function is not set.");
    }

    setErrors(errors);
  };

  //====================== METHODS ======================================================

  const isObject = (val) => {
    if (val === null) {
      return false;
    }
    return typeof val === "function" || typeof val === "object";
  };

  const freezeLoading = (args = []) =>
    freeze([state.General.IsLoading, ...args]);

  const dataChanged = () => {
    var dataCopy = Data.map((x) => ({ ...x }));

    dataCopy.forEach((x) => {
      x.Guid = uuidv4();
    });

    setState((draft) => {
      draft.Table.Data = dataCopy;
      draft.General.IsLoading = false;

      if (state.Form.ItemIndex !== null) {
        draft.Form.Data = { ...dataCopy[state.Form.ItemIndex] };
      }

      noBackendPagination(draft, dataCopy);
    });
  };

  const noBackendPagination = (draft, dataCopy) => {
    var defaultState = mergeConfigAndDefaultState();

    if (
      defaultState.Options.EnablePagination &&
      !defaultState.General.DataFromBackend
    ) {
      setNoBackendData(dataCopy);

      var pageCount = Math.ceil(dataCopy.length / state.Pagination.PageSize);
      var dataCount = dataCopy.length;
      var offset =
        (state.Pagination.CurrentPage - 1) * state.Pagination.PageSize;

      var newData = [...dataCopy].splice(offset, state.Pagination.PageSize);
      var loadeDdataCount = newData.length;

      draft.Table.Data = newData;
      draft.Pagination.PageCount = pageCount;
      draft.Pagination.DataCount = dataCount;
      draft.Pagination.LoadedDataCount = loadeDdataCount;

      var paginationMovement = getPaginationConfig(
        pageCount,
        state.Pagination.CurrentPage
      );

      draft.Pagination.CanGoToNextPage = paginationMovement.CanGoToNextPage;
      draft.Pagination.CanGoToLastPage = paginationMovement.CanGoToLastPage;
      draft.Pagination.CanGoToPreviousPage =
        paginationMovement.CanGoToPreviousPage;
      draft.Pagination.CanGoToFirstPage = paginationMovement.CanGoToFirstPage;
    }
  };

  const setInitialState = () => {
    validateStateOnMount();

    // TODO: add restrictions to specific props
    setState((draft) => {
      for (const cfgProp in Config) {
        for (const property in state[cfgProp]) {
          if (Config[cfgProp].hasOwnProperty(property))
            draft[cfgProp][property] = Config[cfgProp][property];
        }
      }

      draft.General.InitialSetupCompleted = true;
      draft.Table.Columns = Columns;
      draft.Table.Data = Data;

      if (
        Config.Options &&
        (Config.Options.ReadOnly || Config.Options.EnableSwitchReadOnlyMode)
      ) {
        draft.Form.Mode = "READ";
      }

      if (Config.Ordering && Config.Ordering.DefaultAccessor) {
        draft.Ordering.Accessor = Config.Ordering.DefaultAccessor;
        draft.Ordering.Descending = true;
      }
    });
  };

  const getPaginationConfig = (pageCount = null, currentPage = null) => {
    let paginationMovement = {
      CanGoToNextPage: false,
      CanGoToPreviousPage: false,
      CanGoToFirstPage: false,
      CanGoToLastPage: false,
    };

    var CurrentPage = currentPage || Pagination.CurrentPage;
    var PageCount = pageCount || Pagination.PageCount;

    if (CurrentPage >= 1 && CurrentPage !== PageCount) {
      paginationMovement.CanGoToNextPage = true;
      paginationMovement.CanGoToLastPage = true;
    }

    if (CurrentPage <= PageCount && CurrentPage !== 1) {
      paginationMovement.CanGoToPreviousPage = true;
      paginationMovement.CanGoToFirstPage = true;
    }

    return {
      IsLoading: state.General.IsLoading,
      ...Pagination,
      ...paginationMovement,
    };
  };

  const getOrderingConfig = () => {
    return {
      OnOrder: onOrder,
      ...state.Ordering,
    };
  };

  const getFormMovementConfig = () => {
    return {
      IsLoading: state.General.IsLoading,
      CanGoToNextItem: state.Form.CanGoToNextItem,
      CanGoToPreviousItem: state.Form.CanGoToPreviousItem,
      CanGoToFirstItem: state.Form.CanGoToFirstItem,
      CanGoToLastItem: state.Form.CanGoToLastItem,
      goToFirstItem,
      goToLastItem,
      goToNextItem,
      goToPreviousItem,
    };
  };

  const calculateOrdering = (_accessor) => {
    let asc = state.Ordering.Ascending;
    let desc = state.Ordering.Descending;

    let ordering = {
      Accessor: "",
      Ascending: false,
      Descending: false,
    };

    if (state.Ordering.Accessor === _accessor) {
      if (!asc && !desc) {
        ordering.Accessor = _accessor;
        ordering.Ascending = true;
        ordering.Descending = false;

        return ordering;
      }

      if (asc && !desc) {
        ordering.Accessor = _accessor;
        ordering.Ascending = false;
        ordering.Descending = true;

        return ordering;
      }

      if (!asc && desc && state.Ordering.DefaultAccessor === "") {
        ordering.Accessor = "";
        ordering.Ascending = false;
        ordering.Descending = false;

        return ordering;
      }

      if (!asc && desc && state.Ordering.DefaultAccessor !== "") {
        ordering.Accessor = state.Ordering.DefaultAccessor;
        ordering.Ascending = true;
        ordering.Descending = false;

        return ordering;
      }
    }

    if (state.Ordering.Accessor !== _accessor) {
      ordering.Accessor = _accessor;
      ordering.Ascending = true;
      ordering.Descending = false;

      return ordering;
    }

    return ordering;
  };

  const getBorderStyleProp = () => {
    if (
      state.Form.Dirty &&
      state.Form.Mode === FormMode.EDIT &&
      state.Options.EnableEdit
    )
      return "edit";

    if (
      !state.Form.Dirty &&
      state.Form.Mode === FormMode.EDIT &&
      state.Options.EnableEdit
    )
      return "success";

    if (state.Form.Mode === FormMode.ADD) return "add";
  };

  const toggleDeleteConfirmationBox = () => {
    setState((draft) => {
      draft.General.DeleteConfirmationBox = !state.General
        .DeleteConfirmationBox;
    });
  };

  const isLookup = () => {
    if (Config && Config.General && Config.General.hasOwnProperty("IsLookup"))
      return Config.General.IsLookup;

    return false;
  };

  //====================== EVENTS ======================================================

  const changeToEditMode = () => {
    setState((draft) => {
      if (state.Form.Mode === "READ") draft.Form.Mode = "EDIT";
      if (state.Form.Mode === "EDIT") draft.Form.Mode = "READ";
    });
  };

  const onOrder = (accessor) => {
    let ordering = calculateOrdering(accessor);

    var order = BeforeOrder(ordering);

    if (order) {
      setState((draft) => {
        draft.Ordering.Accessor = ordering.Accessor;
        draft.Ordering.Ascending = ordering.Ascending;
        draft.Ordering.Descending = ordering.Descending;
        draft.General.IsLoading = true;
        draft.Table.SelectedData = [];
        draft.Table.SelectedEntirePage = false;
      });

      Load({
        PageSize: state.Pagination.PageSize,
        CurrentPage: 1,
        Ordering: ordering,
      });

      AfterOrder(ordering);
    }
  };

  const goToFirstItem = () => {
    onGoToFirstPage(state.Pagination.PageSize, state.Pagination.CurrentPage);
    setItemChanged(true);

    setState((draft) => {
      draft.Form.ItemIndex = 0;
      draft.Form.Dirty = false;
    });
  };

  const goToLastItem = () => {
    onGoToLastPage(state.Pagination.PageSize, state.Pagination.CurrentPage);
    setItemChanged(true);

    let loadedDataCount =
      state.Pagination.DataCount -
      (state.Pagination.PageCount - 1) * state.Pagination.PageSize;

    setState((draft) => {
      draft.Form.ItemIndex = loadedDataCount - 1;
      draft.Form.Dirty = false;
    });
  };

  const goToNextItem = () => {
    let index = state.Form.ItemIndex + 1;

    if (
      index > state.Pagination.LoadedDataCount - 1 &&
      state.Pagination.CurrentPage === state.Pagination.PageCount
    )
      return;

    if (index > state.Pagination.PageSize - 1) {
      onGoToNextPage(state.Pagination.PageSize, state.Pagination.CurrentPage);
      setItemChanged(true);

      setState((draft) => {
        draft.Form.ItemIndex = 0;
        draft.Form.Dirty = false;
      });
    } else {
      setItemChanged(true);
      setState((draft) => {
        draft.Form.Data = state.Table.Data[index];
        draft.Form.ItemIndex = index;
        draft.Form.Dirty = false;
      });
    }
  };

  const goToPreviousItem = () => {
    let index = state.Form.ItemIndex - 1;

    if (index < 0 && state.Pagination.CurrentPage === 1) return;

    if (index < 0) {
      setItemChanged(true);
      onGoToPreviousPage(
        state.Pagination.PageSize,
        state.Pagination.CurrentPage
      );

      setState((draft) => {
        draft.Form.ItemIndex = state.Pagination.PageSize - 1;
        draft.Form.Dirty = false;
      });
    } else {
      setItemChanged(true);
      setState((draft) => {
        draft.Form.Data = state.Table.Data[index];
        draft.Form.ItemIndex = index;
        draft.Form.Dirty = false;
      });
    }
  };

  const onPaginationChange = () => {
    let pagination = getPaginationConfig();
    setState((draft) => {
      draft.Pagination.PageSize = pagination.PageSize;
      draft.Pagination.CurrentPage = pagination.CurrentPage;
      draft.Pagination.PageCount = pagination.PageCount;
      draft.Pagination.DataCount = pagination.DataCount;
      draft.Pagination.LoadedDataCount = pagination.LoadedDataCount;

      draft.Pagination.CanGoToNextPage = pagination.CanGoToNextPage;
      draft.Pagination.CanGoToPreviousPage = pagination.CanGoToPreviousPage;
      draft.Pagination.CanGoToFirstPage = pagination.CanGoToFirstPage;
      draft.Pagination.CanGoToLastPage = pagination.CanGoToLastPage;

      if (!isLookup()) {
        draft.Table.SelectedData = [];
        draft.Table.SelectedEntirePage = false;
      }
    });
  };

  const onSelect = (dataItem) => {
    var selectedData = [...state.Table.SelectedData];
    var selectedEntirePage = false;
    var id = state.General.IsLookup ? SelectedData.Identificator : "Guid";

    var selected = state.Table.SelectedData.find((x) => x[id] === dataItem[id]);

    if (selected) {
      selectedData = state.Table.SelectedData.filter(
        (x) => x[id] !== dataItem[id]
      );
    } else if (state.Table.SelectionType === TableSelectionType.SINGLE) {
      selectedData = [dataItem];
    } else if (state.Table.SelectionType === TableSelectionType.MULTIPLE) {
      selectedData.push(dataItem);
    }

    if (state.Table.SelectionType === TableSelectionType.MULTIPLE) {
      var dataGuids = state.Table.Data.map((x) => x[id]);
      var selectedDataGuids = selectedData.map((x) => x[id]);

      selectedEntirePage = dataGuids.every((elem) =>
        selectedDataGuids.includes(elem)
      );
    }

    setState((draft) => {
      draft.Table.SelectedData = selectedData;
      draft.Table.SelectedEntirePage = selectedEntirePage;
    });
  };

  const onSelectAll = () => {
    var id = state.General.IsLookup ? SelectedData.Identificator : "Guid";
    var dataGuids = state.Table.Data.map((x) => x[id]);
    var selectedData = state.Table.SelectedData.filter(
      (x) => !dataGuids.includes(x[id])
    );
    var selectedEntirePage;

    if (state.Table.SelectedEntirePage) {
      selectedEntirePage = false;
    } else {
      selectedEntirePage = true;
      selectedData = [...selectedData, ...state.Table.Data];
    }

    setState((draft) => {
      draft.Table.SelectedEntirePage = selectedEntirePage;
      draft.Table.SelectedData = selectedData;
    });
  };

  const onTableRowClick = (dataItem, col) => {
    if (col.render) {
      col.render(dataItem, col);
    }

    if (Form === null && !state.General.IsLookup) return;

    var id = state.General.IsLookup ? SelectedData.Identificator : "Guid";

    if (
      state.General.IsLookup &&
      state.Table.SelectionType === TableSelectionType.SINGLE
    ) {
      OnChange([dataItem]);
    } else if (
      state.General.IsLookup &&
      state.Table.SelectionType === TableSelectionType.MULTIPLE
    ) {
      onSelect(dataItem);
    } else {
      setState((draft) => {
        let index = state.Table.Data.map((x) => x[id]).indexOf(dataItem[id]);

        draft.Form.Data = { ...dataItem };
        draft.Form.ItemIndex = index;
        draft.General.CurrentView = "FormView";
        draft.Form.Dirty = false;

        if (state.Options.ReadOnly || state.Options.EnableSwitchReadOnlyMode) {
          draft.Form.Mode = "READ";
        } else {
          draft.Form.Mode = "EDIT";
        }
      });
    }
  };

  const onRefresh = () => {
    setState((draft) => {
      draft.Form.ItemIndex = null;
      draft.General.CurrentView = "TableView";
      draft.General.IsLoading = true;

      if (!state.General.IsLookup) draft.Table.SelectedData = [];
    });

    Load({
      PageSize: state.Pagination.PageSize,
      CurrentPage: state.Pagination.CurrentPage,
    });
  };

  const onSwitchToTableView = () => {
    setState((draft) => {
      draft.Form.Data = state.Form.DataItemTemplate;
      draft.Form.ItemIndex = null;
      draft.General.CurrentView = "TableView";
      draft.Table.SelectedData = [];

      if (state.General.DataFromBackend) draft.General.IsLoading = true;
    });

    if (state.General.DataFromBackend)
      Load({
        PageSize: state.Pagination.PageSize,
        CurrentPage: state.Pagination.CurrentPage,
      });
  };

  const onGoToNextPage = (PageSize, CurrentPage) => {
    var willChange = BeforePageChange({
      PageSize,
      CurrentPage: CurrentPage + 1,
    });

    if (willChange) {
      setState((draft) => {
        draft.General.IsLoading = true;

        if (!isLookup()) {
          draft.Table.SelectedData = [];
          draft.Table.SelectedEntirePage = false;
        }

        if (!state.General.DataFromBackend) {
          draft.Pagination.CurrentPage = state.Pagination.CurrentPage + 1;
        }
      });

      if (state.General.DataFromBackend)
        Load({ PageSize, CurrentPage: CurrentPage + 1 });

      AfterPageChanged({ PageSize, CurrentPage: CurrentPage + 1 });
    }
  };

  const onGoToPreviousPage = (PageSize, CurrentPage) => {
    var willChange = BeforePageChange({
      PageSize,
      CurrentPage: CurrentPage - 1,
    });

    if (willChange) {
      setState((draft) => {
        draft.General.IsLoading = true;

        if (!isLookup()) {
          draft.Table.SelectedData = [];
          draft.Table.SelectedEntirePage = false;
        }

        if (!state.General.DataFromBackend) {
          draft.Pagination.CurrentPage = state.Pagination.CurrentPage - 1;
        }
      });

      if (state.General.DataFromBackend)
        Load({ PageSize, CurrentPage: CurrentPage - 1 });

      AfterPageChanged({ PageSize, CurrentPage: CurrentPage - 1 });
    }
  };

  const onGoToLastPage = (PageSize) => {
    var willChange = BeforePageChange({
      PageSize,
      CurrentPage: state.Pagination.PageCount,
    });

    if (willChange) {
      setState((draft) => {
        draft.General.IsLoading = true;

        if (!isLookup()) {
          draft.Table.SelectedData = [];
          draft.Table.SelectedEntirePage = false;
        }

        if (!state.General.DataFromBackend) {
          draft.Pagination.CurrentPage = Math.ceil(
            Data.length / state.Pagination.PageSize
          );
        }
      });

      if (state.General.DataFromBackend)
        Load({
          PageSize,
          CurrentPage: state.Pagination.PageCount,
        });

      AfterPageChanged({
        PageSize,
        CurrentPage: state.Pagination.PageCount,
      });
    }
  };

  const onGoToFirstPage = (PageSize) => {
    var willChange = BeforePageChange({
      PageSize,
      CurrentPage: 1,
    });

    if (willChange) {
      setState((draft) => {
        draft.General.IsLoading = true;

        if (!isLookup()) {
          draft.Table.SelectedData = [];
          draft.Table.SelectedEntirePage = false;
        }

        if (!state.General.DataFromBackend) {
          draft.Pagination.CurrentPage = 1;
        }
      });

      if (state.General.DataFromBackend) Load({ PageSize, CurrentPage: 1 });

      AfterPageChanged({ PageSize, CurrentPage: 1 });
    }
  };

  const onPageSizeChanged = (PageSize) => {
    var willChange = BeforePageSizeChange(PageSize);

    if (willChange) {
      setState((draft) => {
        draft.General.IsLoading = true;
        draft.Table.SelectedData = [];
        draft.Table.SelectedEntirePage = false;

        if (!state.General.DataFromBackend) {
          draft.Pagination.PageSize = PageSize;
          draft.Pagination.CurrentPage = 1;
        }
      });

      if (state.General.DataFromBackend) Load({ PageSize: parseInt(PageSize) });

      AfterPageSizeChanged(PageSize);
    }
  };

  const OnFieldChange = (id, value) => {
    setState((draft) => {
      draft.Form.Data[id] = value;

      if (!itemChanged && state.Form.Data[id] !== value) {
        draft.Form.Dirty = true;
      } else {
        setItemChanged(false);
      }
    });
  };

  const onDelete = () => {
    if (OnDelete) OnDelete(state.Table.SelectedData, noBackendData);
  };

  const onEdit = () => {
    if (OnEdit) {
      var formData = { ...state.Form.Data };

      if (state.General.DataFromBackend) OnEdit(formData, noBackendData);

      if (!state.General.DataFromBackend) {
        var success = OnEdit(formData, noBackendData);

        if (success) {
          var switchToTable = SwitchToTableViewAfterEdit();

          var setFormData = FormDataAfterEdit(formData);
          setFormData = isObject(setFormData)
            ? { ...formData, ...setFormData }
            : formData;

          setState((draft) => {
            draft.Form.Dirty = false;
            draft.Form.Data = setFormData;
            draft.General.CurrentView = switchToTable
              ? "TableView"
              : "FormView";
          });
        }
      }
    }
  };

  const onAdd = () => {
    var formData = { ...state.Form.Data };

    if (OnAdd) {
      if (!state.General.DataFromBackend) {
        formData.Guid = uuidv4();
      }
    }

    if (state.General.DataFromBackend) OnAdd(formData, noBackendData);

    if (!state.General.DataFromBackend) {
      var success = OnAdd(formData, noBackendData);

      if (success === true) {
        var switchToTable = SwitchToTableViewAfterAdd();

        var setFormData = FormDataAfterAdd(formData);
        setFormData = isObject(setFormData)
          ? { ...state.Form.DataItemTemplate, ...setFormData }
          : state.Form.DataItemTemplate;

        setState((draft) => {
          draft.General.CurrentView = switchToTable ? "TableView" : "FormView";
          draft.Form.Data = setFormData;
          draft.Form.Dirty = false;
          draft.General.IsLoading = false;
        });
      }
    }
  };

  const goToAdd = () => {
    var formData = GoToAddFormData();

    setState((draft) => {
      draft.Form.Data = isObject(formData)
        ? { ...state.Form.DataItemTemplate, ...formData }
        : state.Form.DataItemTemplate;

      draft.Form.Mode = "ADD";
      draft.General.CurrentView = "FormView";
      draft.Table.SelectedData = [];
      draft.Form.Dirty = false;
    });
  };

  const onDiscard = () => {
    var discard = BeforeDiscard();

    if (discard) {
      var id = state.General.IsLookup ? SelectedData.Identificator : "Guid";

      setState((draft) => {
        draft.Form.Data = state.Table.Data.find(
          (x) => x[id] === state.Form.Data[id]
        );
        draft.Form.Dirty = false;
      });

      AfterDiscard(state.FormData);
    }
  };

  //====================== RENDER ======================================================

  const renderDeveloperMessages = () => {
    if (errors.length > 0 && props.Developer)
      return (
        <DeveloperMessageContainer>
          {errors.map((x, i) => (
            <DeveloperMessage key={i}>{x}</DeveloperMessage>
          ))}
        </DeveloperMessageContainer>
      );

    return <></>;
  };

  const renderSwitchToEditModeButton = () => {
    if (
      state.Options.ReadOnly ||
      !state.Options.EnableSwitchReadOnlyMode ||
      Form === null ||
      Form === undefined ||
      state.General.CurrentView !== "FormView"
    )
      return false;

    return (
      <FlexItem>
        <Button
          tooltip={
            state.Form.Mode === FormMode.READ
              ? Localization.FormEditMode || "Edit mode"
              : Localization.FormReadMode || "View mode"
          }
          onClick={changeToEditMode}
          disabled={freezeLoading()}
          icon={state.Form.Mode === FormMode.READ ? "edit" : "eye"}
          inverted={true}
        />
      </FlexItem>
    );
  };

  const renderGoToAddButton = () => {
    if (state.Options.ReadOnly || state.General.IsLookup || Form === null) {
      return false;
    }

    if (state.Options.EnableAdd && state.General.CurrentView !== "FormView") {
      return (
        <FlexItem>
          <Button
            tooltip={Localization.Add || "Add"}
            onClick={goToAdd}
            disabled={freezeLoading()}
            icon="plus"
            inverted={true}
          ></Button>
        </FlexItem>
      );
    }

    return null;
  };

  const renderRefreshButton = () => {
    if (state.General.CurrentView !== "TableView" || Load === null) {
      return false;
    }

    return (
      <FlexItem>
        <Button
          tooltip={Localization.Refresh || "Refresh"}
          onClick={onRefresh}
          disabled={freezeLoading()}
          icon="sync-alt"
          size="small"
          inverted={true}
        />
      </FlexItem>
    );
  };

  const renderHeaderText = () => {
    if (state.General.CurrentView !== "TableView" || Load === null) {
      return false;
    }
    return <ItemHeaderText {...themeProps}>{props.HeaderText}</ItemHeaderText>;
  };

  const renderLookupTakeValues = () => {
    if (
      state.General.IsLookup &&
      state.Table.SelectionType === TableSelectionType.MULTIPLE
    ) {
      return (
        <FlexItem>
          <Button
            tooltip={Localization.TakeValues || "Take values"}
            onClick={() => {
              if (OnChange) OnChange(state.Table.SelectedData);
            }}
            disabled={freezeLoading([state.Table.SelectedData.length === 0])}
            icon="check-circle"
            inverted={true}
          />
        </FlexItem>
      );
    }

    return false;
  };

  const renderDeleteConfirmationBox = () => {
    if (!state.Options.EnableDelete || state.General.CurrentView === "FormView")
      return <></>;

    return (
      <Modal
        basic={true}
        id={"AreYouSure?"}
        open={state.General.DeleteConfirmationBox}
        size={"small"}
        handleDialogClose={toggleDeleteConfirmationBox}
      >
        <ConfirmationForm
          handleDialogClose={toggleDeleteConfirmationBox}
          refuseFunction={toggleDeleteConfirmationBox}
          approveFunction={onDelete}
        ></ConfirmationForm>
      </Modal>
    );
  };

  const renderDeleteSelectedButton = () => {
    if (
      state.Options.ReadOnly ||
      !state.Options.EnableDelete ||
      state.General.CurrentView === "FormView" ||
      state.General.IsLookup ||
      OnDelete === null
    ) {
      return false;
    }

    return (
      <FlexItem>
        <Button
          onClick={toggleDeleteConfirmationBox}
          disabled={freezeLoading([state.Table.SelectedData.length === 0])}
          tooltip={Localization.DeleteSelected || "Delete selected"}
          icon="trash"
          inverted={true}
        />
      </FlexItem>
    );
  };

  const renderChangeToTableView = () => {
    if (Form === null || state.General.CurrentView === "TableView") {
      return false;
    }

    return (
      <FlexItem>
        <Button
          tooltip={Localization.ToTableView || "Table view"}
          onClick={onSwitchToTableView}
          disabled={freezeLoading()}
          icon="table"
          inverted={true}
        />
      </FlexItem>
    );
  };

  const renderFormViewMovement = () => {
    if (
      state.Options.EnableFormViewMovement &&
      Form !== null &&
      state.General.CurrentView === "FormView" &&
      state.Form.Mode !== "ADD"
    ) {
      return (
        <FormMovement
          Config={getFormMovementConfig()}
          Localization={Localization.FormViewMovement || {}}
        />
      );
    } else {
      return false;
    }
  };

  const renderPagination = () => {
    if (!state.Options.EnablePagination) return false;

    var cfg = {
      IsLoading: state.General.IsLoading,
      ...state.Pagination,
      ...Pagination,
      goToNextPage: onGoToNextPage,
      goToPreviousPage: onGoToPreviousPage,
      goToLastPage: onGoToLastPage,
      goToFirstPage: onGoToFirstPage,
      OnPageSizeChanged: onPageSizeChanged,
    };

    return (
      <PaginationContainer>
        <TablePagination
          {...cfg}
          inverted={true}
          Localization={Localization.Pagination || {}}
        />
        <ItemFooterText {...themeProps}>{props.FooterText}</ItemFooterText>
      </PaginationContainer>
    );
  };

  const renderSpinner = () => {
    if (!state.General.IsLoading) return <></>;

    return (
      <>
        <LoaderContainer></LoaderContainer>
        <LoaderContainerTransparent>
          <Loader>{state.Table.Data.length > 2 ? <Spinner /> : <></>}</Loader>
        </LoaderContainerTransparent>
      </>
    );
  };

  const renderTable = () => {
    if (
      state.General.CurrentView !== "TableView" &&
      state.General.DataFromBackend
    )
      return <></>;

    var id = state.General.IsLookup ? SelectedData.Identificator : "Guid";

    return (
      <DivRelative>
        {renderSpinner()}
        <Table
          IsLoading={state.General.IsLoading}
          Columns={state.Table.Columns}
          Data={state.Table.Data}
          OnRowClick={onTableRowClick}
          //---------------------------------
          Ordering={getOrderingConfig()}
          Selection={{
            SelectedData: state.Table.SelectedData,
            SelectedEntirePage: state.Table.SelectedEntirePage,
            SelectionIndicator: id,
            OnSelection: onSelect,
            OnSelectAll: onSelectAll,
          }}
          Options={{
            IsLookup: state.General.IsLookup,
            ReadOnly: state.Options.ReadOnly,
            EnableSelection: state.Options.EnableSelection,
            EnableOrdering: state.Options.EnableOrdering,
            SelectionType: state.Table.SelectionType,
          }}
          Localization={Localization.TableView || {}}
        />
      </DivRelative>
    );
  };

  const renderForm = () => {
    if (
      state.General.CurrentView !== "FormView" ||
      Form === null ||
      Form === undefined
    )
      return <></>;

    var component = (
      <FormContainer
        borderStyle={getBorderStyleProp()}
        read={state.Form.Mode === FormMode.READ}
        {...themeProps}
      >
        {Form({
          Data: state.Form.Data,
          OnFieldChange: OnFieldChange,
          FormMode: state.Form.Mode,
          IsLoading: state.General.IsLoading,
          Dirty: state.Form.Dirty,
          EnableEdit: state.Options.EnableEdit,
          EnableAdd: state.Options.EnableAdd,
          //------------------
          OnAdd: onAdd,
          OnEdit: onEdit,
          OnDiscard: onDiscard,
        })}
      </FormContainer>
    );

    if (state.General.DataFromBackend) {
      return component;
    }

    if (!state.General.DataFromBackend) {
      return (
        <Modal
          id={"FormViewInModal"}
          open={true}
          size={"medium"}
          title={""}
          handleDialogClose={onSwitchToTableView}
        >
          {component}
        </Modal>
      );
    }
  };

  const renderHeader = () => {
    var x1 =
      Form === null || state.General.CurrentView === "TableView" ? false : true;

    var x2 =
      state.Options.ReadOnly ||
      !state.Options.EnableDelete ||
      state.General.CurrentView === "FormView" ||
      state.General.IsLookup ||
      OnDelete === null
        ? false
        : true;

    var x3 =
      state.Options.ReadOnly || state.General.IsLookup || Form === null
        ? false
        : true;

    var x4 =
      state.Options.EnableFormViewMovement &&
      Form !== null &&
      state.General.CurrentView === "FormView" &&
      state.Form.Mode !== "ADD"
        ? true
        : false;

    var x5 =
      state.Options.ReadOnly ||
      !state.Options.EnableSwitchReadOnlyMode ||
      Form === null ||
      Form === undefined ||
      state.General.CurrentView !== "FormView"
        ? false
        : true;

    var x6 =
      state.General.CurrentView !== "TableView" || Load === null ? false : true;

    var x7 =
      state.General.IsLookup &&
      state.Table.SelectionType === TableSelectionType.MULTIPLE
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
          {renderHeaderText()}
          {renderLookupTakeValues()}
        </HeaderContainer>
      );

    return <></>;
  };

  return (
    <Container {...themeProps}>
      {renderHeader()}
      <TableContainer {...themeProps}>
        {renderDeleteConfirmationBox()}
        {renderTable()}
        {renderForm()}
        {renderDeveloperMessages()}
      </TableContainer>
      {renderPagination()}
    </Container>
  );
});

Grid.defaultProps = {
  theme: theme,
  size: "small",
  color: "primary",
  Columns: [],
  Data: [],
  Config: {},
  Form: null,
  Pagination: {},
  Load: null,
  Localization: {},
  SelectedData: {},
  OnChange: null,
  Developer: false,
};

Grid.propTypes = {
  theme: PropTypes.object.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
  Columns: PropTypes.array,
  Data: PropTypes.array,
  Config: PropTypes.object,
  Form: PropTypes.func,
  Pagination: PropTypes.object,
  Load: PropTypes.func,
  Localization: PropTypes.object,
  SelectedData: PropTypes.object,
  OnChange: PropTypes.func,
  Developer: PropTypes.bool,
};

export default Grid;
