import styled from "@emotion/styled";
import {
  getColorRgbaValue,
  getComponentTypographyCss,
} from "../../_utils/utils";

export const Styled_DatePickerWrapper = styled.div`
  ${(props) =>
    getComponentTypographyCss(props.theme, "DateInput", props.size, "enabled")}
  & .react-datepicker__header__dropdown {
    position: absolute !important;
    z-index: 30;
    top: 1.3rem;
    font-size: 1rem;
    width: 100%;
    @media (max-width: 725px) {
      width: ${(props) => (props.monthsShown > 1 ? "200%" : "100%")};
    }
    @media (max-width: 550px) {
      width: 100%;
    }
  }
  & input {
    border: none;
    outline: none;
    ${(props) =>
      getComponentTypographyCss(
        props.theme,
        "DateInput",
        props.size,
        "enabled"
      )}
  }
  & .react-datepicker {
    position: relative;
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "DateInput",
        props.color,
        "enabled",
        "background"
      )};
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "DateInput",
        props.color,
        "enabled",
        "text"
      )};
    border: none;
    box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1),
      0px 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-radius: 16px;
  }
  & .react-datepicker__day {
    min-width: 2rem;
    width: ${(p) => (p.withPortal === true ? "2.75rem" : "2.25rem")};
    height: ${(p) => (p.withPortal === true ? "2.75rem" : "2.25rem")};
  }
  & .react-datepicker__month-read-view--down-arrow,
  .react-datepicker__year-read-view--down-arrow {
    display: none;
  }
  & .react-datepicker__day--today {
    border: 1px solid
      ${(props) =>
        getColorRgbaValue(
          props.theme,
          "DateInput",
          props.color,
          "enabled",
          "today"
        )};
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "DateInput",
        props.color,
        "enabled",
        "today"
      )} !important;
    border-radius: 8px;
  }
  & .react-datepicker__current-month,
  & .react-datepicker-time__header,
  & .react-datepicker-year-header {
    padding: 0.875rem 0 0 0;
    font-size: 1rem;
    font-weight: 400;
  }
  & .react-datepicker__day--outside-month {
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "DateInput",
        props.color,
        "enabled",
        "textWeekDays"
      )} !important;
    background-color: transparent !important;
  }
  & .react-datepicker__header {
    border-radius: 8px 8px 0 0;
    background-color: transparent;
    border-bottom: 1px solid transparent;
    font-size: 1rem;
  }
  & .react-datepicker__day-names {
    margin-top: 3.5rem;
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "DateInput",
        props.color,
        "enabled",
        "textWeekDays"
      )} !important;
  }
  & .react-datepicker__day-name,
  & .react-datepicker__day,
  & .react-datepicker__time-name {
    color: var(--primary);
    font-size: 1rem;
    min-width: 2rem;
    padding: ${(p) => (p.withPortal === true ? "0" : "0.3rem")};
  }
  & .react-datepicker__day-name {
    line-height: 0;
  }
  & .react-datepicker__day--keyboard-selected:hover,
  & .react-datepicker__month-text--keyboard-selected:hover,
  & .react-datepicker__quarter-text--keyboard-selected:hover,
  & .react-datepicker__year-text--keyboard-selected:hover,
  & .react-datepicker__day:hover {
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "DateInput",
        props.color,
        "hover",
        "background",
        "backgroundOpacity"
      )};
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "DateInput",
        props.color,
        "hover",
        "text"
      )};
  }
  & .react-datepicker__year-dropdown,
  & .react-datepicker__month-dropdown,
  & .react-datepicker__month-year-dropdown {
    font-size: 1rem;
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "DateInput",
        props.color,
        "enabled",
        "background"
      )};
  }

  & .react-datepicker__year-dropdown,
  & .react-datepicker__month-dropdown,
  & .react-datepicker__month-year-dropdown {
    width: 100%;
    left: 0%;
    display: flex;
    flex-wrap: wrap;
    border: 1px solid transparent;
    box-shadow: 0px 0px 20px rgba(65, 43, 118, 0.1);
    border-radius: 8px;
    padding: 4px;
  }

  & .react-datepicker__year-option,
  & .react-datepicker__month-year-option {
    width: 33.33%;
    margin-left: 0;
    padding: 0.45rem;
    margin-right: 0;
  }
  & .react-datepicker__month-option {
    width: 50%;
    margin-left: 0;
    padding: 0.45rem;
    margin-right: 0;
  }
  & .react-datepicker__year-option:hover,
  & .react-datepicker__month-option:hover,
  & .react-datepicker__month-year-option:hover {
    border-radius: 8px;
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "DateInput",
        props.color,
        "hover",
        "text"
      )};
    border-radius: 8px;
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "DateInput",
        props.color,
        "hover",
        "background",
        "backgroundOpacity"
      )};
  }

  & .react-datepicker__year-option:nth-of-type(1),
  & .react-datepicker__month-year-option:nth-of-type(1),
  & .react-datepicker__year-option:last-of-type,
  & .react-datepicker__month-year-option:last-of-type {
    width: 100%;
  }

  & .react-datepicker__year-option--selected,
  & .react-datepicker__month-option--selected,
  & .react-datepicker__month-year-option--selected {
    position: unset;
  }

  & .react-datepicker__year-option--selected_year {
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "DateInput",
        props.color,
        "active",
        "text"
      )};
    border-radius: 8px;
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "DateInput",
        props.color,
        "active",
        "background"
      )};
  }

  & .react-datepicker__year-option--selected,
  & .react-datepicker__month-option--selected {
    display: none;
  }

  &
    .react-datepicker__navigation--years.react-datepicker__navigation--years-upcoming {
    top: -4px;
    border-bottom-color: #ccc;
  }
  & .react-datepicker__year-read-view,
  & .react-datepicker__month-read-view,
  & .react-datepicker__month-year-read-view {
    color: transparent;
  }

  &
    .react-datepicker__navigation--years.react-datepicker__navigation--years-previous {
    top: 4px;
    border-top-color: #ccc;
  }

  & .react-datepicker__navigation--years {
    background: none;
    line-height: 1.7rem;
    text-align: center;
    cursor: pointer;
    padding: 0;
    border: 0.45rem solid transparent;
    z-index: 1;
    height: 10px;
    width: 10px;
    text-indent: -999em;
    overflow: hidden;
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  & .react-datepicker__year-read-view--down-arrow,
  & .react-datepicker__month-read-view--down-arrow,
  & .react-datepicker__month-year-read-view--down-arrow,
  & .react-datepicker__navigation-icon::before {
    border-width: 1px 1px 0 0;
  }
  & .react-datepicker__navigation {
    top: 1rem;
    z-index: 40;
  }
  & .react-datepicker__year-read-view--down-arrow,
  & .react-datepicker__month-read-view--down-arrow,
  & .react-datepicker__month-year-read-view--down-arrow {
    top: 4px;
    border-color: transparent;
    padding: 4px;
  }
  & .react-datepicker__year-read-view--down-arrow,
  & .react-datepicker__month-read-view--down-arrow,
  & .react-datepicker__month-year-read-view--down-arrow,
  & .react-datepicker__navigation-icon::before {
    border-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "DateInput",
        props.color,
        "enabled",
        "textWeekDays"
      )};
  }
  & .react-datepicker__header--time {
    border-bottom: none;
  }
  & .react-datepicker__time {
    ${(props) =>
      getComponentTypographyCss(
        props.theme,
        "DateInput",
        props.size,
        "enabled"
      )}
    background-color: var(--primary-100) !important;
    font-size: 0.9rem;
  }
  &
    .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item:hover {
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "DateInput",
        props.color,
        "hover",
        "text"
      )};
    border-radius: 8px;
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "DateInput",
        props.color,
        "hover",
        "background",
        "backgroundOpacity"
      )};
  }
  &
    .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--selected {
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "DateInput",
        props.color,
        "active",
        "text"
      )};
    border-radius: 8px;
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "DateInput",
        props.color,
        "active",
        "background"
      )};
  }
  &
    .react-datepicker__navigation--years.react-datepicker__navigation--years-upcoming {
    border-bottom-color: var(--primary);
  }
  &
    .react-datepicker__navigation--years.react-datepicker__navigation--years-previous {
    border-top-color: var(--primary);
  }
  & .react-datepicker-popper[data-placement^="bottom"] {
    padding-top: 0;
  }
  & .react-datepicker__day--selected,
  & .react-datepicker__day--in-selecting-range,
  & .react-datepicker__day--in-range,
  & .react-datepicker__month-text--selected,
  & .react-datepicker__month-text--in-selecting-range,
  & .react-datepicker__month-text--in-range,
  & .react-datepicker__quarter-text--selected,
  & .react-datepicker__quarter-text--in-selecting-range,
  & .react-datepicker__quarter-text--in-range,
  & .react-datepicker__year-text--selected,
  & .react-datepicker__year-text--in-selecting-range,
  & .react-datepicker__year-text--in-range {
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "DateInput",
        props.color,
        "active",
        "background"
      )};
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "DateInput",
        props.color,
        "active",
        "text"
      )};
    border: none;
  }
  &
    .react-datepicker__day--in-selecting-range:not(.react-datepicker__day--in-range, .react-datepicker__day--selecting-range-start, .react-datepicker__day--selecting-range-end, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--in-range),
  &
    .react-datepicker__month-text--in-selecting-range:not(.react-datepicker__day--in-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--in-range),
  &
    .react-datepicker__quarter-text--in-selecting-range:not(.react-datepicker__day--in-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--in-range),
  &
    .react-datepicker__year-text--in-selecting-range:not(.react-datepicker__day--in-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--in-range) {
    border-radius: 8px;
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "DateInput",
        props.color,
        "hover",
        "background",
        "backgroundOpacity"
      )};
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "DateInput",
        props.color,
        "hover",
        "text"
      )};
  }
  & .react-datepicker__day--selecting-range-start,
  & .react-datepicker__day--selecting-range-end {
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "DateInput",
        props.color,
        "active",
        "background"
      )};
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "DateInput",
        props.color,
        "active",
        "text"
      )};
  }

  & .react-datepicker__day--keyboard-selected {
    background-color: transparent;
  }

  & .react-datepicker__day--disabled {
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "DateInput",
        props.color,
        "disabled",
        "background"
      )};
    color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "DateInput",
        props.color,
        "disabled",
        "text"
      )};

    &:hover {
      background-color: ${(props) =>
        getColorRgbaValue(
          props.theme,
          "DateInput",
          props.color,
          "disabled",
          "background"
        )};
      color: ${(props) =>
        getColorRgbaValue(
          props.theme,
          "DateInput",
          props.color,
          "disabled",
          "text"
        )};
    }
  }
`;
