import React, { useState, useEffect } from "react";
import DataView from ".";
import TableView from ".";
import KanbanView from ".";
import TaskForm from ".";
import TaskCard from ".";
import service from ".";

const Scenario = (props) => {
  //
  const dataViewRef = React.useRef();

  const [TableData, SetTableData] = useState([]);
  const [KanbanData, SetKanbanData] = useState([]);

  const [State, SetState] = useState({
    CurrentView: "table",
  });

  //-----------------------------------------------------------------

  useEffect(() => {}, []);

  //-----------------------------------------------------------------

  const loadTableData = (paginationProps, orderingProps, filteringProps) => {
    dataViewRef.current.toggleLoading();

    api
      .get("api/task", { paginationProps, orderingProps, filteringProps })
      .then((responseData) => {
        SetTableData(responseData);
        dataViewRef.current.toggleLoading();
      })
      .error((er) => {
        dataViewRef.current.toggleError(er);
      });
  };

  const loadKanbanData = (paginationProps, orderingProps, filteringProps) => {
    dataViewRef.current.toggleLoading();

    api
      .get("api/task/group-by-status", {
        paginationProps,
        orderingProps,
        filteringProps,
      })
      .then((responseData) => {
        SetKanbanData(responseData);
        dataViewRef.current.toggleLoading();
      })
      .error((er) => {});
  };

  const createUpdateTask = (method, data, onSucces = () => {}) => {
    var apiMethod = method === "create" ? "post" : "put";
    dataViewRef.current.toggleLoading();

    api[apiMethod]("api/task", { data })
      .then((responseData) => {
        onSucces(responseData);
        dataViewRef.current.toggleLoading();
      })
      .error((er) => {});
  };

  const createTaskFromForm = (task) => {
    var validation = service.validateTask(task);

    if (validation.success) createUpdateTask("create", task, (data) => {});
    else {
      dataViewRef.current.toggleLoading();
      dataViewRef.current.toggleError(validation.errors);
    }
  };

  const createTaskFromKanban = (task) => {
    createUpdateTask("create", task, (data) => {});
  };

  const updateTask = (task) => {};

  const deleteTasks = (ids) => {};

  //-----------------------------------------------------------------

  return (
    <div>
      <DataView
        ref={dataViewRef}
        defaultViewId={"table"}
        onViewTypeChanged={(viewType) => {
          SetState((draft) => (draft.CurrentView = viewType));
        }}
        onFormOpen={() => {}}
        onFormClose={() => {}}
        options={{
          renderFormAsModal: true,
        }}
        viewOptions={{
          EnableCreate: true,
        }}
      >
        {/* ------------------------------------------------------------- */}

        <FormView>
          <TaskForm onCreate={createTaskFromForm} onUpdate={() => {}} />
        </FormView>

        {/* ------------------------------------------------------------- */}

        <TableView
          id={"table"}
          columns={[
            { id: 1, accessor: "name", displayName: "Name" },
            { id: 2, accessor: "description", displayName: "Desc" },
            { id: 3, accessor: "status", displayName: "Status" },
          ]}
          data={TableData}
          load={loadTableData}
        />

        {/* ------------------------------------------------------------- */}

        <KanbanView
          id={"kanban"}
          data={[
            { group: "Done", data: [] },
            { group: "Done", data: [] },
            { group: "Done", data: [] },
            { group: "Done", data: [] },
          ]}
          load={loadKanbanData}
          onCreateItem={createTaskFromKanban}
          onDeleteItem={(id) => {}}
        >
          <TaskCard onDeleteItem={(id) => {}} />
        </KanbanView>

        {/* ------------------------------------------------------------- */}

        <DetailsView __TYPE__="VIEW" />
      </DataView>
    </div>
  );
};

export default Scenario;
