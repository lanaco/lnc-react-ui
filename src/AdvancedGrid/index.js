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
import { cloneDeep, isArray } from "lodash";
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

export const init = (data) => {
  return {
    type: "INIT",
    payload: data,
  };
};

export const setLoading = (loading) => {
  return {
    type: "SET_LOADING",
    payload: {
      loading: loading,
    },
  };
};

export const setData = (data) => {
  return {
    type: "SET_DATA",
    payload: {
      data,
    },
  };
};

//=========================== INITIAL STATE ==============================================

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
    Identifier: "id",
    IdentifierDataType: "string",
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
    FormView: true,
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

    case "SET_DATA":
      return produce(state, (draftState) => {
        draftState.Data.Data = payload.data;
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
  useUpdateEffect(() => {
    dispatch(setData(Data));
  }, [Data]);

  // Functions exposed to parent via ref
  useImperativeHandle(
    ref,
    () => ({
      setLoading: (loading) => dispatch(setLoading(loading)),
      log: () => console.log(state),
    }),
    [
      state, // Update functions when certain state changes
    ]
  );

  //--------------- EVENTS ---------------

  //--------------- METHODS --------------

  const findChildComponentByType = (type) => {
    if (props.children && type) {
      var component = React.Children.toArray(props.children).find(
        (child) => child.props.__TYPE__ === type
      );

      if (React.isValidElement(component)) {
        let compChildren = component.props.children;

        return React.cloneElement(component, {
          children: compChildren,
          dispatch,
        });
      }
    }

    return null;
  };

  //--------------- RENDER ---------------

  const renderTableComponent = () => {
    var childTable = findChildComponentByType(viewType.TABLE);

    if (childTable !== null) return <Panel>{childTable}</Panel>;

    return (
      <Panel>
        <Table dispatch={dispatch} />
      </Panel>
    );
  };

  const renderGroupedTableComponent = () => {
    var childTable = findChildComponentByType(viewType.GROUPED_TABLE);

    if (childTable !== null) return <Panel>{childTable}</Panel>;

    return (
      <Panel>
        <GroupedTable dispatch={dispatch} />
      </Panel>
    );
  };

  const renderFormComponent = () => {
    var childTable = findChildComponentByType(viewType.FORM);

    if (childTable !== null) return <Panel>{childTable}</Panel>;

    console.error("'Panel' is empty. Child of type 'FORM' is missing.");
    return <Panel></Panel>;
  };

  const renderPanel = () => {
    // Render components in the content panel based on ViewType
    // If there is a child of ceratain type, use it..
    // if not, use the default component

    if (state.General.ViewType === viewType.TABLE)
      return renderTableComponent();

    if (state.General.ViewType === viewType.GROUPED_TABLE)
      return renderGroupedTableComponent();

    if (
      state.General.ViewType === viewType.GROUPED_TABLE &&
      state.Options.FormView
    ) {
      return renderFormComponent();
    }

    console.error("'Panel' is empty");
    return <Panel></Panel>;
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
