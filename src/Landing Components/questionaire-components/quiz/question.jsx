/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useEffect, useRef, useState } from "react";

import Button from "../../../General/Button/Button";
import Icon from "../../../General/Icon/Icon";
import ProgressBar from "../../../Feedback/ProgressBar/ProgressBar";
import { CIRCLE_CIRCUMFERENCE, CIRCLE_RADIUS } from "../../../_utils/consts";
import {
  formatTimerText,
  isDefinedNotEmptyString,
} from "../../../_utils/utils";
import { QuestionWrapper } from "./style";

const QuizQuestion = forwardRef(
  (
    {
      questionNoText,
      questionNo,
      totalQuestions,
      text,
      answers,
      options,
      correctAnswer,
      selectedAnswer,
      secondsPerQuestion,
      nextText = "Next",
      giveUpText = "Give up",
      nextDisabled = true,
      onSelectAnswer = () => {},
      onGiveUp = () => {},
      onNext = () => {},
    },
    ref
  ) => {
    const [timeLeft, setTimeLeft] = useState(secondsPerQuestion);
    const [isRunning, _] = useState(true);

    const intervalRef = useRef(null);

    useEffect(() => {
      if (isRunning && timeLeft > 0) {
        intervalRef.current = setInterval(() => {
          setTimeLeft((t) => (t > 0 ? t - 1 : 0));
        }, 1000);
      }

      return () => clearInterval(intervalRef.current);
    }, [isRunning, timeLeft]);

    const progress =
      timeLeft > 0 ? (timeLeft / secondsPerQuestion) * CIRCLE_CIRCUMFERENCE : 0;

    const active = (answerUuid) => selectedAnswer?.uuid === answerUuid;

    return (
      <QuestionWrapper ref={ref}>
        <div className="wrapper__headline">
          <div className="wrapper__question-no">
            <div className="question-no__text">{`${questionNoText} ${questionNo} / ${totalQuestions}`}</div>
            <ProgressBar
              progressPercentage={(questionNo / totalQuestions) * 100}
              className="question-no__progress-bar"
            />
          </div>
          <div className="wrapper__timer">
            <svg className="timer__ring" width="60" height="60">
              <circle
                className="ring__progres-background"
                cx="30"
                cy="30"
                r={CIRCLE_RADIUS}
                stroke="#e0e0e0"
                strokeWidth="4"
                fill="transparent"
              />
              <circle
                className="ring__progres"
                cx="30"
                cy="30"
                r={CIRCLE_RADIUS}
                stroke="#d97706"
                strokeWidth="4"
                fill="transparent"
                strokeLinecap="round"
                transform="rotate(-90 30 30)"
                strokeDasharray={CIRCLE_CIRCUMFERENCE}
                strokeDashoffset={CIRCLE_CIRCUMFERENCE - progress}
              />
            </svg>
            <div className="timer__display">
              <span className="timer__text">{formatTimerText(timeLeft)}</span>
            </div>
          </div>
        </div>
        <div className="wrapper__content">
          <div className="wrapper__item">
            <div className="wrapper__text">{text}</div>
            <div className="wrapper__answers">
              {options?.map((answer, idx) => (
                <div
                  key={`quiz-answer__${idx + 1}`}
                  className={`wrapper__answer ${
                    correctAnswer === answer && correctAnswer === selectedAnswer
                      ? "active"
                      : isDefinedNotEmptyString(selectedAnswer) &&
                        correctAnswer !== selectedAnswer &&
                        selectedAnswer === answer
                      ? "incorrect"
                      : ""
                  }`}
                  onClick={() => onSelectAnswer(answer)}
                >
                  {`${String.fromCharCode(65 + idx)}: ${answer}`}
                  {correctAnswer === answer &&
                    correctAnswer === selectedAnswer && (
                      <Icon
                        icon=" mng-lnc-checkmark--filled"
                        sizeInUnits="1.25rem"
                        className="wrapper__icon"
                      />
                    )}

                  {isDefinedNotEmptyString(selectedAnswer) &&
                    correctAnswer !== selectedAnswer &&
                    selectedAnswer === answer && (
                      <Icon
                        icon=" mng-lnc-close--filled"
                        sizeInUnits="1.25rem"
                        className="wrapper__icon__incorrect"
                      />
                    )}
                </div>
              ))}

              {/* {answers &&
                answers?.map((answer, idx) => (
                  <div
                    key={`quiz-answer__${idx + 1}`}
                    className={`wrapper__answer ${
                      active(answer?.uuid) ? "active" : ""
                    }`}
                    onClick={() => onSelectAnswer(answer)}
                  >
                    {`${String.fromCharCode(65 + idx)}: ${answer?.label}`}
                    {active(answer?.uuid) && (
                      <Icon
                        icon=" mng-lnc-checkmark--filled"
                        sizeInUnits="1.25rem"
                        className="wrapper__icon"
                      />
                    )}
                  </div>
                ))} */}
            </div>
          </div>
          <div className="wrapper__actions">
            <Button
              text={giveUpText}
              borderRadius="curved"
              size="medium"
              className="wrapper__action action__give-up"
              onClick={onGiveUp}
            />
            <Button
              text={nextText}
              borderRadius="curved"
              size="medium"
              className="wrapper__action action__next"
              disabled={nextDisabled}
              onClick={onNext}
            />
          </div>
        </div>
      </QuestionWrapper>
    );
  }
);

export default QuizQuestion;
