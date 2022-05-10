import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../_utils/theme";
import moment from "moment";
import Calendar from "react-calendar";

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

const Container = styled.div`
  position: relative;
  display: flex;

  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  font-family: ${(props) => props.theme.typography.fontFamily};
`;

const Input = styled.input``;

const CalendarButton = styled.div`
  cursor: pointer;
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
  } = props;

  const [dateValue, setDateValue] = useState(null);

  const [openCalendar, setOpenCalendar] = useState(false);

  //===============================================================================

  useEffect(() => {
    // fromDateStringToJsDate("10.11.2002");

    fromJsDateToDateString(new Date());
  }, []);

  //===============================================================================

  const toggleCalendar = () => setOpenCalendar(!openCalendar);

  const validateDateFormat = () => {
    var _format = format.toLowerCase();
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
    var _format = format.toLowerCase(_format);

    var year = 0;
    var month = 0;
    var day = 0;

    var separator = getFormatSeparator(_format);

    var formatInChunks = _format.split(separator);
    var dateStringInChunks = dateString.split(separator);

    formatInChunks.forEach((chunk, index) => {
      if (chunk.includes("y")) year = parseInt(dateStringInChunks[index]);

      if (chunk.includes("m")) {
        month = parseInt(dateStringInChunks[index]);

        if (month > 0) month -= 1;
      }

      if (chunk.includes("d")) day = parseInt(dateStringInChunks[index]);
    });

    var momentDate = moment().year(year).month(month).date(day);

    return new Date(momentDate._d);
  };

  const dateToPresentationFormat = () => {
    return value;
  };

  const handleInputOnChange = (e) => {};

  const handleCalendarOnChange = (date) => {
    var newDateValue = new Date();

    onChange(null, newDateValue);
    toggleCalendar();
  };

  //===============================================================================

  return (
    <Container {...{ theme, size, color }} className={className}>
      <Input
        type={"text"}
        onChange={handleInputOnChange}
        value={dateToPresentationFormat()}
      />

      <CalendarButton {...{ theme, size, color }} onClick={toggleCalendar}>
        <Icon {...{ theme, size, color }} className="fas fa-calendar fa-fw" />
      </CalendarButton>

      {openCalendar && (
        <CalendarContainer {...{ theme, size, color }}>
          <Calendar
            onChange={handleCalendarOnChange}
            value={fromDateStringToJsDate(value)}
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
