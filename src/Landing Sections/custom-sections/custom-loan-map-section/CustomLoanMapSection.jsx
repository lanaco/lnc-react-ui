/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import { Wrapper } from "./style";
import LocationFinder from "../../../Landing Components/custom-components/location-finder";
import LoanCalculatorSection from "../loan-calculator-section/LoanCalculatorSection";

const CustomLoanMapSection = forwardRef((props, ref) => {
  const {
    hasLoanCalculator,
    hasLocationFinder,
    // Location finder section
    locationFinderTitle,
    locationFinderPlaceholder,
    openMapText,
    onOpenMap = () => {},
    mapFilters,
    inputComponent,
    // Loan calculator section
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

  return (
    <Wrapper ref={ref}>
      {hasLocationFinder === true && (
        <LocationFinder
          title={locationFinderTitle}
          placeholderText={locationFinderPlaceholder}
          onOpenMap={onOpenMap}
          openMapText={openMapText}
          mapFilters={mapFilters}
          inputComponent={inputComponent}
        />
      )}
      {hasLoanCalculator === true && (
        <LoanCalculatorSection
          loanCalculatorTitle={loanCalculatorTitle}
          loanCalculatorText={loanCalculatorText}
          loanCalculatorPlaceholder={loanCalculatorPlaceholder}
          openCalculatorText={openCalculatorText}
          onOpenCalculator={onOpenCalculator}
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
      )}
    </Wrapper>
  );
});

export default CustomLoanMapSection;
