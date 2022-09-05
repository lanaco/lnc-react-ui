import React, { useState, useReducer, useImperativeHandle } from "react";
import styled from "@emotion/styled";
import Button from "../../General/Button";
import IconButton from "../../General/IconButton";
import { getCustomRender, renderCustomElement } from "../../_utils/utils";
import initialState from "./state/initialState";
import { useEffect } from "react";
import { useUpdateEffect, useEffectOnce, useUnmount } from "react-use";
import { useMethods } from "react-use";
import { createActions } from "./state";
import ButtonGroup from "../../Layout/Button Group";
import JSONPretty from "react-json-pretty";
import Spinner from "../../Feedback/Spinner/index";

const Container = styled.div`
  position: relative;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ededed;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ControlsBar = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const ViewContainer = styled.div`
  display: flex;
  padding: 8px 0;
  flex-direction: column;
  gap: 8px;
  border-top: 1px solid #ededed;
  border-bottom: 1px solid #ededed;
`;

const Text = styled.span`
  font-size: 14px;
  color: gray;
`;

const ViewSelector = styled.div`
  margin-left: auto;
`;

const StateViewer = styled.div`
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  background-color: rgba(50, 132, 203, 20%);
  overflow: hidden;

  ${(props) => (props.collapsed ? "height: 20px" : "")}
`;

const LoaderContainerTransparent = styled.div`
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

const DataView = React.forwardRef((props, ref) => {
  //
  //================ PROPS =================

  const {
    children,
    views = [],
    defaultCurrentView = null,
    //----------------------------------------
  } = props;

  //================ STATE =================

  const [collapsed, setCollapsed] = useState(true);

  const [state, actions] = useMethods(createActions, initialState);

  const { Options, View, General } = state;

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
    actions.setViews(views, defaultCurrentView);

    setTimeout(() => {
      actions.ready();
    }, 300);
  }, []);

  useUnmount(() => {});

  //================ UPDATE =================

  useUpdateEffect(() => {}, [General.Ready]);

  //================ METHODS =================

  //================ RENDER =================

  //================ RETURN =================

  const renderView = () => {
    if (View.currentView === null) return <Text>No view type selected...</Text>;

    return renderCustomElement(
      getCustomRender(
        View.views.find((x) => x.id === View.currentView.id).type,
        children
      ),
      {}
    );
  };

  //=========================================

  return (
    <Container>
      {General.Loading && (
        <LoaderContainerTransparent>
          <Spinner />
        </LoaderContainerTransparent>
      )}

      <ControlsBar>
        <ViewSelector>
          <ButtonGroup>
            {View.views.map((v) => (
              <Button
                key={v.name}
                text={v.name}
                type={View.currentView.id === v.id ? "tinted" : "basic"}
                onClick={() => actions.setCurrentView(v)}
                disabled={v.disabled}
              />
            ))}
          </ButtonGroup>
        </ViewSelector>
      </ControlsBar>

      <ViewContainer>{renderView()}</ViewContainer>

      <StateViewer
        collapsed={collapsed}
        onClick={() => setCollapsed(!collapsed)}
      >
        <JSONPretty data={state} />
      </StateViewer>
    </Container>
  );
});

export default DataView;
