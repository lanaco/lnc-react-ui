/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useState } from "react";
import { ContentWrapper, Wrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import Button from "../../../General/Button/Button";
import CalculatorImage from "../../../assets/images/calculator-image.png";

const LoanCalculator = forwardRef((props, ref) => {
  const {
    title = "Loan calculator",
    text = "Lorem ipsum dolor sit amet consectetur, Nunc nibh at.",
    placeholderText = "Enter the loan amount",
    openCalculatorText = "Open calculator",
    onOpenCalculator = () => {},
  } = props;
  const isMobile = useDetectMobile();
  const [amount, setAmount] = useState(null);

  return (
    <Wrapper className="loan-calculator">
      <ContentWrapper>
        <img src={CalculatorImage} />
        {isMobile === true && (
          <div className="cont">
            <span className="content-title">{title}</span>
            <span className="content-text">{text}</span>
          </div>
        )}
      </ContentWrapper>
      <ContentWrapper className="right-content">
        {isMobile !== true && (
          <div className="cont">
            <span className="content-title">{title}</span>
            <span className="content-text">{text}</span>
          </div>
        )}
        <div className="content-row">
          <input
            className="input-amount"
            type="text"
            placeholder={placeholderText}
            onChange={(e) => {
              if (!isNaN(e?.target?.value) && e?.target?.value >= 0) {
                setAmount(
                  e?.target?.value?.length > 1
                    ? e?.target?.value?.replace(/^0+/, "")
                    : e?.target?.value
                );
              }
            }}
            value={amount?.toString()}
          />
          <Button
            type="button"
            size="medium"
            color="neutral"
            onClick={onOpenCalculator}
          >
            {openCalculatorText}
          </Button>
        </div>
      </ContentWrapper>
    </Wrapper>
  );
});

export default LoanCalculator;
