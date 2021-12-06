import moment from "moment";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "./react-datepicker.css";

import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../_utils/theme";

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

const DateInput = (props) => {
  const {
    value,
    id,
    onChange,
    dateFormat,
    disabled,
    size,
    color,
    theme,
    className,
    preventDefault,
  } = props;

  const [dateText, setDateText] = useState("");
  const [isFirst, setIsFirst] = useState(true);

  const callOnChange = (id, value) => {
    if (onChange) onChange(id, value);
  };

  const handleChange = (jsDateObject) => {
    if (jsDateObject === null) callOnChange(id, "");
    else callOnChange(id, jsDateObject);
  };

  const getValue = () => {
    if (value === undefined || !value) return null;
    return moment(value, "DD.MM.YYYY.").toDate();
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => handleDelayedOnChange(), 350);
    return () => clearTimeout(timeOutId);
  }, [dateText]);

  const handleDelayedOnChange = () => {
    if (!isFirst) handleChange(dateText);

    if (isFirst) setIsFirst(false);
  };

  const handleOnChange = (jsDateObject) => {
    setDateText(moment(jsDateObject).format("DD.MM.YYYY."));
  };

  return (
    <Container {...{ theme, size, color }}>
      <DatePicker
        selected={getValue()}
        onChange={handleOnChange}
        dateFormat={dateFormat ? dateFormat : "dd.MM.yyyy."}
        disabled={disabled}
        className={className}
      />
    </Container>
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
  dateFormat: "dd.MM.yyyy.",
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
