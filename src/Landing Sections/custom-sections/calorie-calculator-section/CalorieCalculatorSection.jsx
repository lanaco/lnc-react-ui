/* eslint-disable react/display-name */
import { forwardRef } from "react";
import CalorieCalculator from "../../../Landing Components/custom-components/calorie-calculator";

const CalorieCalculatorSection = forwardRef((props, ref) => {
  return <CalorieCalculator ref={ref} {...props} />;
});

export default CalorieCalculatorSection;
