const initialState = {
  General: {
    Ready: false,
    Loading: false,
  },
  Options: {
    EnableCreate: false,
    EnableUpdate: false,
    EnableDelete: false,
    EnableDiscard: false,
    EnableFilter: false,
    EnableExport: false,
    EnablePagination: false,
  },
  View: {
    views: [],
    currentView: null,
  },
  Data: {
    itemShape: {},
  },
};

export default initialState;
