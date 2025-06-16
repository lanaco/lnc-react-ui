import { forwardRef } from "react";
import { Wrapper } from "./style";
import LocationFinder from "../../../Landing Components/custom-components/location-finder";
import LoanCalculator from "../../../Landing Components/custom-components/loan-caluclator";

const CustomLoanMapSection = forwardRef((props, ref) => {
  const {
    hasLoanCalculator,
    hasLocationFinder,

    locationFinderTitle,
    locationFinderPlaceholder,
    openMapText,
    onOpenMap = () => {},
    mapFilters,

    loanCalculatorTitle,
    loanCalculatorText,
    loanCalculatorPlaceholder,
    openCalculatorText,
    onOpenCalculator = () => {},
  } = props;

  return (
    <Wrapper>
      {hasLocationFinder === true && (
        <LocationFinder
          title={locationFinderTitle}
          placeholderText={locationFinderPlaceholder}
          onOpenMap={onOpenMap}
          openMapText={openMapText}
          mapFilters={mapFilters}
        />
      )}
      {hasLoanCalculator === true && (
        <LoanCalculator
          title={loanCalculatorTitle}
          text={loanCalculatorText}
          openCalculatorText={openCalculatorText}
          onOpenCalculator={onOpenCalculator}
          placeholderText={loanCalculatorPlaceholder}
        />
      )}
    </Wrapper>
  );
});

export default CustomLoanMapSection;
