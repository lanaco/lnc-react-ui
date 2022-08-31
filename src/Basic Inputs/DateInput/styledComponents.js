import styled from "@emotion/styled";
import {
  getBorderRadiusValueWithUnits,
  getColorRgbaValue,
  getComponentTypographyCss,
  getDisabledStateCss,
  getOutlineCss,
  getSizeValueWithUnits,
} from "../../_utils/utils";

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
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
        props.focused ? "primary" : props.color,
        props.disabled ? "disabled" : "enabled",
        "border"
      )};
  border-radius: ${(props) =>
    getBorderRadiusValueWithUnits(props.theme, "regular")};

  ${(props) =>
    props.focused && props.readOnly == false ? getOutlineCss(props.theme) : ""}
  ${(props) => (props.disabled ? getDisabledStateCss(props.theme) : "")}

  & .react-calendar {
    border-radius: 0.2rem;
    font-size: ${(props) =>
      props.theme.typography.component[props.size].fontSize};
    font-family: ${(props) => props.theme.typography.component.fontFamily};
    border: 0.0625rem solid #2dd1d4;
  }

  & .react-calendar__navigation__arrow,
  .react-calendar__navigation__label {
    transition: all 220ms ease;
    border-radius: 0.1875rem;
  }

  & .react-calendar__navigation__label {
    font-size: ${(props) =>
      props.theme.typography.component[props.size].fontSize};
    font-family: ${(props) => props.theme.typography.component.fontFamily};
  }

  & .react-calendar__month-view__weekdays__weekday {
    color: #2dd1d4;
    font-size: ${(props) =>
      props.theme.typography.component[props.size].fontSize};
    font-family: ${(props) => props.theme.typography.component.fontFamily};

    & abbr {
      text-decoration: none;
    }
  }

  & .react-calendar__tile {
    font-size: ${(props) =>
      props.theme.typography.component[props.size].fontSize};
    font-family: ${(props) => props.theme.typography.component.fontFamily};
  }

  & .react-calendar__tile--now {
    background: #adf4f5;
  }

  & .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #adf4f5;
  }

  & .react-calendar__tile--active {
    background: #2dd1d4;
    color: white;
  }

  & .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #73e3e4;
  }

  & .react-calendar__tile--hasActive {
    background: #2dd1d4;
  }

  & .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #73e3e4;
  }
`;

export const StyledInput = styled.input`
  background: none;
  border: none;
  outline: none;
  width: 100%;
  padding: 0.625rem 0.75rem;

  ${(props) =>
    getComponentTypographyCss(props.theme, "Input", props.size, "enabled")}
  min-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
  max-height: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
  color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Input",
      props.focused ? "primary" : props.color,
      "enabled",
      "text"
    )};
  caret-color: ${(props) =>
    getColorRgbaValue(props.theme, "Input", props.color, "enabled", "caret")};

  &::placeholder {
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Input",
        props.color,
        "enabled",
        "placeholder"
      )};
  }

  &:read-only {
    cursor: default;
  }

  &:disabled {
    ${(props) => getDisabledStateCss(props.theme)}
    background: none;
  }
`;

export const StyledHiddenInput = styled.input`
  position: absolute;
  margin-left: -1000000px;
`;

export const StyledCalendarButton = styled.span`
  padding: 0 12px;
  cursor: pointer;
  color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Input",
      props.focused ? "primary" : props.color,
      "enabled",
      "prefix"
    )};
`;

export const StyledCalendarContainer = styled.div`
  position: absolute;
  z-index: 5;
  top: ${(props) => getSizeValueWithUnits(props.theme, props.size)};
`;

export const StyledNavigationIcon = styled.i`
  pointer-events: none;
  font-size: ${(props) =>
    props.theme.typography.component[props.size].fontSize};
  color: ${(props) =>
    getColorRgbaValue(props.theme, "Input", props.color, "enabled", "text")};
`;
