const updateOption = (option, value) => {
  return {
    type: "UPDATE_OPTIONS",
    payload: {
      option,
      value,
    },
  };
};

const ready = () => {
  return {
    type: "READY",
  };
};

const toggleLoading = () => {
  return {
    type: "TOGGLE_LOADING",
  };
};

const setViews = (views, defaultCurrentView) => {
  return {
    type: "SET_VIEWS",
    payload: {
      views,
      defaultCurrentView,
    },
  };
};

const setCurrentView = (currentView) => {
  return {
    type: "SET_CURRENT_VIEW",
    payload: {
      currentView,
    },
  };
};

const actions = {
  updateOption,
  ready,
  setViews,
  setCurrentView,
  toggleLoading,
};

export default actions;
