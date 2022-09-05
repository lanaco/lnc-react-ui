import produce from "immer";

export const createActions = (state) => {
  return {
    //-------------------------------------------------------
    ready() {
      return produce(state, (draft) => {
        draft.General.Ready = true;
      });
    },
    //-------------------------------------------------------
    initialSetup() {
      return produce(state, (draft) => {});
    },
    //-------------------------------------------------------
    setViews(views, defaultCurrentView) {
      return produce(state, (draft) => {
        draft.View.views = views;
        draft.View.currentView = defaultCurrentView;
      });
    },
    //-------------------------------------------------------
    setCurrentView(currentView) {
      return produce(state, (draft) => {
        draft.View.currentView = currentView;
      });
    },
    //-------------------------------------------------------
    toggleLoading() {
      return produce(state, (draft) => {
        draft.General.Loading = !state.General.Loading;
      });
    },
    //-------------------------------------------------------
    updateOptions(option, value) {
      return produce(state, (draft) => {
        draft.Options[option] = value;
      });
    },
    //-------------------------------------------------------
    toggleDisableView(view) {
      return produce(state, (draft) => {
        draft.Views.find((x) => x.id === view.id).disabled = !draft.Views.find(
          (x) => x.id === view.id
        ).disabled;
      });
    },
  };
};

export default createActions;
