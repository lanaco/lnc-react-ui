import moment from "moment";
import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../../_utils/theme";

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
    width: "25%",
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

const PeriodSelector = (props) => {
  const {
    startDate,
    endDate,
    id,
    onStartDateChange,
    onEndDateChange,
    dateFormat,
    disabled,
    size,
    color,
    theme,
    className,
  } = props;

  const [startDateText, setStartDateText] = useState("");
  const [endDateText, setEndDateText] = useState("");
  const [isFirstStartDate, setIsFirstStartDate] = useState(true);
  const [isFirstEndDate, setIsFirstEndDate] = useState(true);

  const callOnStartDateChange = (id, value) => {
    if (onStartDateChange) onStartDateChange(id, value);
  };

  const callOnEndDateChange = (id, value) => {
    if (onEndDateChange) onEndDateChange(id, value);
  };

  const handleStartDateChange = (jsDateObject) => {
    if (jsDateObject === null) callOnStartDateChange(id, "");
    else callOnStartDateChange(id, jsDateObject);
  };

  const handleEndDateChange = (jsDateObject) => {
    if (jsDateObject === null) callOnEndDateChange(id, "");
    else callOnEndDateChange(id, jsDateObject);
  };

  const getStartDate = () => {
    if (startDate === undefined || !startDate) return null;
    return moment(startDate, "DD.MM.YYYY.").toDate();
  };

  const getEndDate = () => {
    if (endDate === undefined || !endDate) return null;
    return moment(endDate, "DD.MM.YYYY.").toDate();
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => handleDelayedOnStartDateChange(), 1500);
    return () => clearTimeout(timeOutId);
  }, [startDateText]);

  useEffect(() => {
    const timeOutId = setTimeout(() => handleDelayedOnEndDateChange(), 1500);
    return () => clearTimeout(timeOutId);
  }, [endDateText]);

  const handleDelayedOnStartDateChange = () => {
    if (!isFirstStartDate) handleStartDateChange(startDateText);

    if (isFirstStartDate) setIsFirstStartDate(false);
  };

  const handleDelayedOnEndDateChange = () => {
    if (!isFirstEndDate) handleEndDateChange(endDateText);

    if (isFirstEndDate) setIsFirstEndDate(false);
  };

  const handleOnStartDateChange = (jsDateObject) => {
    setStartDateText(moment(jsDateObject).format("DD.MM.YYYY."));
  };

  const handleOnEndDateChange = (jsDateObject) => {
    setEndDateText(moment(jsDateObject).format("DD.MM.YYYY."));
  };

  return (
    <Container {...{ theme, size, color }}>
      <DatePicker
        selected={getStartDate()}
        onChange={handleOnStartDateChange}
        dateFormat={dateFormat ? dateFormat : "dd.MM.yyyy."}
        disabled={disabled}
        className={className}
      />{" "}
      <DatePicker
        selected={getEndDate()}
        onChange={handleOnEndDateChange}
        dateFormat={dateFormat ? dateFormat : "dd.MM.yyyy."}
        disabled={disabled}
        className={className}
      />
    </Container>
  );
};

PeriodSelector.defaultProps = {
  id: "",
  theme: theme,
  disabled: false,
  onStartDateChange: () => {},
  onEndDateChange: () => {},
  className: "",
  preventDefault: true,
  size: "small",
  color: "primary",
  startDate: "",
  endDate: "",
  dateFormat: "dd.MM.yyyy.",
};

PeriodSelector.propTypes = {
  theme: PropTypes.object.isRequired,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  onStartDateChange: PropTypes.func,
  onEndDateChange: PropTypes.func,
  className: PropTypes.string,
  preventDefault: PropTypes.bool,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
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

export default PeriodSelector;
