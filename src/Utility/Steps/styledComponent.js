import styled from "@emotion/styled";
import {
  getBorderRadiusValueWithUnits,
  getColorRgbaValue,
  getComponentTypographyCss,
} from "../../_utils/utils";

export const StyledSteps = styled.ul`
  display: flex;
  position: relative;
  margin: auto;
  padding: 0;
  width: 100%;
  text-align: center;
  overflow: hidden;
  overflow-x: auto;
  z-index: 1;

  &.vertical {
    display: block;
  }
`;

export const StyledStep = styled.li`
  ${(props) =>
    getComponentTypographyCss(props.theme, "Steps", props.size, "enabled")}
  color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Steps",
      "default",
      "enabled",
      "background"
    )};
  flex: 1;
  position: relative;
  padding: 0 5%;
  list-style-type: none;

  &:before {
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Steps",
        "default",
        "enabled",
        "lightBackground"
      )};
    color: ${(props) =>
      getColorRgbaValue(props.theme, "Steps", "default", "enabled", "text")};
    border-radius: ${(props) =>
      getBorderRadiusValueWithUnits(props.theme, props.borderRadius)};
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 0.5rem;
    width: 2rem;
    height: 2rem;
    position: relative;
    font-size: 1.25rem;
    z-index: 1;
    content: attr(content);
  }

  &:after {
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Steps",
        "default",
        "enabled",
        "lightBackground"
      )};
    width: 100%;
    height: 0.5rem;
    position: absolute;
    left: -50%;
    top: 0.75rem;
    z-index: -1;
    content: "";
  }

  &.done {
    &:before {
      background-color: ${(props) =>
        getColorRgbaValue(
          props.theme,
          "Steps",
          props.color,
          "enabled",
          "background"
        )};
    }

    &:after {
      background-color: ${(props) =>
        getColorRgbaValue(
          props.theme,
          "Steps",
          props.color,
          "enabled",
          "background"
        )};
    }
  }

  &.active {
    font-weight: bold;

    &:before {
      background-color: ${(props) =>
        getColorRgbaValue(
          props.theme,
          "Steps",
          props.color,
          "enabled",
          "activeBackground"
        )};
    }

    &:after {
      background-color: ${(props) =>
        getColorRgbaValue(
          props.theme,
          "Steps",
          props.color,
          "enabled",
          "background"
        )};
    }
  }

  &.medium {
    &:first-child {
      &:after {
        content: none;
      }
    }
  }

  &.small {
    &:first-child {
      &:after {
        content: none;
      }
    }

    &:before {
      width: 1.5rem;
      height: 1.5rem;
      font-size: 1rem;
    }

    &:after {
      height: 0.25rem;
      top: 0.65rem;
    }

    &.vertical {
      min-height: 3rem;

      &:after {
        left: 0.65rem;
        width: 0.25rem;
      }
    }
  }

  &.large {
    &:first-child {
      &:after {
        content: none;
      }
    }

    &:before {
      width: 2.5rem;
      height: 2.5rem;
      font-size: 1.5rem;
    }

    &:after {
      height: 0.75rem;
      top: 0.85rem;
    }

    &.vertical {
      min-height: 5rem;

      &:after {
        left: 0.85rem;
        width: 0.75rem;
      }
    }
  }

  &.vertical {
    flex: none;
    padding: 0;
    margin-left: 0;
    min-height: 4em;
    text-align: left;
    clear: both;

    span {
      white-space: nowrap;
    }

    &:before {
      display: inline-flex;
      margin-left: 0;
      margin-right: 0.5rem;
      float: none;
      text-align: center;
    }

    &:after {
      position: absolute;
      left: 0.75rem;
      top: -75%;
      width: 0.5rem;
      height: 100%;
      z-index: -1;
      content: "";
    }
  }
`;
