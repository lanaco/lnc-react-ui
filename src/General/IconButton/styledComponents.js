import styled from "@emotion/styled";
import "../../Base/fontawesome/css/fontawesome.css";
import {
  getBorderRadiusValueWithUnits,
  getColorRgbaValue,
  getComponentTypographyCss,
  getDisabledStateCss,
  getOutlineCss,
  getSizeValueWithUnits,
} from "../../_utils/utils";

//=================================================

const commonCss = (props) => {
  return `
        outline: none;
        display: inline-flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border: none;
        transition: all 50  ms ease-in;
        cursor: pointer;
        color: ${!props.disabled && "white"};

        border-radius: ${getBorderRadiusValueWithUnits(
          props.theme,
          props.borderRadius
        )};

        min-width: ${getSizeValueWithUnits(props.theme, props.size)};
        max-width: ${getSizeValueWithUnits(props.theme, props.size)};
    `;
};

export const StyledIcon = styled.i`
  font-size: 1.125rem;
`;

export const FilledButton = styled.button`
  ${(props) => commonCss(props, "ButtonFilled")}

  ${(props) =>
    getComponentTypographyCss(
      props.theme,
      "ButtonFilled",
      props.size,
      "enabled"
    )};

  background-color: ${(props) =>
    !props.disabled &&
    getColorRgbaValue(
      props.theme,
      "ButtonFilled",
      props.color,
      "enabled",
      "background"
    )};

  min-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
  max-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};

  &:disabled {
    ${(props) => props.disabled && getDisabledStateCss(props.theme)};
    cursor: default;
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "ButtonFilled",
        "gray",
        "disabled",
        "background"
      )};
  }

  &:hover {
    background-color: ${(props) =>
      !props.disabled &&
      getColorRgbaValue(
        props.theme,
        "ButtonFilled",
        props.color,
        "hover",
        "background"
      )};
  }

  &:focus {
    background-color: ${(props) =>
      !props.disabled &&
      getColorRgbaValue(
        props.theme,
        "ButtonFilled",
        props.color,
        "focus",
        "background"
      )};

    ${(props) => !props.disabled && getOutlineCss(props.theme)};
  }

  &:active {
    background-color: ${(props) =>
      !props.disabled &&
      getColorRgbaValue(
        props.theme,
        "ButtonFilled",
        props.color,
        "active",
        "background"
      )};
  }
`;

export const TintedButton = styled.button`
  ${(props) => commonCss(props, "ButtonFilled")}

  ${(props) =>
    getComponentTypographyCss(
      props.theme,
      "ButtonTinted",
      props.size,
      "enabled"
    )};

  backdrop-filter: blur(48px);
  color: ${(props) =>
    !props.disabled &&
    getColorRgbaValue(
      props.theme,
      "ButtonTinted",
      props.color,
      "enabled",
      "text"
    )}};

  background-color: ${(props) =>
    !props.disabled &&
    getColorRgbaValue(
      props.theme,
      "ButtonTinted",
      props.color,
      "enabled",
      "background",
      "backgroundOpacity"
    )};

  min-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
  max-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};

  &:disabled {
    ${(props) => props.disabled && getDisabledStateCss(props.theme)};
    cursor: default;
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "ButtonTinted",
        "gray",
        "disabled",
        "background"
      )};
  }

  &:hover {
    background-color: ${(props) =>
      !props.disabled &&
      getColorRgbaValue(
        props.theme,
        "ButtonTinted",
        props.color,
        "hover",
        "background",
        "backgroundOpacity"
      )};
  }

  &:focus {
    background-color: ${(props) =>
      !props.disabled &&
      getColorRgbaValue(
        props.theme,
        "ButtonTinted",
        props.color,
        "focus",
        "background",
        "backgroundOpacity"
      )};

    ${(props) => !props.disabled && getOutlineCss(props.theme)};
  }

  &:active {
    background-color: ${(props) =>
      !props.disabled &&
      getColorRgbaValue(
        props.theme,
        "ButtonTinted",
        props.color,
        "active",
        "background",
        "backgroundOpacity"
      )};
  }
`;

export const BasicButton = styled.button` 
  ${(props) => commonCss(props, "ButtonFilled")}

  ${(props) =>
    getComponentTypographyCss(
      props.theme,
      "ButtonTinted",
      props.size,
      "enabled"
    )};

  color: ${(props) =>
    !props.disabled &&
    getColorRgbaValue(
      props.theme,
      "ButtonBasic",
      props.color,
      "enabled",
      "text"
    )}};

  background-color: ${(props) =>
    !props.disabled &&
    getColorRgbaValue(
      props.theme,
      "ButtonBasic",
      props.color,
      "enabled",
      "background",
      "backgroundOpacity"
    )};

  min-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
  max-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};

  &:disabled {
    ${(props) => props.disabled && getDisabledStateCss(props.theme)};
    cursor: default;
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "ButtonBasic",
        "gray",
        "disabled",
        "background"
      )};
  }

  &:hover {
    background-color: ${(props) =>
      !props.disabled &&
      getColorRgbaValue(
        props.theme,
        "ButtonBasic",
        props.color,
        "hover",
        "background",
        "backgroundOpacity"
      )};
  }

  &:focus {
    background-color: ${(props) =>
      !props.disabled &&
      getColorRgbaValue(
        props.theme,
        "ButtonBasic",
        props.color,
        "focus",
        "background",
        "backgroundOpacity"
      )};

    ${(props) => !props.disabled && getOutlineCss(props.theme)};
  }

  &:active {
    background-color: ${(props) =>
      !props.disabled &&
      getColorRgbaValue(
        props.theme,
        "ButtonBasic",
        props.color,
        "active",
        "background",
        "backgroundOpacity"
      )};
  }
`;

export const OutlineButton = styled(BasicButton)`
  border: 1px solid
    ${(props) =>
      getColorRgbaValue(
        props.theme,
        "ButtonBasic",
        props.color,
        "enabled",
        "border",
        "borderOpacity"
      )};
`;
