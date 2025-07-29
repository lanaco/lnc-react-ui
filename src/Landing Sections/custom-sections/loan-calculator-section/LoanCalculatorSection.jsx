/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, useRef } from "react";

import LoanCalculator from "../../../Landing Components/custom-components/loan-caluclator";
import LoanCalculatorModal from "../../../Landing Components/custom-components/loan-caluclator/modal";

const LoanCalculatorSection = forwardRef((props, ref) => {
  const {
    loanCalculatorTitle,
    loanCalculatorText,
    loanCalculatorPlaceholder,
    openCalculatorText,
    onOpenCalculator = (amount) => {},
    defaultLoanAmount,
    defaultInterestRate,
    defaultLoanPeriod,
    monthlyPayment,
    totalInterestPaid,
    currency,
    loanPeriodUnit,
    minLoanAmount,
    maxLoanAmount,
    minInterestRate,
    maxInterestRate,
    minLoanPeriod,
    maxLoanPeriod,
    headerTitleText,
    footerTitleText,
    loanAmountLabel,
    loanAmountHint,
    interestRateLabel,
    interestRateHint,
    loanPeriodLabel,
    loanPeriodHint,
    submitText,
    summaryMonthlyPaymentText,
    summaryMonthlyPaymentHint,
    summaryTotalPaymentText,
    summaryTotalPaymentHint,
    handleSubmit,
    handleCancel,
  } = props;

  const modalRef = useRef();

  const handleOpenCalculator = (amount) => {
    modalRef?.current?.open();

    onOpenCalculator(amount);
  };

  return (
    <>
      <LoanCalculator
        ref={ref}
        title={loanCalculatorTitle}
        text={loanCalculatorText}
        openCalculatorText={openCalculatorText}
        onOpenCalculator={handleOpenCalculator}
        placeholderText={loanCalculatorPlaceholder}
      />
      <LoanCalculatorModal
        ref={modalRef}
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
        minLoanPeriod={minLoanPeriod}
        maxLoanPeriod={maxLoanPeriod}
        headerTitleText={headerTitleText}
        footerTitleText={footerTitleText}
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
        handleCancel={handleCancel}
      />
    </>
  );
});

export default LoanCalculatorSection;
