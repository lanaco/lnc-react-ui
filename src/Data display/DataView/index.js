import React, { useState, useReducer, useImperativeHandle } from "react";
import styled from "@emotion/styled";
import Button from "../../General/Button";
import IconButton from "../../General/IconButton";
import { getCustomRender, renderCustomElement } from "../../_utils/utils";
import reducer from "./state/reducer";
import initialState from "./state/initialState";
import { useEffect } from "react";
import { useUpdateEffect, useEffectOnce } from "react-use";
import actions from "./state/actions";

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

    const [{ Options, View, General }, dis] = useReducer(reducer, initialState);

    //================ EXPOSED METHODS =================

    useImperativeHandle(
      ref,
      () => ({
        toggleLoading: () => dis(actions.toggleLoading()),
      }),
      [Options, View, General]
    );

    //================ MOUNT =================

    useEffectOnce(() => {
      dis(actions.setViews(views, defaultCurrentView));

      setTimeout(() => {
        dis(actions.ready());
      }, 300);
    }, []);

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
              onClick={() => dis(actions.setCurrentView(v))}
            />
          ))}

          <IconButton
            key={"x"}
            type="tinted"
            icon="times"
            color="danger"
            onClick={() => dis(actions.setCurrentView(null))}
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
