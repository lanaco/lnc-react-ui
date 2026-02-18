/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, useState } from "react";

import Button from "../../../../General/Button/Button";
import TextInput from "../../../../Basic Inputs/TextInput/TextInput";
import RangeSlider from "../../../../Basic Inputs/RangeSlider/RangeSlider";

import { Container } from "./style";

const LoanCalculatorModalContent = forwardRef(
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
    ref,
  ) => {
    const [loanAmount, setLoanAmount] = useState(defaultLoanAmount);
    const [interestRate, setInterestRate] = useState(defaultInterestRate);
    const [loanPeriod, setLoanPeriod] = useState(defaultLoanPeriod);

    const handleSelectLoanAmount = (e) => {
      setLoanAmount(+e?.target?.value);
    };

    const handleSelectInterestRate = (e) => {
      setInterestRate(+e?.target?.value);
    };

    const handleSelectLoanPeriod = (e) => {
      setLoanPeriod(+e?.target?.value);
    };

    const handleCalculate = () => {
      handleSubmit({
        loanAmount,
        interestRate,
        loanPeriod,
      });
    };

    return (
      <Container ref={ref} className="loan-calculator__modal-content">
        <div className="loan-calculator__left">
          <div className="loan-calculator__range-inputs">
            <div className="loan-calculator__range-input">
              <div className="range-input__form-field">
                <div className="range-input__label-field">
                  <div className="range-input__label">{`${loanAmountLabel} (${currency})`}</div>
                  <TextInput
                    value={loanAmount}
                    onChange={handleSelectLoanAmount}
                    className="range-input__text"
                  />
                </div>
                <div className="range-input__ranger-wrapper">
                  <RangeSlider
                    className="range-input__ranger"
                    defaultValue={loanAmount}
                    value={loanAmount}
                    min={minLoanAmount}
                    max={maxLoanAmount}
                    onChange={handleSelectLoanAmount}
                  />
                  <div className="range-input__hint center">
                    <div>{`${minLoanAmount} ${currency}`}</div>
                    <div>{`${maxLoanAmount} ${currency}`}</div>
                  </div>
                </div>
                <div className="range-input__hint">{loanAmountHint}</div>
              </div>
            </div>
            <div className="loan-calculator__range-input">
              <div className="range-input__form-field">
                <div className="range-input__label-field">
                  <div className="range-input__label">{`${interestRateLabel} (%)`}</div>
                  <TextInput
                    value={interestRate}
                    onChange={handleSelectInterestRate}
                    className="range-input__text"
                  />
                </div>
                <div className="range-input__ranger-wrapper">
                  <RangeSlider
                    className="range-input__ranger"
                    defaultValue={interestRate}
                    value={interestRate}
                    min={minInterestRate}
                    max={maxInterestRate}
                    disabled={isFixedInterestRate}
                    onChange={handleSelectInterestRate}
                  />
                  <div className="range-input__hint center">
                    <div>{`${minInterestRate} %`}</div>
                    <div>{`${maxInterestRate} %`}</div>
                  </div>
                </div>
                <div className="range-input__hint">{interestRateHint}</div>
              </div>
            </div>
            <div className="loan-calculator__range-input">
              <div className="range-input__form-field">
                <div className="range-input__label-field">
                  <div className="range-input__label">{`${loanPeriodLabel} (${loanPeriodUnit})`}</div>
                  <TextInput
                    value={loanPeriod}
                    onChange={handleSelectLoanPeriod}
                    className="range-input__text"
                  />
                </div>
                <div className="range-input__ranger-wrapper">
                  <RangeSlider
                    className="range-input__ranger"
                    defaultValue={loanPeriod}
                    value={loanPeriod}
                    min={minLoanPeriod}
                    max={maxLoanPeriod}
                    onChange={handleSelectLoanPeriod}
                  />
                  <div className="range-input__hint center">
                    <div>{`${minLoanPeriod} ${loanPeriodUnit}`}</div>
                    <div>{`${maxLoanPeriod} ${loanPeriodUnit}`}</div>
                  </div>
                </div>
                <div className="range-input__hint">{loanPeriodHint}</div>
              </div>
            </div>
          </div>
          <Button
            text={submitText}
            className="loan-calculator__submit"
            onClick={handleCalculate}
          />
        </div>
        <div className="loan-calculator__right">
          <div className="loan-calculator__summary">
            <div className="summary__up">
              <div className="summary__title-wrapper">
                <div className="summary__title">
                  {summaryMonthlyPaymentText}
                </div>
                <div className="summary__title large">{`${monthlyPayment} ${currency}`}</div>
              </div>
              <div className="summary__hint">{summaryMonthlyPaymentHint}</div>
            </div>
            <div className="summary__separator"></div>
            <div className="summary__down">
              <div className="summary__title-wrapper">
                <div className="summary__title strong">
                  {summaryTotalPaymentText}
                </div>
                <div className="summary__title">{`${totalInterestPaid} ${currency}`}</div>
              </div>
              <div className="summary__hint">{summaryTotalPaymentHint}</div>
            </div>
          </div>
        </div>
      </Container>
    );
  },
);

export default LoanCalculatorModalContent;
