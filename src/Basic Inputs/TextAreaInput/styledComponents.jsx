import styled from "@emotion/styled";
import {
  getBorderRadiusValueWithUnits,
  getColorRgbaValue,
  getComponentTypographyCss,
  getDisabledStateCss,
  getOutlineCss,
  getSizeValueWithUnits,
} from "../../_utils/utils";

export const StyledTextareaWrapper = styled.div`
  & textarea {
    ${(props) =>
      getComponentTypographyCss(props.theme, "Input", props.size, "enabled")}
    min-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
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
          props.disabled === true ? "disabled" : "enabled",
          "border"
        )};
    border-radius: ${(props) =>
      getBorderRadiusValueWithUnits(props.theme, "regular")};
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
    overflow: ${(props) =>
      props.collapseOnBlur && props.focused === false ? "hidden" : "auto"};
    transition: height 0.2s ease-out;
    padding: 0.563rem 0.75rem;
    min-width: 100%;
    max-width: 100%;
  }

  & textarea::placeholder {
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Input",
        props.color,
        "enabled",
        "placeholder"
      )};
  }

  & textarea:read-only {
    cursor: default;
  }

  & textarea:focus {
    ${(props) =>
      props.readOnly !== true ? getOutlineCss(props.theme) : "outline: none"}
  }

  & textarea:disabled {
    /* ${(props) => getDisabledStateCss(props.theme)}
     */
    ${(props) => `background-color: ${getColorRgbaValue(
      props.theme,
      "Input",
      props.color,
      "disabled",
      "background",
      "backgroundOpacity"
    )};
        color: ${(props) =>
          getColorRgbaValue(
            props.theme,
            "Input",
            props.color,
            "disabled",
            "text"
          )};`}
  }
`;
