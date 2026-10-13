/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useState } from "react";
import { ContainerHeader, Wrapper } from "./style";
import CalorieCalculating from "./calorie-caluclating";
import CalorieCalculatorResults from "./calorie-calculator-results";
import BannerSectionWithList from "../../../Landing Sections/banners-sections/banner-section-with-list/BannerSectionWithList";
import { calculateCalories } from "../../../_utils/utils";

const CalorieCalculator = forwardRef((props, ref) => {
  const {
    caloriesText,
    carbsText,
    proteinText,
    fatsText,
    calculateAgainText,

    yearsText,
    heightText,
    weightText,
    genderText,
    calculateText,
    closeText,
    genders,
    activityLevels,
    activityLevelText,
    goalText,
    goals,
    // No filler defaults: CMS fields that are empty render nothing.
    title,
    subtitle,
    list = [],
    buttonText,
  } = props;

  const [activeStep, setActiveStep] = useState(1);
  const [resultCalories, setResultCalories] = useState(0);

  const handleCalculate = ({
    gender,
    year,
    height,
    weight,
    activityLevel,
    goal,
  }) => {
    const result = calculateCalories({
      gender,
      age: year,
      heightCm: height,
      weightKg: weight,
      activityLevel,
      goal: goal,
    });

    setResultCalories(result);
    setActiveStep(3);
  };

  return (
    <Wrapper ref={ref}>
      {(title || subtitle) && (
        <ContainerHeader>
          {title && <div className="header-title">{title}</div>}
          {subtitle && <div className="header-subtitle">{subtitle}</div>}
        </ContainerHeader>
      )}
      {activeStep === 1 && (
        <div
          className={`calorie-calculator__intro${
            buttonText ? "" : " calorie-calculator__intro--no-button"
          }`}
        >
          <BannerSectionWithList
            //   title={"Daily calorie calculator"}
            //   subtitle={"Lorem ipsum dolor"}
            buttonText={buttonText}
            onButtonAction={() => {
              setActiveStep(2);
            }}
            list={(list || []).filter(Boolean)}
          />
        </div>
      )}
      {activeStep === 2 && (
        <CalorieCalculating
          yearsText={yearsText}
          heightText={heightText}
          weightText={weightText}
          genderText={genderText}
          calculateText={calculateText}
          closeText={closeText}
          onClose={() => setActiveStep(1)}
          genders={genders}
          activityLevels={activityLevels}
          activityLevelText={activityLevelText}
          goalText={goalText}
          goals={goals}
          onCalculate={handleCalculate}
        />
      )}
      {activeStep === 3 && (
        <CalorieCalculatorResults
          caloriesText={caloriesText}
          carbsText={carbsText}
          proteinText={proteinText}
          fatsText={fatsText}
          calculateAgainText={calculateAgainText}
          onGoBack={() => setActiveStep(2)}
          calories={resultCalories?.calories}
          fats={resultCalories?.fat}
          carbs={resultCalories?.carbs}
          protein={resultCalories?.protein}
        />
      )}
    </Wrapper>
  );
});

export default CalorieCalculator;
