const initialState = {
  General: {
    Ready: false,
    Loading: false,
    ReadOnly: false,
  },
  Options: {
    EnableCreate: false,
    EnableUpdate: false,
    EnableDelete: false,
    EnableDiscard: false,
    //-----------------------
    EnableTableView: true,
    EnableCalendarView: true,
    EnableGanttView: true,
    EnableKanbanView: true,
    EnableFormInModal: true,
  },
  View: {
    Views: [],
    CurrentView: null,
    FormInModal: false,
  },
  Data: {
    DataSource: [],
    DataShape: {},
  },
  Form: {
    DataRecord: {},
    FormMethod: "READ",
  },
};

export default initialState;
