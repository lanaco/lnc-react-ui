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

const Container = styled.div`
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ededed;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Controls = styled.div`
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
`;

const Text = styled.span`
  font-size: 14px;
  color: gray;
`;

const DataView = React.forwardRef(
  ({ children, views = [], defaultCurrentView = null }, ref) => {
    //
    //================ PROPS =================

    //================ STATE =================

    const [{ Options, View, General }, actions] = useMethods(
      createActions,
      initialState
    );

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

    useUnmount(() => {
      console.log("unmount");
    });

    //================ UPDATE =================

    useUpdateEffect(() => {}, [General.Ready]);

    //================ RENDER =================

    const renderView = () => {
      if (View.currentView === null)
        return <Text>No view type selected...</Text>;

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
        <Controls>
          {View.views.map((v) => (
            <Button
              key={v.name}
              text={v.name}
              type={"tinted"}
              onClick={() => actions.setCurrentView(v)}
            />
          ))}

          <IconButton
            key={"x"}
            type="tinted"
            icon="times"
            color="danger"
            onClick={() => actions.setCurrentView(null)}
          />

          {General.Loading && (
            <div style={{ marginLeft: "auto" }}>
              <IconButton color="secondary" type="basic" icon="spinner" />
            </div>
          )}
        </Controls>

        <ViewContainer>{renderView()}</ViewContainer>
      </Container>
    );
  }
);

export default DataView;
