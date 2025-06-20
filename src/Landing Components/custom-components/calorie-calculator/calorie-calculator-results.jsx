/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { ResultItem, ResultsExternalWrapper, ResultsWrapper } from "./style";
import DropdownItem from "../../../Utility/DropdownMenu/DropdownItem";
import DropdownMenu from "../../../Utility/DropdownMenu/DropdownMenu";
import IconButton from "../../../General/IconButton/IconButton";

const CalorieCalculatorResults = forwardRef((props, ref) => {
  const {
    caloriesText = "Calories",
    carbsText = "Carbs",
    proteinText = "Protein",
    fatsText = "Fats",
    calculateAgainText = "Calculate again",
    calories,
    carbs,
    protein,
    fats,
    onGoBack = () => {},
  } = props;

  return (
    <ResultsExternalWrapper>
      <ResultsWrapper>
        <ResultItem color={"var(--warning-600)"}>
          <i className="mng-lnc-fire" />
          <div className="subgroup">
            <div>{calories}&nbsp;kcal</div>
            <div className="subtext">{caloriesText}</div>
          </div>
        </ResultItem>
        <ResultItem color={"var(--secondary-400)"}>
          <i className="mng-lnc-leaf" />
          <div className="subgroup">
            <div>{carbs}g</div>
            <div className="subtext">{carbsText}</div>
          </div>
        </ResultItem>
        <ResultItem color={"var(--info-500)"}>
          <i className="mng-lnc-meat" />
          <div className="subgroup">
            <div>{protein}g</div>
            <div className="subtext">{proteinText}</div>
          </div>
        </ResultItem>
        <ResultItem color={"var(--warning-300)"}>
          <i className="mng-lnc-meat" />
          <div className="subgroup">
            <div>{fats}g</div>
            <div className="subtext">{fatsText}</div>
          </div>
        </ResultItem>
      </ResultsWrapper>
      <div className="dropdown-group">
        <div className="vertical-line"></div>

        <DropdownMenu
          color="neutral"
          control={
            <IconButton
              borderRadius="curved"
              btnType={"basic"}
              className="dropdown-btn"
              color="neutral"
              icon="ellipsis"
              type="button"
            />
          }
          offsetValue={-10}
          placement="bottom-end"
        >
          <DropdownItem icon="star" onClick={onGoBack}>
            {calculateAgainText}
          </DropdownItem>
        </DropdownMenu>
      </div>
    </ResultsExternalWrapper>
  );
});

export default CalorieCalculatorResults;
