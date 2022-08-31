import produce from "immer";

function reducerFunction(draft, action) {
  var payload = action.payload;

  switch (action.type) {
    case "READY":
      draft.General.Ready = true;
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

const reducer = produce(reducerFunction);

export default reducer;
