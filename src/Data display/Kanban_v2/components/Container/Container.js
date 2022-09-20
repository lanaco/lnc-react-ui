import React, { forwardRef } from "react";
import classNames from "classnames";
import { Handle } from "../Handle/Handle";
import styles from "./Container.module.css";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

//============== STYLES ==================================================

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-auto-rows: max-content;
  overflow: hidden;
  box-sizing: border-box;
  appearance: none;
  outline: none;
  min-width: 350px;
  margin: 10px;
  border-radius: 5px;
  min-height: 200px;
  transition: background-color 350ms ease;
  background-color: rgba(246, 246, 246, 1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  font-size: 1em;

  ${(props) => (props.horizontal ? "width: 100%;" : "")}
  ${(props) =>
    props.shadow ? "box-shadow: 0 1px 10px 0 rgba(34, 33, 81, 0.1);" : ""}

  & ul {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(var(--columns, 1), 1fr);
    list-style: none;
    padding: 20px;
    margin: 0;
    ${(props) => (props.scrollable ? "overflow-y: auto;" : "")}
    ${(props) => (props.horizontal ? "grid-auto-flow: column;" : "")}
  }

  ${(props) => (props.hover ? " background-color: #ebebeb;" : "")}

  &:focus-visible {
    border-color: transparent;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0), 0 0px 0px 2px #4c9ffe;
  }
`;

const Header = styled.div`
  display: flex;
  padding: 5px 20px;
  padding-right: 8px;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);

  &:hover .Actions > * {
    opacity: 1 !important;
  }
`;

const Actions = styled.div`
  display: flex;

  & > *:first-child:not(:last-child) {
    opacity: 0;
  }

  & > *:first-child:not(:last-child):focus-visible {
    opacity: 1;
  }
`;

//========================================================================

export const Container = forwardRef((props, ref) => {
  const {
    children,
    columns = 1,
    handleProps,
    horizontal,
    hover,
    onClick,
    onRemove,
    label,
    placeholder,
    style,
    scrollable,
    shadow,
    unstyled,
    size,
    color,
    ...rest
  } = props;

  const theme = useTheme();
  const themeProps = { theme, color, size };

  return (
    <StyledContainer
      {...rest}
      ref={ref}
      style={{
        ...style,
        "--columns": columns,
      }}
      unstyled={unstyled}
      horizontal={horizontal}
      hover={hover}
      scrollable={scrollable}
      shadow={shadow}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
    >
      {label ? (
        <Header>
          {label}
          <Actions className={"Actions"}>
            <Handle {...handleProps} />
          </Actions>
        </Header>
      ) : null}
      <ul>{children}</ul>
    </StyledContainer>
  );

  //   const Component = onClick ? "button" : "div";

  //   return (
  //     <Component
  //       {...props}
  //       ref={ref}
  //       style={{
  //         ...style,
  //         "--columns": columns,
  //       }}
  //       className={classNames(
  //         styles.Container,
  //         unstyled && styles.unstyled,
  //         horizontal && styles.horizontal,
  //         hover && styles.hover,
  //         placeholder && styles.placeholder,
  //         scrollable && styles.scrollable,
  //         shadow && styles.shadow
  //       )}
  //       onClick={onClick}
  //       tabIndex={onClick ? 0 : undefined}
  //     >
  //       {label ? (
  //         <div className={styles.Header}>
  //           {label}
  //           <div className={styles.Actions}>
  //             <Handle {...handleProps} />
  //           </div>
  //         </div>
  //       ) : null}
  //       {placeholder ? children : <ul>{children}</ul>}
  //     </Component>
  //   );
});
