/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";

import Button from "../../../General/Button/Button";
import { WelcomeWrapper } from "./style";

const QuizWelcome = forwardRef(
  (
    {
      title,
      description,
      startQuizText = "Start quiz",
      onStartQuiz = () => {},
    },
    ref,
  ) => {
    return (
      <WelcomeWrapper ref={ref}>
        <div className="wrapper__content">
          <div className="wrapper__title">{title}</div>
          <div className="wrapper__description">{description}</div>
        </div>
        <Button
          text={startQuizText}
          size="medium"
          className="wrapper__action"
          onClick={onStartQuiz}
        />
      </WelcomeWrapper>
    );
  },
);

export default QuizWelcome;
