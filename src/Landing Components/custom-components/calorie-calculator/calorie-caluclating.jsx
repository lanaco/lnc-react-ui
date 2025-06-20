/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, useRef, useState } from "react";
import { ExternalGridWrapper, GridWrapper } from "./style";
import Button from "../../../General/Button/Button";
import GenderRadioToggle from "../gender-radio-toggle";
import RangeSlider from "../../../Basic Inputs/RangeSlider/RangeSlider";

const CalorieCalculating = forwardRef((props, ref) => {
  const {
    yearsText,
    heightText,
    weightText,
    genderText = "Gender",
    calculateText = "Calculate",
    closeText = "Close calculator",
    onClose = () => {},
    genders = [
      { name: "Male", icon: "mng-lnc-male-02", value: "male" },
      { name: "Female", value: "female", icon: "mng-lnc-female-02" },
    ],

    activityLevels = [
      { name: "Very low", code: "veryLow" },
      { name: "Moderate", code: "moderate" },
      { name: "Very active", code: "veryActive" },
    ],
    activityLevelText,
    goalText,
    goals = [
      { name: "Lose weight", code: "loseWeight", icon: "mng-lnc-weight-scale" },
      { name: "Maintaining", code: "maintaining", icon: "mng-lnc-move" },
      { name: "Gain muscle", code: "gainMuscle", icon: "mng-lnc-muscule" },
    ],
    onCalculate = () => {},
  } = props;

  const dataRef = useRef({
    year: null,
    height: null,
    weight: null,
    gender: genders?.at(0)?.value,
    activityLevel: null,
    goal: null,
  });

  const handleCalculate = () => {
    onCalculate?.(dataRef?.current);
  };

  return (
    <ExternalGridWrapper>
      <GridWrapper className="calorie-calculating">
        <div className="grid-label">{genderText}</div>
        <div>
          <GenderRadioToggle
            items={genders}
            onChange={(e) => (dataRef.current.gender = e)}
          />
        </div>

        <YearCalculting
          text={yearsText}
          onChange={(e) => (dataRef.current.year = e)}
        />

        <HeightCalulating
          text={heightText}
          onChange={(e) => (dataRef.current.height = e)}
        />
        <WeightCalculating
          text={weightText}
          onChange={(e) => (dataRef.current.weight = e)}
        />

        <ActivityLevel
          text={activityLevelText}
          activityLevels={activityLevels}
          onChange={(e) => (dataRef.current.activityLevel = e)}
        />

        <Goal
          text={goalText}
          goals={goals}
          onChange={(e) => (dataRef.current.goal = e)}
        />
      </GridWrapper>
      <div className="btns-footer">
        <Button
          type="button"
          color="neutral"
          size="medium"
          onClick={() => {
            handleCalculate();
          }}
        >
          {calculateText}
        </Button>
        <Button
          type="button"
          btnType="basic"
          color="gray"
          size="medium"
          onClick={() => onClose?.()}
        >
          {closeText}
        </Button>
      </div>
    </ExternalGridWrapper>
  );
});

export default CalorieCalculating;

const YearCalculting = forwardRef((props, ref) => {
  const { text = "Years", onChange = () => {} } = props;

  const [years, setYears] = useState(1);

  return (
    <>
      <div className="grid-label">{text}</div>
      <div className="caluclating-group">
        <RangeSlider
          className="range-input-lnc"
          max={115}
          min={0}
          step={1}
          value={years}
          color="success"
          defaultValue={0}
          onChange={(e) => {
            setYears(e?.target?.value);
            onChange?.(e?.target?.value);
          }}
        />
        <input
          tabIndex={2}
          type={"text"}
          className={"calculating-input"}
          onChange={(e) => {
            if (!isNaN(e?.target?.value) && +e?.target?.value >= 0) {
              setYears(
                e?.target?.value?.length > 1
                  ? e?.target?.value?.replace(/^0+/, "")
                  : e?.target?.value
              );
            }
          }}
          value={years?.toString()}
        />
      </div>
    </>
  );
});

const HeightCalulating = forwardRef((props, ref) => {
  const { text = "Height", unitText = "cm", onChange = () => {} } = props;

  const [height, setHeight] = useState(1);

  return (
    <>
      <div className="grid-label">
        {text}&nbsp;<span className="unit">{`(${unitText})`}</span>
      </div>
      <div className="caluclating-group">
        <RangeSlider
          // ref={ref}
          className="range-input-lnc"
          max={273}
          min={0}
          step={1}
          value={height}
          defaultValue={0}
          color="success"
          onChange={(e) => {
            setHeight(e?.target?.value);
            onChange?.(e?.target?.value);
          }}
        />
        <input
          type={"text"}
          tabIndex={2}
          className={"calculating-input"}
          onChange={(e) => {
            if (!isNaN(e?.target?.value) && +e?.target?.value >= 0) {
              setHeight(
                e?.target?.value?.length > 1
                  ? e?.target?.value?.replace(/^0+/, "")
                  : e?.target?.value
              );
            }
          }}
          value={height?.toString()}
        />
      </div>
    </>
  );
});

const WeightCalculating = forwardRef((props, ref) => {
  const { text = "Weight", unitText = "cm", onChange = () => {} } = props;

  const [weight, setWeight] = useState(1);

  return (
    <>
      <div className="grid-label">
        {text}&nbsp;<span className="unit">{`(${unitText})`}</span>
      </div>
      <div className="caluclating-group">
        <RangeSlider
          className="range-input-lnc"
          max={400}
          min={0}
          step={1}
          value={weight}
          color="success"
          defaultValue={0}
          onChange={(e) => {
            setWeight(e?.target?.value);
            onChange?.(e?.target?.value);
          }}
        />
        <input
          tabIndex={2}
          type={"text"}
          className={"calculating-input"}
          onChange={(e) => {
            if (!isNaN(e?.target?.value) && +e?.target?.value >= 0) {
              setWeight(
                e?.target?.value?.length > 1
                  ? e?.target?.value?.replace(/^0+/, "")
                  : e?.target?.value
              );
            }
          }}
          value={weight?.toString()}
        />
      </div>
    </>
  );
});

const ActivityLevel = forwardRef((props, ref) => {
  const {
    text = "Activity level",
    activityLevels,
    onChange = () => {},
  } = props;

  const [activityLevel, setActivityLevel] = useState(null);

  return (
    <>
      <div className="grid-label">{text}</div>
      <div className="caluclating-group">
        {activityLevels?.map((a, index) => (
          <Button
            key={index}
            type="button"
            btnType={activityLevel === a?.code ? "filled" : "tinted"}
            color="neutral"
            borderRadius="curved"
            onClick={() => {
              setActivityLevel(a?.code);
              onChange(a?.code);
            }}
          >
            {a?.name}
          </Button>
        ))}
      </div>
    </>
  );
});

const Goal = forwardRef((props, ref) => {
  const { text = "Goal", goals, onChange = () => {} } = props;

  const [goal, setGoal] = useState(null);

  return (
    <>
      <div className="grid-label">{text}</div>
      <div className="caluclating-group group-activity">
        {goals?.map((a, index) => (
          <Button
            key={index}
            type="button"
            btnType={goal === a?.code ? "filled" : "tinted"}
            color="neutral"
            borderRadius="curved"
            onClick={() => {
              setGoal(a?.code);
              onChange(a?.code);
            }}
          >
            <div className="btn-cnt">
              <i className={a?.icon} />
              <span>{a?.name}</span>
            </div>
          </Button>
        ))}
      </div>
    </>
  );
});
