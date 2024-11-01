import styled from "@emotion/styled";
import {
  getBorderRadiusValueWithUnits,
  getColorRgbaValue,
  getComponentTypographyCss,
  getDisabledStateCss,
  getOutlineCss,
  getSizeValueWithUnits,
} from "../../_utils/utils";

export const StyledWrapper = styled.div`
  display: flex;
  align-items: center;

  min-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
  max-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
  background-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Input",
      props.color,
      "enabled",
      "background"
    )};
  border: 1px solid
    ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Input",
        props.focused === true ? "primary" : props.color,
        "enabled",
        "border"
      )};
  border-radius: ${(props) =>
    getBorderRadiusValueWithUnits(props.theme, "regular")};

  ${(props) =>
    props.focused === true && props.readOnly !== true
      ? getOutlineCss(props.theme)
      : ""}
  ${(props) => (props.isDisabled === true ? getDisabledStateCss(props.theme) : "")}
  ${(props) =>
    props.isDisabled === true
      ? "border: 1px solid " +
        getColorRgbaValue(
          props.theme,
          "Input",
          props.color,
          "disabled",
          "border"
        )
      : ""}

  & input {
    background: none;
    border: none;
    outline: none;
    padding-top: 0.625rem;
    padding-bottom: 0.625rem;
    width: 100%;

    ${(props) =>
      getComponentTypographyCss(props.theme, "Input", props.size, "enabled")}
    min-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
    max-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Input",
        props.focused === true ? "primary" : props.color,
        "enabled",
        "text"
      )};
    caret-color: ${(props) =>
      getColorRgbaValue(props.theme, "Input", props.color, "enabled", "caret")};
    padding-right: ${(props) => (props.suffix ? "0" : "0.75rem")};
    padding-left: ${(props) => (props.prefix ? "0" : "0.75rem")};
  }

  & input:disabled {
    ${(props) => getDisabledStateCss(props.theme)}
    background: none;
  }

  & input:read-only {
    cursor: default;
  }

  & input::placeholder {
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Input",
        props.color,
        "enabled",
        "placeholder"
      )};
  }
`;

export const StyledPrefix = styled.span`
  padding: 0 12px;
  color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Input",
      props.focused === true ? "primary" : props.color,
      "enabled",
      "prefix"
    )};
`;

export const StyledSuffix = styled(StyledPrefix)``;