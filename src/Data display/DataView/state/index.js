import produce from "immer";

function reducerFunction(draft, action) {
  var payload = action.payload;

  switch (action.type) {
    case "READY":
      draft.General.Ready = true;
      break;

    case "INITIAL_SETUP":
      break;

    case "SET_VIEWS":
      draft.View.views = payload.views;
      draft.View.currentView = payload.defaultCurrentView;
      break;

    case "SET_CURRENT_VIEW":
      draft.View.currentView = payload.currentView;
      break;

    case "TOGGLE_LOADING":
      draft.General.Loading = !draft.General.Loading;
      break;

    case "UPDATE_OPTIONS":
      draft.Options[payload.option] = payload.value;
      break;
  }
}

//================================================================

export const createActions = (state) => {
  return {
    ready() {
      return produce(state, (draft) => {
        draft.General.Ready = true;
      });
    },

    initialSetup() {
      return produce(state, (draft) => {});
    },

    setViews(views, defaultCurrentView) {
      return produce(state, (draft) => {
        draft.View.views = views;
        draft.View.currentView = defaultCurrentView;
      });
    },

    setCurrentView(currentView) {
      return produce(state, (draft) => {
        draft.View.currentView = currentView;
      });
    },

    toggleLoading() {
      return produce(state, (draft) => {
        draft.General.Loading = !state.General.Loading;
      });
    },

    updateOptions(option, value) {
      return produce(state, (draft) => {
        draft.Options[option] = value;
      });
    },
  };
};

//================================================================

export default createActions;
