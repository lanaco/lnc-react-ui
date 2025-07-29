import { forwardRef } from "react";

import IconButton from "../../../../General/IconButton/IconButton";
import { HeaderContainer } from "./style";

const LoanCalculatorModalHeader = forwardRef(
  ({ headerTitleText = "Loan calculator", handleClick = () => {} }, ref) => {
    return (
      <HeaderContainer>
        <div className="header__title">{headerTitleText}</div>
        <IconButton
          icon="times"
          borderRadius="curved"
          btnType="basic"
          color="neutral"
          size="small"
          className="header__action"
          onClick={handleClick}
        />
      </HeaderContainer>
    );
  }
);

export default LoanCalculatorModalHeader;
