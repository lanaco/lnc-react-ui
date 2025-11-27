import styled from "@emotion/styled";
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
        color: ${!props.disabled === true && "white"};

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
    getColorRgbaValue(
      props.theme,
      "ButtonFilled",
      props.color,
      "enabled",
      "background"
    )};
  color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "ButtonFilled",
      props.color,
      "enabled",
      "text"
    )};

  min-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
  max-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};

  &:hover {
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "ButtonFilled",
        props.color,
        "hover",
        "background"
      )};
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "ButtonFilled",
        props.color,
        "hover",
        "text"
      )};
  }

  &:focus {
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "ButtonFilled",
        props.color,
        "focus",
        "background"
      )};
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "ButtonFilled",
        props.color,
        "focus",
        "text"
      )};

    ${(props) => props.disabled === false && getOutlineCss(props.theme)};
  }

  &:active {
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "ButtonFilled",
        props.color,
        "active",
        "background"
      )};
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "ButtonFilled",
        props.color,
        "active",
        "text"
      )};
  }

  &:disabled {
    ${(props) => props.disabled === true && getDisabledStateCss(props.theme)};
    cursor: default;
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "ButtonFilled",
        props.color,
        "disabled",
        "background"
      )};
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "ButtonFilled",
        props.color,
        "disabled",
        "text"
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
    props.disabled !== true &&
    getColorRgbaValue(
      props.theme,
      "ButtonTinted",
      props.color,
      "enabled",
      "text"
    )};

  background-color: ${(props) =>
    props.disabled !== true &&
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

  &:hover {
    background-color: ${(props) =>
      props.disabled !== true &&
      getColorRgbaValue(
        props.theme,
        "ButtonTinted",
        props.color,
        "hover",
        "background",
        "backgroundOpacity"
      )};
    color: ${(props) =>
      props.disabled !== true &&
      getColorRgbaValue(
        props.theme,
        "ButtonTinted",
        props.color,
        "hover",
        "text"
      )};
  }

  &:focus {
    background-color: ${(props) =>
      props.disabled !== true &&
      getColorRgbaValue(
        props.theme,
        "ButtonTinted",
        props.color,
        "focus",
        "background",
        "backgroundOpacity"
      )};
    color: ${(props) =>
      props.disabled !== true &&
      getColorRgbaValue(
        props.theme,
        "ButtonTinted",
        props.color,
        "focus",
        "text"
      )};
    ${(props) => props.disabled === false && getOutlineCss(props.theme)};
  }

  &:active {
    background-color: ${(props) =>
      props.disabled !== true &&
      getColorRgbaValue(
        props.theme,
        "ButtonTinted",
        props.color,
        "active",
        "background",
        "backgroundOpacity"
      )};
    color: ${(props) =>
      props.disabled !== true &&
      getColorRgbaValue(
        props.theme,
        "ButtonTinted",
        props.color,
        "active",
        "text"
      )};
  }
  &:disabled {
    ${(props) => props.disabled === true && getDisabledStateCss(props.theme)};
    cursor: default;
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "ButtonTinted",
        props.color,
        "disabled",
        "background",
        "backgroundOpacity"
      )};
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "ButtonTinted",
        props.color,
        "disabled",
        "text"
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
    getColorRgbaValue(
      props.theme,
      "ButtonBasic",
      props.color,
      "enabled",
      "text"
    )};

  background-color: ${(props) =>
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

  &:hover {
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "ButtonBasic",
        props.color,
        "hover",
        "background",
        "backgroundOpacity"
      )};
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "ButtonBasic",
        props.color,
        "hover",
        "text"
      )};
  }

  &:focus {
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "ButtonBasic",
        props.color,
        "focus",
        "background",
        "backgroundOpacity"
      )};
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "ButtonBasic",
        props.color,
        "hover",
        "text"
      )};
    ${(props) => props.disabled === false && getOutlineCss(props.theme)};
  }

  &:active {
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "ButtonBasic",
        props.color,
        "active",
        "background",
        "backgroundOpacity"
      )};
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "ButtonBasic",
        props.color,
        "active",
        "text"
      )};
  }

  &:disabled {
    ${(props) => props.disabled === true && getDisabledStateCss(props.theme)};
    cursor: default;
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "ButtonBasic",
        props.color,
        "disabled",
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
