import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from "react";
import DateInput from "../DateInput/index";
import theme from "../_utils/theme";

const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  column-gap: 0.25rem;
`;

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
    targetID
  } = props;

  var themeProps = { size, color, theme, disabled };

  return (
    <Container className={className} {...themeProps}>
      <DateInput
        {...themeProps}
        format={dateFormat}
        value={startDate}
        onChange={(_, date) => onStartDateChange(id, date)}
        targetID={targetID}
      />
      <DateInput
        {...themeProps}
        format={dateFormat}
        value={endDate}
        onChange={(_, date) => onEndDateChange(id, date)}
      />
    </Container>
  );
};

PeriodSelector.defaultProps = {
  id: "",
  theme: theme,
  disabled: false,
  onStartDateChange: () => { },
  onEndDateChange: () => { },
  className: "",
  preventDefault: true,
  size: "small",
  color: "primary",
  startDate: "",
  endDate: "",
  dateFormat: "yyyy-mm-dd",
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
