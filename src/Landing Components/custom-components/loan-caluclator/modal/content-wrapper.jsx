import { forwardRef } from "react";

import LoanCalculatorModalContent from "./content";

const LoanCalculatorModalContentWrapper = forwardRef(
  (
    {
      defaultLoanAmount = 20000,
      defaultInterestRate = 5,
      defaultLoanPeriod = 36,
      monthlyPayment = 599,
      totalInterestPaid = 21579,
      currency = "KM",
      loanPeriodUnit = "months",
      minLoanAmount = 1,
      maxLoanAmount = 300000,
      minInterestRate = 1,
      maxInterestRate = 15,
      minLoanPeriod = 1,
      maxLoanPeriod = 240,
      isFixedInterestRate = false,
      loanAmountLabel = "Loan amount",
      loanAmountHint = "Enter the total loan amount you want to borrow.",
      interestRateLabel = "Interest rate",
      interestRateHint = "Enter the annual interest rate for loan.",
      loanPeriodLabel = "Loan period",
      loanPeriodHint = "Enter the duration of the loan in months.",
      submitText = "Calculate",
      summaryMonthlyPaymentText = "Monthly payment",
      summaryMonthlyPaymentHint = "Lorem ipsum dolor sit amet consectetur. Eu eu velit faucibus hendrerit egestas aliquam.",
      summaryTotalPaymentText = "Total interest paid",
      summaryTotalPaymentHint = "Lorem ipsum dolor sit amet consectetur. Sed sed viverra sed lobortis. At eu tellus tristique hac quis.",
      handleSubmit = () => {},
    },
    ref
  ) => {
    return (
      <LoanCalculatorModalContent
        ref={ref}
        defaultLoanAmount={defaultLoanAmount}
        defaultInterestRate={defaultInterestRate}
        defaultLoanPeriod={defaultLoanPeriod}
        monthlyPayment={monthlyPayment}
        totalInterestPaid={totalInterestPaid}
        currency={currency}
        loanPeriodUnit={loanPeriodUnit}
        minLoanAmount={minLoanAmount}
        maxLoanAmount={maxLoanAmount}
        minInterestRate={minInterestRate}
        maxInterestRate={maxInterestRate}
        isFixedInterestRate={isFixedInterestRate}
        minLoanPeriod={minLoanPeriod}
        maxLoanPeriod={maxLoanPeriod}
        loanAmountLabel={loanAmountLabel}
        loanAmountHint={loanAmountHint}
        interestRateLabel={interestRateLabel}
        interestRateHint={interestRateHint}
        loanPeriodLabel={loanPeriodLabel}
        loanPeriodHint={loanPeriodHint}
        submitText={submitText}
        summaryMonthlyPaymentText={summaryMonthlyPaymentText}
        summaryMonthlyPaymentHint={summaryMonthlyPaymentHint}
        summaryTotalPaymentText={summaryTotalPaymentText}
        summaryTotalPaymentHint={summaryTotalPaymentHint}
        handleSubmit={handleSubmit}
      />
    );
  }
);

export default LoanCalculatorModalContentWrapper;
