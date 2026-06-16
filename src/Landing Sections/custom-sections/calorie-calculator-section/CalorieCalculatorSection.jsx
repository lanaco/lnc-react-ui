/* eslint-disable react/display-name */
import { forwardRef } from "react";
import CalorieCalculator from "../../../Landing Components/custom-components/calorie-calculator";

const CalorieCalculatorSection = forwardRef((props, ref) => {
  return (
    <div className="lp-section lp-calorie-calculator-section">
      <CalorieCalculator ref={ref} {...props} />
    </div>
  );
});

export default CalorieCalculatorSection;
