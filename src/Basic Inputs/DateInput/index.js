import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Calendar from "react-calendar";
import { useTheme } from "@emotion/react";
import "./style.css";
import {
  StyledCalendarButton,
  StyledCalendarContainer,
  StyledContainer,
  StyledHiddenInput,
  StyledInput,
  StyledNavigationIcon,
} from "./styledComponents";
import Icon from "../../General/Icon";

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

  // with time zone can cause problems on some computers, conversion date to iso format can give different day because of time zone
  const isoDateWithoutTimeZone = (date) => {
    if (date == null) return date;
    var timestamp = date.getTime() - date.getTimezoneOffset() * 60000;
    var correctDate = new Date(timestamp);
    // correctDate.setUTCHours(0, 0, 0, 0); // uncomment this if you want to remove the time
    return correctDate.toISOString();
  }

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
        //onChange(null, isoDate, new Date(isoDate));
        onChange(e);
      }
      //
    } else if (date !== null) {
      //
      isoDate = isoDateWithoutTimeZone(date);
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

    var isoDate = isoDateWithoutTimeZone(date);
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
      isoDate = isoDateWithoutTimeZone(date);
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
    <StyledContainer {...themeProps} className={className} style={style}>
      <StyledInput
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
        <StyledCalendarButton {...themeProps} onClick={toggleCalendar}>
          <Icon icon="calendar-days" />
        </StyledCalendarButton>
      )}

      {useCalendar && openCalendar && (
        <StyledCalendarContainer {...themeProps}>
          <StyledHiddenInput ref={inpRef} onBlur={onHiddenInputBlur} />
          <Calendar
            onChange={handleCalendarOnChange}
            value={date}
            {...minMaxDate}
            prevLabel={
              <StyledNavigationIcon
                {...themeProps}
                className="fas fa-angle-left fa-fw"
              />
            }
            prev2Label={
              <StyledNavigationIcon
                {...themeProps}
                className="fas fa-angle-double-left fa-fw"
              />
            }
            nextLabel={
              <StyledNavigationIcon
                {...themeProps}
                className="fas fa-angle-right fa-fw"
              />
            }
            next2Label={
              <StyledNavigationIcon
                {...themeProps}
                className="fas fa-angle-double-right fa-fw"
              />
            }
          />
        </StyledCalendarContainer>
      )}
    </StyledContainer>
  );
});

DateInput.defaultProps = {
  id: "",
  value: "",
  disabled: false,
  readOnly: false,
  useCalendar: true,
  format: "yyyy-MM-DD",
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
    "information",
    "neutral"
  ]),
};

export default DateInput;