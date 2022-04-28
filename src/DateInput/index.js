import moment from "moment";
import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../_utils/theme";
import DatePicker from "react-date-picker";
import "./style.css";

const paddingBySize = (size) => {
  if (size === "small") return "0.3125rem 0 0.1875rem 0.125rem";
  if (size === "medium") return "0.48125rem 0.0625rem 0.29375rem 0.21875rem";
  if (size === "large") return "0.59375rem 0.125rem 0.35625rem 0.28125rem";
};

const heightBySize = (size, hasText) => {
  if (size === "small") return `1.625rem`;
  if (size === "medium") return `2rem`;
  if (size === "large") return `2.375rem`;
};

const Container = styled.span((props) => ({
  "& .react-datepicker__triangle": {
    display: "none",
  },

  "& .react-datepicker-wrapper": {
    width: "100%",
    boxSizing: "border-box",
  },

  "& input": {
    appearance: "none",
    outline: "none",
    border: "none",
    borderBottom: `0.125rem solid ${props.theme.palette[props.color].main}`,
    transition: "all 250ms",
    display: "inline-block",
    flexDirection: "row",
    justifyContent: "center",
    cursor: "text",
    width: "100%",
    boxSizing: "border-box",
    minHeight: heightBySize(props.size),
    maxHeight: heightBySize(props.size),
    padding: paddingBySize(props.size),
    fontSize: props.theme.typography[props.size].fontSize,
    backgroundColor: props.theme.palette[props.color].lighter,
    color: props.theme.palette[props.color].textDark,
    borderRadius: "0.125rem",
    fontFamily: props.theme.typography.fontFamily,

    "&:focus": {
      backgroundColor: props.theme.palette.common.white,
      color: props.theme.palette.common.black,
    },

    "&:disabled": {
      backgroundColor: props.theme.palette.gray[200],
      borderBottom: `0.125rem solid ${props.theme.palette.gray[900]}`,
      color: props.theme.palette.gray.textLight,
      opacity: 0.7,
      cursor: "default",
    },
  },
}));

const AltContainer = styled.div`
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: ${(props) => heightBySize(props.size)};
  max-height: ${(props) => heightBySize(props.size)};

  & .react-date-picker__wrapper {
    padding: ${(props) => paddingBySize(props.size)};

    background-color: ${(props) => props.theme.palette[props.color].lighter};
    border-radius: 0.125rem;
    border-bottom: 0.125rem solid
      ${(props) => props.theme.palette[props.color].main};

    & button {
      padding: 0 0.125rem;
    }
  }

  & .react-calendar {
    border-radius: 0.125rem;
    border: 0.0625rem solid ${(props) => props.theme.palette[props.color].main};
  }

  & .react-calendar__month-view__weekdays__weekday {
    color: ${(props) => props.theme.palette[props.color].main};
  }
`;

const Icon = styled.i`
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  color: ${(props) => props.theme.palette[props.color].dark};
`;

const DateInput = (props) => {
  const {
    value,
    id,
    onChange,
    dateFormat,
    disabled,
    openCalendarOnFocus = false,
    size,
    color,
    theme,
    className,
    preventDefault,
  } = props;

  const getValue = () => {
    if (value === undefined || !value) return null;

    console.log("bbbb: ", new Date(moment(value, dateFormat)));

    return new Date(moment(value, dateFormat));
  };

  const handleOnChange = (dateString) => {
    if (dateString === null) return "";

    console.log(dateString);

    onChange(id, moment(dateString).format(dateFormat));
  };

  const displayDateFormat = () => {
    return dateFormat.replaceAll("D", "d").replaceAll("Y", "y");
  };

  return (
    <AltContainer {...{ theme, size, color }} className={className}>
      <DatePicker
        disabled={disabled}
        format={displayDateFormat()}
        openCalendarOnFocus={openCalendarOnFocus}
        onChange={handleOnChange}
        value={getValue()}
        clearIcon={null}
        calendarIcon={
          <Icon {...{ theme, size, color }} className="fas fa-calendar fa-fw" />
        }
      />
    </AltContainer>
  );
};

DateInput.defaultProps = {
  id: "",
  theme: theme,
  disabled: false,
  onChange: () => {},
  className: "",
  preventDefault: true,
  size: "small",
  color: "primary",
  value: "",
  dateFormat: "DD.MM.YYYY.",
};

DateInput.propTypes = {
  theme: PropTypes.object.isRequired,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  preventDefault: PropTypes.bool,
  value: PropTypes.string,
  dateFormat: PropTypes.string,
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
