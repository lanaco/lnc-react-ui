/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";

import Modal from "../../../../Utility/Modal/Modal";
import LoanCalculatorModalContentWrapper from "./content-wrapper";
import LoanCalculatorModalHeader from "./header";
import LoanCalculatorModalFooter from "./footer";

const LoanCalculatorModal = forwardRef(
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
      isFixedInterestRate = false,
      minLoanPeriod = 1,
      maxLoanPeriod = 240,
      headerTitleText = "Loan calculator",
      footerTitleText = "Close",
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
      handleCancel = () => {},
    },
    ref,
  ) => {
    const handleCloseModal = () => {
      ref?.current?.close();

      handleCancel();
    };

    return (
      <Modal
        ref={ref}
        header={
          <LoanCalculatorModalHeader
            headerTitleText={headerTitleText}
            handleClick={handleCloseModal}
          />
        }
        footer={
          <LoanCalculatorModalFooter
            footerTitleText={footerTitleText}
            handleClick={handleCloseModal}
          />
        }
        showCloseButton={false}
        className="loan-calculator__modal"
      >
        <LoanCalculatorModalContentWrapper
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
          isFixedInterestRate={isFixedInterestRate}
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
      </Modal>
    );
  },
);

export default LoanCalculatorModal;
