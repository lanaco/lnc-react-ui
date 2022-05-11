import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../_utils/theme";
import moment from "moment";
import Calendar from "react-calendar";
import { isEmpty, isNumber } from "lodash";

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
  return { small: `1.625rem`, medium: `2rem`, large: `2.375rem` }[size];
};

const paddingBySize = (size) => {
  if (size === "small") return "0.325rem 0.375rem";
  if (size === "medium") return "0.3875rem 0.375rem";
  if (size === "large") return "0.422375rem 0.375rem";
};

const Container = styled.div`
  width: fit-content;
  position: relative;
  display: flex;

  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  font-family: ${(props) => props.theme.typography.fontFamily};
  color: ${(props) => props.theme.palette[props.color].dark};

  background-color: ${(props) => props.theme.palette[props.color].lighter};
  border-bottom: 0.125rem solid
    ${(props) => props.theme.palette[props.color].main};
`;

const Input = styled.input`
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  font-family: ${(props) => props.theme.typography.fontFamily};
  color: ${(props) => props.theme.palette[props.color].textDark};
  appearance: none;
  outline: none;
  border: none;
  background-color: ${(props) => props.theme.palette[props.color].lighter};
  padding: ${(props) => paddingBySize(props.size)};
`;

const HiddenInput = styled.input`
  position: absolute;
  margin-left: -1000000px;
`;

const CalendarButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
`;

const CalendarContainer = styled.div`
  position: absolute;
  top: 30px;
  z-index: 2;
`;

const Icon = styled.i`
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  color: ${(props) => props.theme.palette[props.color].dark};
`;

const DatePicker = React.forwardRef((props, ref) => {
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
  } = props;

  const [date, setDate] = useState(null);
  const [text, setText] = useState("");

  const [openCalendar, setOpenCalendar] = useState(false);

  var inpRef = useRef();

  //===============================================================================

  useEffect(() => {
    if (!validateDateFormat())
      console.error(`Format: ${format} is not supported!`);
  }, []);

  useEffect(() => {
    setDate(fromDateStringToJsDate(value));
    setText(value);
  }, [value]);

  //=============== METHODS ============================================================

  const validateDateFormat = () => {
    var _format = format.toLowerCase();
    var isValid = validFormats.filter((x) => x === _format);

    return isValid;
  };

  const getFormatSeparator = (format) => {
    // We assume that the format is VALID
    var separator = "";

    if (format.includes("/")) separator = "/";
    if (format.includes(".")) separator = ".";
    if (format.includes("-")) separator = "-";

    return separator;
  };

  const fromJsDateToDateString = (jsDate) => {
    if (jsDate === null || jsDate == "Invalid Date") return null;
    if (!validateDateFormat()) return jsDate;

    var _format = format.toLowerCase(_format);
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
        dateString += year + separator;
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

    if (!validateDateFormat()) return dateString;

    var _format = format.toLowerCase(_format);

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

    if (((year === month) === day) === 0) return null;

    var momentDate = moment().year(year).month(month).date(day);

    return new Date(momentDate._d);
  };

  //=============== EVENTS ============================================================

  const toggleCalendar = () => {
    setOpenCalendar(!openCalendar);
  };

  useEffect(() => {
    if (openCalendar) {
      inpRef.current.focus();
    }
  }, [openCalendar]);

  const handleInputOnChange = (e) => {
    setText(e.target.value);
  };

  const handleInputOnBlur = (e) => {
    var jsDate = null;
    var dateString = "";

    if (text !== "") {
      jsDate = fromDateStringToJsDate(text);
      dateString = fromJsDateToDateString(jsDate);

      if ((jsDate === null || jsDate == "Invalid Date") && date !== null) {
        jsDate = date;
        dateString = fromJsDateToDateString(date);
      }
    }

    setDate(jsDate);
    setText(dateString);
    onChange(e, dateString);

    if (onBlur) onBlur(e);
  };

  const handleCalendarOnChange = (date) => {
    var dateString = fromJsDateToDateString(date);

    setText(dateString);
    setDate(date);

    onChange(null, dateString);
    toggleCalendar();
  };

  //=============== RENDER ============================================================

  return (
    <Container {...{ theme, size, color }} className={className}>
      <Input
        {...{ theme, size, color }}
        type={"text"}
        onChange={handleInputOnChange}
        value={text || ""}
        onBlur={handleInputOnBlur}
      />

      {useCalendar && (
        <CalendarButton {...{ theme, size, color }} onClick={toggleCalendar}>
          <Icon {...{ theme, size, color }} className="fas fa-calendar fa-fw" />
        </CalendarButton>
      )}

      {useCalendar && openCalendar && (
        <CalendarContainer {...{ theme, size, color }}>
          <HiddenInput
            ref={inpRef}
            onBlur={() => {
              setTimeout(() => {
                toggleCalendar();
              }, 80);
            }}
          />
          <Calendar
            onChange={handleCalendarOnChange}
            value={date}
            onFocus={() => console.log("aa")}
          />
        </CalendarContainer>
      )}
    </Container>
  );
});

DatePicker.defaultProps = {
  id: "",
  value: null,
  format: "yyyy-mm-dd",
  disabled: false,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  useCalendar: true,
  //------------------------------
  theme: theme,
  className: "",
  size: "small",
  color: "primary",
};

DatePicker.propTypes = {
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

export default DatePicker;
