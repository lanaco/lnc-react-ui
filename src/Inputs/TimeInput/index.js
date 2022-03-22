import React, { useEffect, useState } from "react";
import Button from "../../General/Button/index";
import NumberInput from "../../Inputs/NumberInput/index";
import styled from "@emotion/styled";
import FormField from "../../Layout/FormField/index";
import theme from "../../_utils/theme";
import PropTypes from "prop-types";

const Container = styled.div((props) => {
  return {
    gridArea: "timeSpentItem",
    display: "flex",
    columnGap: "2px",
    justifyContent: "start",
  };
});

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
`;

const ButtonWraper = styled.div`
  padding-right: 2%;
`;

const TimeInput = (props) => {
  const {
    id,
    value,
    size,
    color,
    theme,
    className,
    onChange,
    disabled = false,
    step = 1,
  } = props;

  const [val, setVal] = useState(value);
  const [spentHours, setSpentHours] = useState(Math.trunc(props.value));
  const [spentMinutes, setSpentMinutes] = useState(
    Math.trunc((props.value % 1) * 60)
  );

  const stepDecimal = step / 60;
  const stepValue = parseInt(step);

  useEffect(() => {
    setVal(value);
    setSpentHours(Math.trunc(props.value));
    setSpentMinutes(Math.trunc((props.value % 1) * 60));
  }, [value]);

  const ConvertMinutesToDecimal = (newMinutesValue) => {
    let timeSpent = parseFloat(newMinutesValue);
    if (isNaN(timeSpent) || timeSpent === undefined) {
      timeSpent = 0;
    }
    if (!Number.isInteger(timeSpent)) {
      timeSpent = Math.trunc(timeSpent);
    }
    let hoursToAdd = 0;
    if (timeSpent > 60) {
      hoursToAdd = Math.trunc(timeSpent / 60);
      timeSpent %= 60;
    }

    timeSpent = Math.trunc(timeSpent / stepValue) * stepValue;

    let oldTime = val;
    if (oldTime <= stepDecimal) {
      if (
        timeSpent <= stepValue ||
        isNaN(timeSpent) ||
        timeSpent === undefined
      ) {
        timeSpent = stepValue;
      }
    }
    if (oldTime <= 24) {
      let oldHours = Math.trunc(val);
      let newTimeSpent = oldHours + hoursToAdd + timeSpent / 60;
      newTimeSpent = parseFloat(newTimeSpent.toFixed(5));

      if (newTimeSpent > 24) return 24;

      return newTimeSpent;
    }
  };

  const ConvertHoursToDecimal = (newHoursValue) => {
    let timeSpent = parseFloat(newHoursValue);
    if (isNaN(timeSpent) || timeSpent === undefined) {
      timeSpent = 0;
    }
    if (timeSpent >= 24) {
      return 24.0;
    } else if (parseInt(timeSpent) === 0) {
      let oldTime = parseFloat(val);
      if (oldTime % 1 <= stepDecimal) {
        return stepDecimal;
      } else {
        return oldTime % 1;
      }
    } else {
      let oldTime = val;
      let oldDecimalValue = ("" + oldTime).split(".")[1];
      if (oldDecimalValue === undefined || oldDecimalValue === "") {
        oldDecimalValue = "0.0";
      }
      oldDecimalValue = "0." + oldDecimalValue;
      let newTimeSpent = timeSpent + parseFloat(oldDecimalValue);
      newTimeSpent = newTimeSpent.toFixed(2);
      return parseFloat(newTimeSpent);
    }
  };

  const plusButtonClickHandler = () => {
    var time = ConvertMinutesToDecimal(spentMinutes + stepValue);
    setSpentHours(Math.trunc(time));
    setSpentMinutes(Math.round((time % 1) * 60));
    setVal(time);
    onChange(id, time);
  };

  const minusButtonClickHandler = () => {
    var time = ConvertMinutesToDecimal(spentMinutes - stepValue);
    setSpentHours(Math.trunc(time));
    setSpentMinutes(Math.round((time % 1) * 60));
    setVal(time);
    onChange(id, time);
  };

  const minutesChangeHandler = (_, value) => {
    setSpentMinutes(value);
    var time = ConvertMinutesToDecimal(value);

    setTimeout(() => {
      setSpentHours(Math.trunc(time));
      setSpentMinutes(Math.round((time % 1) * 60));
      setVal(time);
    }, 100);

    onChange(id, time);
  };

  const hoursChangeHandler = (_, value) => {
    setSpentHours(value);
    var time = ConvertHoursToDecimal(value);

    setTimeout(() => {
      setSpentHours(Math.trunc(time));
      setSpentMinutes(Math.round((time % 1) * 60));
      setVal(time);
    }, 100);

    onChange(id, time);
  };

  return (
    <Container className={className}>
      <FlexCenter>
        <ButtonWraper>
          <Button
            icon="minus"
            onClick={minusButtonClickHandler}
            disabled={disabled}
            size={size}
            color={color}
            theme={theme}
          ></Button>
        </ButtonWraper>
        <ButtonWraper>
          <Button
            id="addButton"
            icon="plus"
            onClick={plusButtonClickHandler}
            disabled={disabled}
            size={size}
            color={color}
            theme={theme}
          ></Button>
        </ButtonWraper>
      </FlexCenter>
      <FormField label="h" required>
        <NumberInput
          id="timeSpentHours"
          value={spentHours}
          onChange={hoursChangeHandler}
          disabled={disabled}
          size={size}
          color={color}
          theme={theme}
        />
      </FormField>
      <FormField label="min" required>
        <NumberInput
          id="timeSpentMinutes"
          value={spentMinutes}
          onChange={minutesChangeHandler}
          label="min"
          disabled={disabled}
          size={size}
          color={color}
          theme={theme}
        />
      </FormField>
    </Container>
  );
};

TimeInput.defaultProps = {
  id: "",
  theme: theme,
  disabled: false,
  onChange: () => {},
  className: "",
  preventDefault: true,
  size: "small",
  color: "primary",
  value: "",
  step: "",
};

TimeInput.propTypes = {
  theme: PropTypes.object.isRequired,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  value: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf(["primary", "secondary", "gray"]),
  step: PropTypes.string,
};

export default TimeInput;
