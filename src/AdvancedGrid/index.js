import React, {
  forwardRef,
  useState,
  useEffect,
  useImperativeHandle,
  useReducer,
} from "react";
import produce from "immer";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../_utils/theme";
import { mode, selectionType, viewType } from "./constants/constants";
import { useEffectOnce, useUpdateEffect } from "react-use";
import { cloneDeep, isFunction } from "lodash";
import GridContext from "./context";
import Table from "./components/Table";
import GroupedTable from "./components/GroupedTable";

//=========================== CSS ========================================================

const Container = styled.div`
  padding: 10px;
  margin: 0;
  width: 100%;
  border-radius: 3px;
  border: 1px solid #80808080;
  box-sizing: border-box;
`;

const HeaderContainer = styled.div`
  border: 1px solid red;
  padding: 10px;
  margin: 5px 0;
  border-radius: 3px;
`;

const FooterContainer = styled.div`
  border: 1px solid blue;
  padding: 10px;
  margin: 5px 0;
  border-radius: 3px;
`;

const Panel = styled.div`
  border: 1px solid green;
  padding: 10px;
  margin: 5px 0;
  border-radius: 3px;
`;

const ControlsContainer = styled.div`
  border: 1px solid yellow;
  padding: 10px;
  margin: 5px 0;
  border-radius: 3px;
`;

//=========================== ACTIONS ====================================================

const init = (data) => {
  return {
    type: "INIT",
    payload: data,
  };
};

const setLoading = (loading) => {
  return {
    type: "SET_LOADING",
    payload: {
      loading: loading,
    },
  };
};

//=========================== INITIAL STATE================================================

const initialState = {
  General: {
    Loading: true,
    UseLoader: true,
    ViewType: viewType.TABLE,
  },
  Data: {
    Mode: mode.READ,
    Dirty: false,
    Columns: [],
    Data: [
      // {
      //     accessor: "",
      //     order: false,
      //     render: null,
      //     hide: false,
      //     index: 0
      // }
    ],
    DataTemplate: {},
  },
  Pagination: {
    PageSizes: [10, 20, 30, 40, 50],
    PageSize: 10,
    CurrentPage: 1,
    PageCount: 1,
    DataCount: 0,
    CanGoToNextPage: false,
    CanGoToPreviousPage: false,
    CanGoToFirstPage: false,
    CanGoToLastPage: false,
  },
  Selection: {
    Selector: "id",
    SelectedData: [],
    SelectedEntirePage: false,
    SelectionType: selectionType.MULTIPLE,
  },

  Ordering: [
    //   {
    //     Column: "",
    //     Accessor: "",
    //     Ascending: false,
    //     Descending: false,
    //   }
  ],
  Options: {
    Pagination: false,
    Selection: false,
    Ordering: false,
    Create: false,
    Update: false,
    Delete: false,
    // ShowHeader: true,
    // ShowFooter: true,
    // ShowCommands: true,
    // ShowPagination: true,
  },
  Validation: {},
};

function reducer(state, action) {
  let payload = action.payload;
  switch (action.type) {
    //
    case "INIT":
      return produce(state, (draftState) => {
        draftState.General.Loading = payload.General.Loading;

        draftState.Data.Columns = payload.Data.Columns;
        draftState.Data.Data = payload.Data.Data;
      });

    case "SET_LOADING":
      return produce(state, (draftState) => {
        draftState.General.Loading = payload.loading;
      });

    default:
      console.error(`Action ${action.type} is not handled!`);
  }
}

//=========================== COMPONENT =================================================

const AdvancedGrid = forwardRef((props, ref) => {
  // Props
  const { Columns, Data } = props.Data;
  const {} = props.Hooks;
  const { renderTable, renderGroupedTable, renderForm } = props.Render;

  // Component state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Mount
  useEffectOnce(() => {
    dispatch(
      init({
        General: {
          Loading: false,
        },
        Data: {
          Columns,
          Data,
        },
      })
    );

    return () => {};
  });

  // Update (you can include deps array if necessary)
  useUpdateEffect(() => {});

  // Functions exposed to parent via ref
  useImperativeHandle(
    ref,
    () => ({
      setLoading: (loading) => dispatch(setLoading(loading)),
    }),
    [
      // Update functions when certain state changes
    ]
  );

  //--------------- EVENTS ---------------

  //--------------- METHODS --------------

  //--------------- RENDER ---------------

  const renderPanel = () => {
    switch (state.General.ViewType) {
      case viewType.TABLE:
        if (renderTable && isFunction(renderTable))
          return <Panel>{renderTable({})}</Panel>;
        else
          return (
            <Panel>
              <Table controls={{}} />
            </Panel>
          );

      case viewType.GROUPED_TABLE:
        if (renderGroupedTable && isFunction(renderGroupedTable))
          return <Panel>{renderGroupedTable({})}</Panel>;
        else
          return (
            <Panel>
              <GroupedTable controls={{}} />
            </Panel>
          );

      case viewType.FORM:
        if (renderForm && isFunction(renderForm))
          return <Panel>{renderForm({})}</Panel>;
        break;
    }

    return <Panel>{"The panel is empty."}</Panel>;
  };

  const renderHeaderContainer = () => {
    return <HeaderContainer></HeaderContainer>;
  };

  const renderFooterContainer = () => {
    return <FooterContainer></FooterContainer>;
  };

  const renderControlsContainer = () => {
    return <ControlsContainer></ControlsContainer>;
  };

  return (
    <GridContext.Provider value={state}>
      <Container>
        {renderControlsContainer()}
        {renderHeaderContainer()}
        {renderPanel()}
        {renderFooterContainer()}
      </Container>
    </GridContext.Provider>
  );
});

AdvancedGrid.defaultProps = {
  General: {},
  Data: {},
  Selection: {},
  Pagination: {},
  Ordering: {},
  Options: {},
  Hooks: {},
  Render: {},
};

export default AdvancedGrid;
