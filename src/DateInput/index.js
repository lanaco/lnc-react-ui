import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../_utils/theme";
import moment from "moment";
import Calendar from "react-calendar";
import { isEmpty, isNumber, isArray } from "lodash";
import "./style.css";

const validFormats = [
  "dd.mm.yyyy",
  "dd/mm/yyyy",
  "dd-mm-yyyy",

  "d.mm.yyyy",
  "d/mm/yyyy",
  "d-mm-yyyy",

  "dd.m.yyyy",
  "dd/m/yyyy",
  "dd-m-yyyy",

  "d.m.yyyy",
  "d/m/yyyy",
  "d-m-yyyy",

  //--------------------

  "mm.dd.yyyy",
  "mm/dd/yyyy",
  "mm-dd-yyyy",

  "m.dd.yyyy",
  "m/dd/yyyy",
  "m-dd-yyyy",

  "mm.d.yyyy",
  "mm/d/yyyy",
  "mm-d-yyyy",

  "m.d.yyyy",
  "m/d/yyyy",
  "m-d-yyyy",

  //--------------------

  "yyyy.mm.dd",
  "yyyy/mm/dd",
  "yyyy-mm-dd",

  "yyyy.m.dd",
  "yyyy/m/dd",
  "yyyy-m-dd",

  "yyyy.mm.d",
  "yyyy/mm/d",
  "yyyy-mm-d",

  "yyyy.m.d",
  "yyyy/m/d",
  "yyyy-m-d",
];

const heightBySize = (size) => {
  return { small: `1.5rem`, medium: `1.875rem`, large: `2.25rem` }[size];
};

const calendarOffsetBySize = (size) => {
  return { small: `1.675rem`, medium: `2.05rem`, large: `2.425rem` }[size];
};

const paddingBySize = (size) => {
  if (size === "small") return "0.325rem 0.375rem";
  if (size === "medium") return "0.3875rem 0.375rem";
  if (size === "large") return "0.422375rem 0.375rem";
};

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  border-radius: 0.125rem;
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  font-family: ${(props) => props.theme.typography.fontFamily};
  color: ${(props) => props.theme.palette[props.color].dark};

  background-color: ${(props) =>
    props.disabled
      ? props.theme.palette.gray[200]
      : props.theme.palette[props.color].lighter};
  border-bottom: 0.125rem solid
    ${(props) =>
      props.disabled
        ? props.theme.palette.gray[900]
        : props.theme.palette[props.color].main};

  min-height: ${(props) => heightBySize(props.size)};
  max-height: ${(props) => heightBySize(props.size)};

  & .react-calendar {
    border-radius: 0.2rem;
    font-size: ${(props) => props.theme.typography[props.size].fontSize};
    font-family: ${(props) => props.theme.typography.fontFamily};
    border: 0.0625rem solid ${(props) => props.theme.palette[props.color].main};
  }

  & .react-calendar__navigation__arrow,
  .react-calendar__navigation__label {
    transition: all 220ms ease;
    border-radius: 0.1875rem;
  }

  & .react-calendar__navigation__label {
    font-size: ${(props) => props.theme.typography[props.size].fontSize};
    font-family: ${(props) => props.theme.typography.fontFamily};
  }

  & .react-calendar__month-view__weekdays__weekday {
    color: ${(props) => props.theme.palette[props.color].main};
    font-size: ${(props) => props.theme.typography[props.size].fontSize};
    font-family: ${(props) => props.theme.typography.fontFamily};

    & abbr {
      text-decoration: none;
    }
  }

  & .react-calendar__tile {
    font-size: ${(props) => props.theme.typography[props.size].fontSize};
    font-family: ${(props) => props.theme.typography.fontFamily};
  }

  & .react-calendar__tile--now {
    background: ${(props) => props.theme.palette.secondary.lighter};
  }

  & .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: ${(props) => props.theme.palette.secondary.lighter};
  }

  & .react-calendar__tile--active {
    background: ${(props) => props.theme.palette[props.color].main};
    color: white;
  }

  & .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: ${(props) => props.theme.palette[props.color].light};
  }

  & .react-calendar__tile--hasActive {
    background: ${(props) => props.theme.palette[props.color].main};
    color: ${(props) => props.theme.palette[props.color].text};
  }

  & .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: ${(props) => props.theme.palette[props.color].light};
  }
`;

const Input = styled.input`
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  font-family: ${(props) => props.theme.typography.fontFamily};
  color: ${(props) => props.theme.palette[props.color].textDark};
  appearance: none;
  outline: none;
  border: none;
  box-sizing: border-box;
  width: 100%;
  background-color: ${(props) => props.theme.palette[props.color].lighter};
  padding: ${(props) => paddingBySize(props.size)};
  transition: all 250ms ease;

  &:disabled {
    background-color: ${(props) => props.theme.palette.gray[200]};
    color: ${(props) => props.theme.palette.gray.textLight};
    opacity: 0.7;
    cursor: auto;
  }

  &:focus {
    background-color: ${(props) =>
      props.disabled ? "inherit" : props.theme.palette.common.white};
    color: ${(props) => props.theme.palette.common.black};
  }
`;

const HiddenInput = styled.input`
  position: absolute;
  margin-left: -1000000px;
`;

const CalendarButton = styled.div`
  margin-left: auto;
  cursor: ${(props) => (props.disabled ? "auto" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.3125rem;
`;

const CalendarContainer = styled.div`
  position: absolute;
  top: ${(props) => calendarOffsetBySize(props.size)};
  z-index: 2;
`;

const Icon = styled.i`
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  color: ${(props) =>
    props.disabled
      ? props.theme.palette.gray[900]
      : props.theme.palette[props.color].dark};
`;

const NavigationIcon = styled.i`
  pointer-events: none;
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  color: ${(props) =>
    props.disabled
      ? props.theme.palette.gray[900]
      : props.theme.palette[props.color].dark};
`;

const DateInput = React.forwardRef((props, ref) => {
  const {
    size,
    color,
    theme,
    className,
    disabled,
    onFocus,
    onBlur,
    value,
    format,
    onChange,
    useCalendar,
    minDate,
    maxDate,
  } = props;

  const [date, setDate] = useState(null);
  const [text, setText] = useState("");
  const InputChanged = useRef(false);

  const [openCalendar, setOpenCalendar] = useState(false);

  var inpRef = useRef();

  //===============================================================================

  useEffect(() => {
    if (!validateDateFormat())
      console.error(`Format: ${format} is not supported!`);
  }, []);

  useEffect(() => {
    var jsDate = fromDateStringToJsDate(value);
    setDate(jsDate);
    setText(fromJsDateToDateString(jsDate));
  }, [value]);

  //=============== METHODS ============================================================

  const validateDateFormat = () => {
    var _format = format.toLowerCase();
    var isValid = validFormats.filter((x) => x === _format);

    return isValid;
  };

  const getFormatSeparator = (format) => {
    var separator = "";

    if (format.includes("/")) separator = "/";
    if (format.includes(".")) separator = ".";
    if (format.includes("-")) separator = "-";

    return separator;
  };

  const fromJsDateToDateString = (jsDate) => {
    if (jsDate === null || jsDate == "Invalid Date") return null;

    var _format = validateDateFormat() ? format.toLowerCase() : "yyyy-mm-dd";
    var dateString = "";

    var year = 0;
    var month = 0;
    var day = 0;

    var separator = getFormatSeparator(_format);
    var formatInChunks = _format.split(separator);

    formatInChunks.forEach((chunk) => {
      //
      if (chunk.includes("y")) {
        year = new Date(jsDate).getFullYear();

        if (year < 10) dateString += "000" + year + separator;
        else if (year < 100) dateString += "00" + year + separator;
        else if (year < 1000) dateString += "0" + year + separator;
        else dateString += year + separator;
      }

      if (chunk === "m") {
        month = new Date(jsDate).getMonth() + 1;
        dateString += month + separator;
      }

      if (chunk === "mm") {
        month = new Date(jsDate).getMonth() + 1;

        if (month < 10) dateString += "0" + month + separator;
        else dateString += month + separator;
      }

      if (chunk === "d") {
        day = new Date(jsDate).getDate();
        dateString += day + separator;
      }

      if (chunk === "dd") {
        day = new Date(jsDate).getDate();

        if (day < 10) dateString += "0" + day + separator;
        else dateString += day + separator;
      }
    });

    return dateString.slice(0, -1);
  };

  const fromDateStringToJsDate = (dateString) => {
    if (isEmpty(dateString) || dateString === undefined || dateString === null)
      return null;

    var _format = validateDateFormat() ? format.toLowerCase() : "yyyy-mm-dd";

    var year = 0;
    var month = 0;
    var day = 0;

    var separator = getFormatSeparator(_format);

    var formatInChunks = _format.split(separator);
    var dateStringInChunks = dateString.split(separator);

    formatInChunks.forEach((chunk, index) => {
      if (chunk.includes("y")) {
        year = parseInt(dateStringInChunks[index]);

        if (!isNumber(year)) year = 0;
      }

      if (chunk.includes("m")) {
        month = parseInt(dateStringInChunks[index]);

        if (!isNumber(month)) month = 0;

        if (month > 0) month -= 1;
      }

      if (chunk.includes("d")) {
        day = parseInt(dateStringInChunks[index]);

        if (!isNumber(day)) day = 0;
      }
    });

    if (month > 11) month = 11;

    var daysInMonth = moment(`${year}-${month + 1}`, "YYYY-MM").daysInMonth();
    if (day > daysInMonth) day = daysInMonth;

    if (((year === month) === day) === 0) return null;

    var momentDate = moment().year(year).month(month).date(day);
    var jsDate = new Date(momentDate._d);
    jsDate.setHours(0, 0, 0, 0);

    return jsDate;
  };

  //=============== EVENTS ============================================================

  const toggleCalendar = () => {
    if (!disabled) setOpenCalendar(!openCalendar);
  };

  useEffect(() => {
    if (openCalendar && inpRef && inpRef.current) {
      inpRef.current.focus();
    }
  }, [openCalendar]);

  const handleInputOnChange = (e) => {
    InputChanged.current = true;
    setText(e.target.value);
  };

  const handleInputOnBlur = (e) => {
    var jsDate = null;
    var dateString = "";

    if (text !== "") {
      jsDate = fromDateStringToJsDate(text);
      dateString = fromJsDateToDateString(jsDate);

      if (minDate && minDate !== null && minDate !== undefined) {
        var minJsDate = fromDateStringToJsDate(minDate);

        if (jsDate !== null && jsDate.getTime() < minJsDate.getTime()) {
          jsDate = null;
          dateString = "";
        }
      }

      if (maxDate && maxDate !== null && maxDate !== undefined) {
        var maxJsDate = fromDateStringToJsDate(maxDate);

        if (jsDate !== null && jsDate.getTime() > maxJsDate.getTime()) {
          jsDate = null;
          dateString = "";
        }
      }

      if ((jsDate === null || jsDate == "Invalid Date") && date !== null) {
        jsDate = date;
        dateString = fromJsDateToDateString(date);
      }
    }

    setDate(jsDate);
    setText(dateString);

    if (InputChanged.current && onChange) onChange(e, dateString, jsDate);
    InputChanged.current = false;

    if (onBlur) onBlur(e);
  };

  const handleCalendarOnChange = (date) => {
    var dateString = fromJsDateToDateString(date);

    setText(dateString);
    setDate(date);

    if (InputChanged.current && onChange) onChange(null, dateString, date);
    InputChanged.current = false;

    toggleCalendar();
  };

  const onHiddenInputBlur = (e) => {
    if (
      e.relatedTarget &&
      e.relatedTarget.classList &&
      e.relatedTarget.classList.value.includes("react-calendar")
    ) {
      if (inpRef && inpRef.current) inpRef.current.focus();
    } else {
      setTimeout(() => {
        toggleCalendar();
      }, 80);
    }
  };

  //=============== RENDER ============================================================

  var themeProps = { theme, size, color, disabled };
  var minMaxDate = {};

  if (minDate && minDate !== null && minDate !== undefined) {
    minMaxDate.minDate = fromDateStringToJsDate(minDate);
  }

  if (maxDate && maxDate !== null && maxDate !== undefined) {
    minMaxDate.maxDate = fromDateStringToJsDate(maxDate);
  }

  return (
    <Container {...themeProps} className={className}>
      <Input
        ref={ref}
        {...themeProps}
        type={"text"}
        onChange={handleInputOnChange}
        value={text || ""}
        onBlur={handleInputOnBlur}
        onFocus={onFocus}
        placeholder={validateDateFormat() ? format : "yyyy-mm-dd"}
      />

      {useCalendar && (
        <CalendarButton {...themeProps} onClick={toggleCalendar}>
          <Icon {...themeProps} className="fas fa-calendar fa-fw" />
        </CalendarButton>
      )}

      {useCalendar && openCalendar && (
        <CalendarContainer {...themeProps}>
          <HiddenInput ref={inpRef} onBlur={onHiddenInputBlur} />
          <Calendar
            onChange={handleCalendarOnChange}
            value={date}
            {...minMaxDate}
            prevLabel={
              <NavigationIcon
                {...themeProps}
                className="fas fa-angle-left fa-fw"
              />
            }
            prev2Label={
              <NavigationIcon
                {...themeProps}
                className="fas fa-angle-double-left fa-fw"
              />
            }
            nextLabel={
              <NavigationIcon
                {...themeProps}
                className="fas fa-angle-right fa-fw"
              />
            }
            next2Label={
              <NavigationIcon
                {...themeProps}
                className="fas fa-angle-double-right fa-fw"
              />
            }
          />
        </CalendarContainer>
      )}
    </Container>
  );
});

DateInput.defaultProps = {
  id: "",
  value: "",
  format: "yyyy-mm-dd",
  disabled: false,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  useCalendar: true,
  minDate: "",
  maxDate: "",
  //------------------------------
  theme: theme,
  className: "",
  size: "small",
  color: "primary",
};

DateInput.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  format: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  useCalendar: PropTypes.bool,
  //-----------------------------------------------------------
  theme: PropTypes.object.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "gray",
  ]),
};

export default DateInput;
