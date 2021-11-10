import React from "react";
import { Global, css } from "@emotion/react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const SwitchAnimation = (props) => {
  const { key = false, name = "name", duration = 330, children } = props;

  return (
    <>
      <Global
        styles={css`
          .${name}-enter {
            opacity: 0;
          }
          .${name}-exit {
            opacity: 1;
          }
          .${name}-enter-active {
            opacity: 1;
          }
          .${name}-exit-active {
            opacity: 0;
          }
          .${name}-enter-active, .${name}-exit-active {
            transition: opacity ${duration}ms;
          }
        `}
      />
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={key}
          addEndListener={(node, done) => {
            node.addEventListener("transitionend", done, false);
          }}
          classNames={name}
        >
          {children}
        </CSSTransition>
      </SwitchTransition>
    </>
  );
};

export default SwitchAnimation;
