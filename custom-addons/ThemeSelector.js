// OutlineSelector.js

import React, { memo, useState } from "react";
import { useGlobals } from "@storybook/api";
import {
  Icons,
  IconButton,
} from "@storybook/components";
import { createPortal } from "react-dom";
import { useRef } from "react";
import styled from "@emotion/styled";
import { themes } from "../src/_utils/theme";
import "./theme-selector.css"

const StyledTooltip = styled.div`
  position: absolute;
  width: 180px;
  z-index: 2147483647;
  filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.05))
    drop-shadow(0 1px 3px rgba(0, 0, 0, 0.1));
  border-radius: 8px;
  font-size: 12px;
`;

const Item = styled.div`
  padding: 7px 15px;
  cursor: pointer;
  font-weight: 400;
`;

const Triangle = styled.div`
  position: absolute;
  border-style: solid;
  -webkit-transform: translate3d(8px, 0px, 0px);
  -moz-transform: translate3d(8px, 0px, 0px);
  -ms-transform: translate3d(8px, 0px, 0px);
  transform: translate3d(8px, 0px, 0px);
  bottom: autopx;
  top: -8px;
  right: autopx;
  left: autopx;
  border-bottom-width: 8px;
  border-top-width: 0px;
  border-right-width: 8px;
  border-left-width: 8px;
  border-top-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
`;

export const ThemeSelector = memo(() => {
  const [globals, updateGlobals] = useGlobals();
  const buttonRef = useRef();
  const [toggleTooltip, setToggleTooltip] = useState();

  const changeTheme = (themeName) => {
    setToggleTooltip((prev) => !prev);
    updateGlobals({
      theme: themeName,
    });
  };

  return (
    <div ref={buttonRef}>
      <IconButton
        style={{ position: "relative" }}
        key="outline"
        active={globals["theme"]}
        title="Apply themes to the preview"
        onClick={() => setToggleTooltip((prev) => !prev)}
      >
        <Icons icon="photo" />
      </IconButton>
      {toggleTooltip &&
        createPortal(
          <>
            <Triangle
              className="tooltip-triangle-lnc"
              style={{
                position: "absolute",
                transform: "translate(74px)",
                top: buttonRef?.current?.getBoundingClientRect()?.bottom + 5,
                left: buttonRef?.current?.getBoundingClientRect()?.left - 70,
              }}
            ></Triangle>
            <StyledTooltip
              className="tooltip-lnc"
              style={{
                top: buttonRef?.current?.getBoundingClientRect()?.bottom + 12,
                left: buttonRef?.current?.getBoundingClientRect()?.left - 90,
              }}
            >
              {themes.map((theme, i) => (
                <Item
                  key={i}
                  style={{
                    color:
                      globals["theme"] === theme?.name ? "#FF4785" : "unset",
                  }}
                  onClick={() => changeTheme(theme?.name)}
                >
                  {theme?.name}
                </Item>
              ))}
            </StyledTooltip>
          </>,
          document.body
        )}
    </div>
  );
});