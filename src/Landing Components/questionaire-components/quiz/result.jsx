import { forwardRef } from "react";

import Icon from "../../../General/Icon/Icon";
import Button from "../../../General/Button/Button";
import { ResultWrapper } from "./style";

const QuizResult = forwardRef(
  (
    {
      title,
      description,
      continueText = "Continue",
      endQuizText = "End quiz",
      onContinue = () => {},
      onEndQuiz = () => {},
    },
    ref
  ) => {
    return (
      <ResultWrapper>
        <div className="wrapper__content">
          <Icon
            icon=" mng-lnc-checkmark--outline"
            color="success"
            sizeInUnits="4rem"
            className="wrapper__icon"
          />
          <div className="wrapper__info">
            {title && <div className="wrapper__title">{title}</div>}
            {description && (
              <div className="wrapper__description">{description}</div>
            )}
          </div>
        </div>
        <div className="wrapper__actions">
          <Button
            text={continueText}
            borderRadius="curved"
            size="medium"
            className="wrapper__action action__continue"
            onClick={onContinue}
          />
          <Button
            text={endQuizText}
            borderRadius="curved"
            size="medium"
            className="wrapper__action action__end-quiz"
            onClick={onEndQuiz}
          />
        </div>
      </ResultWrapper>
    );
  }
);

export default QuizResult;
