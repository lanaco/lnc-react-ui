import moment from "moment";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./react-datepicker.css";
import BaseContainer from "../Base/BaseContainer";
import { getLighterColor } from "../Base/ColorBlender";
import styles from "./styles.module.css";

import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../_utils/theme";

// Don't know what to do with this :/
// input[type="date"]::-webkit-inner-spin-button {
//   display: none;
//   -webkit-appearance: none;
// }

const Container = styled.span((props) => ({
  "& input": {
    fontFamily: "inherit",
    appearance: "none",
    outline: "none",
    backgroundColor: "var(--color-base-backgroud)",
    transition: "all var(--transition-base-duration)",
    fontSize: "var(--font-size-base)",
    border: "0px",
    borderBottom: "2px solid var(--color-base-blue)",
    height: "100%",
    width: "100%",
    padding: "0px",
    boxSizing: "border-box",

    "&:focus": {
      backgroundColor: "var(--color-base-white)",
    },

    "&:disabled": {
      backgroundColor: "var(--color-base-gray-lighter)",
      color: "var(--color-base-gray-darker)",
      cursor: "inherit",
      borderBottom: "2px solid var(--color-base-gray-darker)",
      opacity: 0.7,
    },
  },
}));

const DateInput = (props) => {
  const {
    value,
    id,
    onChange,
    format,
    disabled,
    size,
    color,
    theme,
    className,
  } = props;

  const callOnChange = (id, value) => {
    if (onChange) onChange(id, value);
  };

  const handleChange = (jsDateObject) => {
    if (jsDateObject === null) callOnChange(id, "");
    else callOnChange(id, moment(jsDateObject).format("DD.MM.YYYY."));
  };

  const getValue = () => {
    if (value === undefined || !value) return null;
    return moment(value, "DD.MM.YYYY.").toDate();
  };

  return (
    <Container>
      <DatePicker
        selected={getValue()}
        onChange={handleChange}
        dateFormat={format ? format : "dd.MM.yyyy."}
        disabled={disabled}
        className={className}
      />
    </Container>
  );
};

export default DateInput;
