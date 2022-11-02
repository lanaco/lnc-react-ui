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
    setFormProperties(formProps) {
      return produce(state, (draft) => {
        draft.Form.DataRecord = formProps.DataRecord;
      });
    },
    //-------------------------------------------------------
    toggleFormActive() {
      return produce(state, (draft) => {
        draft.View.FormActive = !draft.View.FormActive;
      });
    },
    //-------------------------------------------------------
    dataRecordChanged({ field, value }) {
      return produce(state, (draft) => {
        draft.Form.DataRecord[field] = value;
      });
    },
    //-------------------------------------------------------
    initialSetup(setupData) {
      return produce(state, (draft) => {
        draft.Data.DataSource = setupData.DataSource;
      });
    },
    //-------------------------------------------------------
    setViews(views, defaultCurrentView) {
      return produce(state, (draft) => {
        draft.View.Views = views;
        draft.View.CurrentView = defaultCurrentView;
      });
    },
    //-------------------------------------------------------
    setCurrentView(currentView) {
      return produce(state, (draft) => {
        draft.View.CurrentView = currentView;
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
  };
};

export default createActions;
