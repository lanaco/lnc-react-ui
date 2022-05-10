import moment from "moment";
import React from "react";

import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../_utils/theme";
import DatePicker from "react-date-picker";
import "./style.css";

const paddingBySize = (size) => {
  return {
    small: "0.3125rem 0 0.1875rem 0.125rem",
    medium: "0.48125rem 0.0625rem 0.29375rem 0.21875rem",
    large: "0.59375rem 0.125rem 0.35625rem 0.28125rem",
  }[size];
};

const heightBySize = (size) => {
  return { small: `1.625rem`, medium: `2rem`, large: `2.375rem` }[size];
};

const Container = styled.div`
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

const DateInput = React.forwardRef((props, ref) => {
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
    min,
    max,
    onFocus,
    onBlur,
  } = props;

  const getDateValue = (val) => {
    if (val === undefined || !val) return null;

    return new Date(moment(val, dateFormat));
  };

  const handleOnChange = (dateString) => {
    if (dateString === null) {
      console.log("CHANGE: ");
      return "";
    }

    console.log("CHANGE: ", moment(dateString).format(dateFormat));
    onChange(id, moment(dateString).format(dateFormat));
  };

  const displayDateFormat = () => {
    return dateFormat.replaceAll("D", "d").replaceAll("Y", "y");
  };

  return (
    <Container {...{ theme, size, color }} className={className}>
      <DatePicker
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        format={displayDateFormat()}
        openCalendarOnFocus={openCalendarOnFocus}
        onChange={handleOnChange}
        value={getDateValue(value)}
        clearIcon={null}
        maxDate={getDateValue(max)}
        minDate={getDateValue(min)}
        calendarIcon={
          <Icon {...{ theme, size, color }} className="fas fa-calendar fa-fw" />
        }
      />
    </Container>
  );
});

DateInput.defaultProps = {
  id: "",
  theme: theme,
  disabled: false,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  className: "",
  preventDefault: true,
  size: "small",
  color: "primary",
  value: "",
  dateFormat: "DD.MM.YYYY.",
  max: new Date(2099, 1, 1),
  min: null,
};

DateInput.propTypes = {
  theme: PropTypes.object.isRequired,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  preventDefault: PropTypes.bool,
  value: PropTypes.string,
  dateFormat: PropTypes.string,
  max: PropTypes.object,
  min: PropTypes.object,
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
