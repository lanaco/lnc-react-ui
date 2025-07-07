/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import LoanCalculator from "../../../Landing Components/custom-components/loan-caluclator";

const CustomLoanMapSection = forwardRef((props, ref) => {
  const {
    loanCalculatorTitle,
    loanCalculatorText,
    loanCalculatorPlaceholder,
    openCalculatorText,
    onOpenCalculator = () => {},
  } = props;

  return (
    <LoanCalculator
      ref={ref}
      title={loanCalculatorTitle}
      text={loanCalculatorText}
      openCalculatorText={openCalculatorText}
      onOpenCalculator={onOpenCalculator}
      placeholderText={loanCalculatorPlaceholder}
    />
  );
});

export default CustomLoanMapSection;
