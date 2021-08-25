import React from "react";
import styled from "@emotion/styled";

const paddingBySize = (size, hasText) => {
  if (size === "small") return "0.34375rem 0.4rem";
  if (size === "medium") return "0.40625rem 0.4rem";
  if (size === "large") return "0.44375rem 0.4rem";
};

const heightBySize = (size) => {
  if (size === "small") return `1.625rem`;
  if (size === "medium") return `2rem`;
  if (size === "large") return `2.375rem`;
};

const Button = styled.button`
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  font-family: ${(props) => props.theme.typography.fontFamily};
  padding: ${(props) => paddingBySize(props.size)};
  max-height: ${(props) => heightBySize(props.size)};
  min-height: ${(props) => heightBySize(props.size)};
  flex-grow: 1;
  appearance: none;
  outline: none;
  border: none;
  transition: all 220ms;
  display: inline-block;
  cursor: pointer;
  margin: 2px;
  border-radius: 2px;
  border: 1.5px solid transparent;
  ${(props) => (props.selected ? `border: 1.5px solid #bfbfbf80;` : "")}
  color: ${(props) =>
    props.selected
      ? props.theme.palette[props.color].textDark
      : props.theme.palette[props.color].text};
  background-color: ${(props) =>
    props.selected
      ? props.theme.palette[props.color].lighter
      : props.theme.palette[props.color].main};

  &:hover {
    ${(props) => (props.selected ? `` : `border: 1.5px solid #bfbfbf80;`)}
    color: ${(props) =>
      props.selected
        ? props.theme.palette[props.color].text
        : props.theme.palette[props.color].textDark};
    background-color: ${(props) =>
      props.selected
        ? props.theme.palette[props.color].main
        : props.theme.palette[props.color].lighter};
  }
`;

const TagItem = (props) => {
  const {
    id,
    toggleTagSelection,
    disabled,
    text,
    selected,
    size,
    color,
    theme,
  } = props;

  return (
    <Button
      {...{ size, color, theme }}
      selected={selected}
      id={id}
      onClick={() => toggleTagSelection(id)}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

export default TagItem;
