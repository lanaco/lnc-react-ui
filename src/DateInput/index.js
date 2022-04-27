import moment from "moment";
import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../_utils/theme";
import DatePicker from "react-date-picker";
import "./style.css";

// Don't know what to do with this :/
// input[type="date"]::-webkit-inner-spin-button {
//   display: none;
//   -webkit-appearance: none;
// }

const paddingBySize = (size) => {
  if (size === "small") return "0.325rem 0.375rem";
  if (size === "medium") return "0.3875rem 0.375rem";
  if (size === "large") return "0.45rem 0.375rem";
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

  & .react-date-picker {
    // border: 1px solid lightgray;
  }

  & .react-date-picker__inputGroup {
    // background-color: #a9d4ff;
  }

  & .react-date-picker__wrapper {
    // max-height: 24px;
    padding: 5px 0px 3px 2px;

    & button {
      padding: 0 2px;
    }
  }
`;

const Icon = styled.i`
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  color: ${(props) => props.theme.palette[props.color].main};
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
    console.log(dateFormat.replaceAll("D", "d").replaceAll("Y", "y"));

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
