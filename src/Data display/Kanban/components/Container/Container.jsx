import React, { forwardRef } from "react";
import { Handle } from "../Handle/Handle";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { getColorRgbaValue } from "../../../../_utils/utils";

//============== STYLES ==================================================

const StyledContainer = styled.div`
  display: flex;
  flex: 1;
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
    ${(props) =>
      props.maxContainerHeight && `max-height: ${props.maxContainerHeight};`}
    overflow: auto;
  }

  ${(props) => (props.hover ? " background-color: #ebebeb;" : "")}

  &:focus-visible {
    border-color: transparent;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0), 0 0px 0px 2px #4c9ffe;
  }

  background-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Kanban",
      props.color,
      "enabled",
      "background"
    )};
`;

const Header = styled.div`
  display: flex;
  padding: 5px 20px;
  padding-left: 8px;
  gap: 12px;
  align-items: center;
  background-color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  background-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "KanbanHeader",
      props.color,
      "enabled",
      "background"
    )};
  color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "KanbanHeader",
      props.color ? "primary" : props.color,
      "enabled",
      "text"
    )};
  &:hover .Actions > * {
    opacity: 1 !important;
  }
`;

const Actions = styled.div`
  display: flex;

  & > *:first-of-type:not(:last-of-type) {
    opacity: 0;
  }

  & > *:first-of-type:not(:last-of-type):focus-visible {
    opacity: 1;
  }
`;

//========================================================================

export const Container = forwardRef((props, ref) => {
  const {
    children,
    containerId,
    renderFooterContent,
    columns = 1,
    handleProps,
    horizontal,
    hover,
    onClick,
    onRemove,
    label,
    placeholder,
    maxContainerHeight,
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
      maxContainerHeight={maxContainerHeight}
      color={color}
      theme={theme}
    >
      {label ? (
        <Header theme={theme} color={color}>
          <Actions className={"Actions"}>
            <Handle {...handleProps} />
          </Actions>
          {label}
        </Header>
      ) : null}
      <ul>{children}</ul>
      {renderFooterContent(containerId)}
    </StyledContainer>
  );
});
