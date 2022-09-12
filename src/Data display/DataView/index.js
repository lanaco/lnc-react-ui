import React, { useState, useImperativeHandle, useRef } from "react";
import styled from "@emotion/styled";
import Button from "../../General/Button";
import IconButton from "../../General/IconButton";
import { getCustomRender, renderCustomElement } from "../../_utils/utils";
import initialState from "./state/initialState";
import { useUpdateEffect, useEffectOnce, useUnmount } from "react-use";
import { useMethods } from "react-use";
import { createActions } from "./state";
import ButtonGroup from "../../Layout/Button Group";
import JSONPretty from "react-json-pretty";
import Spinner from "../../Feedback/Spinner/index";
import Modal from "../../Utility/Modal";

const Container = styled.div`
  position: relative;
  padding: 14px;
  border-radius: 8px;
  border: 1px solid #ededed;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StateViewer = styled.div`
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  background-color: rgba(50, 132, 203, 20%);
  overflow: hidden;

  ${(props) => (props.collapsed ? "height: 20px" : "")}
`;

const LoaderContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  overflow: auto;
  z-index: 1000;
  opacity: 0.7;
  background-color: white;
  filter: alpha(opacity=10);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TableViewContainer = styled.div`
  padding: 10px;
  border-radius: 8px;
  background-color: rgba(50, 132, 203, 20%);
`;

const CalendarViewContainer = styled.div`
  padding: 10px;
  border-radius: 8px;
  background-color: rgba(50, 132, 203, 30%);
`;

const KanbanViewContainer = styled.div`
  padding: 10px;
  border-radius: 8px;
  background-color: rgba(50, 132, 203, 40%);
`;

const GanttViewContainer = styled.div`
  padding: 10px;
  border-radius: 8px;
  background-color: rgba(50, 132, 203, 50%);
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 0 12px;
`;

const ViewContainer = styled.div`
  padding: ${(props) => (props.FormActive ? "12px 12px" : "0 0")};
`;

const BackButtonWrapper = styled.div`
  margin-left: auto;
`;
const CreateUpdateContainer = styled.div``;

const DataView = React.forwardRef((props, ref) => {
  //
  //================ PROPS =================

  const {
    children,
    Views = [],
    DefaultCurrentView = null,
    DataSource = [],
    //----------------------------------------
  } = props;

  //================ STATE =================

  const createUpdateModalRef = useRef();

  const [collapsed, setCollapsed] = useState(true);

  const [state, actions] = useMethods(createActions, initialState);

  const { Options, View, General, Data, Form } = state;

  //================ EXPOSED METHODS =================

  useImperativeHandle(
    ref,
    () => ({
      toggleLoading: () => actions.toggleLoading(),
    }),
    [Options, View, General]
  );

  //================ LIFCYCLE =================

  useEffectOnce(() => {
    actions.setViews(Views, DefaultCurrentView);
    actions.initialSetup({ DataSource });
  }, []);

  useUnmount(() => {});

  //================ METHODS =================

  const handleGoToUpdate = (rowData) => {
    actions.setFormProperties({ DataRecord: rowData });

    if (createUpdateModalRef.current) createUpdateModalRef.current.open();
    actions.toggleFormActive();
  };

  const handleCreateUpdateClose = () => {
    actions.toggleFormActive();
    actions.setFormProperties({ DataRecord: {} });
  };

  const backToView = () => {};

  //================ RENDER =================

  //================ RETURN =================

  const renderView = () => {
    if (View.CurrentView === null) return <></>;

    return renderCustomElement(
      getCustomRender(
        View.Views.find((x) => x.id === View.CurrentView.id).type,
        children
      ),
      {
        Data: Data.DataSource,
        goToUpdate: handleGoToUpdate,
      }
    );
  };

  const renderCreateUpdateContainer = () => {
    return (
      <CreateUpdateContainer>
        {renderCustomElement(getCustomRender("FORM", children), {
          DataRecord: Form.DataRecord,
          InModal: Options.EnableFormInModal,
        }) || <></>}
      </CreateUpdateContainer>
    );
  };

  const renderCreateUpdateModal = () => {
    if (Options.EnableFormInModal)
      return (
        <Modal
          ref={createUpdateModalRef}
          isOpen={View.FormActive}
          onClose={handleCreateUpdateClose}
        >
          {renderCreateUpdateContainer()}
        </Modal>
      );
  };

  //=========================================

  return (
    <Container>
      {General.Loading && (
        <LoaderContainer>
          <Spinner />
        </LoaderContainer>
      )}
      <ControlsContainer>
        {View.FormActive && !Options.EnableFormInModal && (
          <BackButtonWrapper>
            <Button
              key={0}
              leadingIcon={"arrow-circle-left"}
              text={`Back to ${View.CurrentView.name}`}
              type={"outline"}
              onClick={handleCreateUpdateClose}
            />
          </BackButtonWrapper>
        )}
        {/* Dont render the view switcher if the form is active and is rendered
        inside the view container */}
        {((!View.FormActive && !Options.EnableFormInModal) ||
          Options.EnableFormInModal) && (
          /* View Switcher */
          <ButtonGroup
            style={{
              marginLeft: "auto",
            }}
          >
            {View.Views.map((v) => (
              <Button
                key={v.id}
                text={v.name}
                leadingIcon={v.icon}
                type={v.id === View.CurrentView.id ? "tinted" : "outline"}
                onClick={() => {
                  if (v.id !== View.CurrentView.id) actions.setCurrentView(v);
                }}
              />
            ))}
          </ButtonGroup>
        )}
      </ControlsContainer>

      <ViewContainer FormActive={View.FormActive && !Options.EnableFormInModal}>
        {View.FormActive && !Options.EnableFormInModal
          ? renderCreateUpdateContainer()
          : renderView()}
      </ViewContainer>

      {renderCreateUpdateModal()}

      {/* <StateViewer
        collapsed={collapsed}
        onClick={() => setCollapsed(!collapsed)}
      >
        <JSONPretty data={state} />
      </StateViewer> */}
    </Container>
  );
});

export default DataView;
