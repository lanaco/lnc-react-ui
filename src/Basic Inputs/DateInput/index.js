import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import moment from "moment";
import Calendar from "react-calendar";
import { useTheme } from "@emotion/react";
import "./style.css";

const heightBySize = (size) => {
  return { small: `1.875rem`, medium: `2.25rem`, large: `2.625rem` }[size];
};

const calendarOffsetBySize = (size) => {
  return { small: `2rem`, medium: `2.4rem`, large: `2.8rem` }[size];
};

const paddingBySize = (size) => {
  if (size === "small") return "0.41875rem 0.375rem";
  if (size === "medium") return "0.475rem 0.4rem";
  if (size === "large") return "0.5625rem 0.425rem";
};

const Container = styled.div`
  width: 100%;
  position: relative;
  display: inline-flex;
  border-radius: 0.25rem;
  box-sizing: border-box;
  min-height: ${(props) => heightBySize(props.size)};
  max-height: ${(props) => heightBySize(props.size)};
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  font-family: ${(props) => props.theme.typography.fontFamily};

  color: ${(props) => props.theme.test_palette.dark[500]};

  border: 0.09375rem solid
    ${(props) =>
      props.disabled
        ? props.theme.test_palette.light[400]
        : props.focused
        ? props.theme.test_palette[props.color][400]
        : props.theme.test_palette.light[500]};

  box-shadow: ${(props) =>
    props.focused
      ? "0px 0px 6px -2px " + props.theme.test_palette[props.color][400]
      : "none"};

  &:hover {
    border: 0.09375rem solid
      ${(props) =>
        props.disabled
          ? props.theme.test_palette.light[400]
          : props.theme.test_palette[props.color][400]};
  }

  &:hover i {
    color: ${(props) =>
      props.disabled
        ? props.theme.test_palette.light[400]
        : props.theme.test_palette[props.color][400]};
  }

  & .react-calendar {
    border-radius: 0.2rem;
    font-size: ${(props) => props.theme.typography[props.size].fontSize};
    font-family: ${(props) => props.theme.typography.fontFamily};
    border: 0.0625rem solid
      ${(props) => props.theme.test_palette[props.color][400]};
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
    color: ${(props) => props.theme.test_palette[props.color][400]};
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
    background: ${(props) => props.theme.test_palette.secondary[200]};
  }

  & .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: ${(props) => props.theme.test_palette.secondary[200]};
  }

  & .react-calendar__tile--active {
    background: ${(props) => props.theme.test_palette[props.color][400]};
    color: white;
  }

  & .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: ${(props) => props.theme.test_palette[props.color][300]};
  }

  & .react-calendar__tile--hasActive {
    background: ${(props) => props.theme.test_palette[props.color][400]};
  }

  & .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: ${(props) => props.theme.test_palette[props.color][300]};
  }
`;

const Input = styled.input`
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  font-family: ${(props) => props.theme.typography.fontFamily};
  color: ${(props) => props.theme.test_palette.dark[500]};
  appearance: none;
  outline: none;
  border: none;
  box-sizing: border-box;
  width: 100%;

  padding: ${(props) => paddingBySize(props.size)};
  transition: all 250ms ease;

  &:disabled {
    color: ${(props) => props.theme.test_palette.light[500]};
    background-color: white;
    cursor: auto;
  }
`;

const HiddenInput = styled.input`
  position: absolute;
  margin-left: -1000000px;
`;

const CalendarButton = styled.div`
  margin-left: auto;
  cursor: ${(props) => (props.disabled || props.readOnly ? "auto" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0
    ${(props) =>
      ({ small: "0.4rem", medium: "0.5rem", large: "0.6rem" }[props.size])};
`;

const CalendarContainer = styled.div`
  position: absolute;
  top: ${(props) => calendarOffsetBySize(props.size)};
  z-index: 5;
`;

const Icon = styled.i`
  font-size: ${(props) => props.theme.typography[props.size].fontSize};

  color: ${(props) =>
    props.disabled
      ? props.theme.test_palette.light[400]
      : props.focused
      ? props.theme.test_palette[props.color][400]
      : props.theme.test_palette.light[500]};
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
    className,
    style,
    disabled,
    readOnly,
    onFocus,
    onBlur,
    value,
    format,
    tabIndex,
    onChange,
    useCalendar,
    minDate,
    maxDate,
    ...rest
  } = props;

  const theme = useTheme();

  const [date, setDate] = useState(null);
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);
  const InputChanged = useRef(false);

  const [openCalendar, setOpenCalendar] = useState(false);

  var inpRef = useRef();

  //===================================================================================

  useEffect(() => {
    if (value !== "" && !isIsoDate(value))
      console.error("Date value is not in ISO8601 format!");

    var formatedDate = isoToUserFormat(value);

    setText(formatedDate);
    setDate(formatedDate !== "" ? new Date(value) : null);
  }, [value]);

  //=============== METHODS ===========================================================

  const jsDateToIso = (jsDate) => {
    return jsDate.toISOString().substr(0, 10);
  };

  const isoToUserFormat = (isoDate) => {
    if (isoDate === "") return "";

    var formatedDate = moment(isoDate, moment.ISO_8601, true).format(format);

    if (formatedDate === "Invalid date") return "";
    return formatedDate;
  };

  const userFormatToIso = (userFormat) => {
    var isoDate = "";

    try {
      isoDate = moment(userFormat, format, true).format("YYYY-MM-DD");

      if (!isIsoDate(isoDate)) isDate = "";
    } catch (e) {
      return "";
    }

    if (isoDate === "Invalid date") return "";
    return isoDate;
  };

  const isIsoDate = (str) => {
    return moment(str, moment.ISO_8601, true).isValid();
  };

  const checkMinMaxDate = (value) => {
    var isInMinRange = true;
    var isInMaxRange = true;

    var jsDate = new Date(value);
    jsDate.setHours(0, 0, 0, 0);

    if (minDate && isIsoDate(minDate)) {
      var minJsDate = new Date(minDate);
      minJsDate.setHours(0, 0, 0, 0);

      isInMinRange = jsDate.getTime() >= minJsDate.getTime();
    }

    if (maxDate && isIsoDate(maxDate)) {
      var maxJsDate = new Date(maxDate);
      maxJsDate.setHours(0, 0, 0, 0);

      isInMaxRange = jsDate.getTime() <= maxJsDate.getTime();
    }

    return isInMinRange && isInMaxRange;
  };

  //=============== EVENTS ============================================================

  const toggleCalendar = () => {
    if (disabled || readOnly) return;

    if (!disabled) setOpenCalendar(!openCalendar);
  };

  useEffect(() => {
    if (openCalendar && inpRef && inpRef.current) {
      inpRef.current.focus();
    }
  }, [openCalendar]);

  const handleInputOnChange = (e) => {
    if (disabled || readOnly) return;

    InputChanged.current = true;
    setText(e.target.value);
  };

  const handleInputOnBlur = (e) => {
    if (disabled || readOnly) {
      setFocused(false);
      return;
    }

    var isoDate = userFormatToIso(text);

    if (text === "" && InputChanged.current && onChange) {
      onChange(null, isoDate, new Date(isoDate));
    }

    var isDateInMinMaxRange = checkMinMaxDate(isoDate);

    if (isoDate !== "" && isDateInMinMaxRange) {
      //
      if (InputChanged.current && onChange) {
        setText(isoToUserFormat(isoDate));
        setDate(new Date(isoDate));
        onChange(null, isoDate, new Date(isoDate));
      }
      //
    } else if (date !== null) {
      //
      isoDate = jsDateToIso(date);
      setText(isoToUserFormat(isoDate));
      //
    } else {
      setText("");
      setDate(null);
    }

    InputChanged.current = false;
    setFocused(false);
    if (onBlur) onBlur(e);
  };

  const handleCalendarOnChange = (date) => {
    if (disabled || readOnly) return;

    var isoDate = jsDateToIso(date);
    var isDateInMinMaxRange = checkMinMaxDate(isoDate);

    if (isoDate !== "" && isDateInMinMaxRange) {
      //
      if (onChange) {
        setText(isoToUserFormat(isoDate));
        setDate(new Date(isoDate));
        onChange(null, isoDate, new Date(isoDate));
      }
      //
    } else if (date !== null) {
      //
      isoDate = jsDateToIso(date);
      setText(isoToUserFormat(isoDate));
      //
    } else {
      setText("");
      setDate(null);
    }

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

  var themeProps = { theme, size, color, disabled, readOnly, focused };

  var minMaxDate = {};

  if (minDate && isIsoDate(minDate)) {
    minMaxDate.minDate = new Date(minDate);
  }

  if (maxDate && isIsoDate(maxDate)) {
    minMaxDate.maxDate = new Date(maxDate);
  }

  return (
    <Container {...themeProps} className={className} style={style}>
      <Input
        ref={ref}
        {...themeProps}
        type={"text"}
        onChange={handleInputOnChange}
        value={text || ""}
        onBlur={handleInputOnBlur}
        onFocus={(e) => {
          setFocused(true);
          if (onFocus) onFocus(e);
        }}
        placeholder={format}
        tabIndex={tabIndex}
        {...rest}
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
  disabled: false,
  readOnly: false,
  useCalendar: true,
  format: "yyyy-mm-dd",
  minDate: "",
  maxDate: "",
  tabIndex: 0,
  //------------------------------
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  //------------------------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
};

DateInput.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  useCalendar: PropTypes.bool,
  format: PropTypes.string,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  tabIndex: PropTypes.number,
  //-----------------------------------------------------------
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  //-----------------------------------------------------------
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
  ]),
};

export default DateInput;
