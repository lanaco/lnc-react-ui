import { forwardRef, useState } from "react";
import { ContainerHeader, Wrapper } from "./style";
import CalorieCalculating from "./calorie-caluclating";
import CalorieCalculatorResults from "./calorie-calculator-results";
import BannerSectionWithList from "../../../landing-page-presentation-sections/banners-sections/banner-section-with-list";
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
    title = "Daily calorie calculator",
    subtitle = "Lorem ipsum dolor sit amet",
    list = [
      "Ovdje može pisati zašto je bitno da znamo kolika nam je dnevna kalorijska potreba.",
      "Ovdje može pisati zašto je bitno da znamo kolikanam je dnevna kalorijska potreba.",
      "From certified dealers from all over Europe",
    ],
    buttonText = "Calculate calorie needs",
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
    <Wrapper>
      <ContainerHeader>
        <div className="header-title">{title}</div>
        <div className="header-subtitle">{subtitle}</div>
      </ContainerHeader>
      {activeStep === 1 && (
        <BannerSectionWithList
          //   title={"Daily calorie calculator"}
          //   subtitle={"Lorem ipsum dolor"}
          buttonText={buttonText}
          onNavigate={() => setActiveStep(2)}
          list={list}
        />
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
