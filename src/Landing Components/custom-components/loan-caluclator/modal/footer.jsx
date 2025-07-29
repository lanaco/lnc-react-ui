import { forwardRef } from "react";

import Button from "../../../../General/Button/Button";
import { FooterContainer } from "./style";

const LoanCalculatorModalFooter = forwardRef(
  ({ footerTitleText = "Close", handleClick = () => {} }, ref) => {
    return (
      <FooterContainer className="loan-calculator__modal-footer">
        <Button
          text={footerTitleText}
          btnType="basic"
          color="neutral"
          onClick={handleClick}
          className="footer__action"
        />
      </FooterContainer>
    );
  }
);

export default LoanCalculatorModalFooter;
