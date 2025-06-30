/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, useRef, useState } from "react";

import { formatString, isDefined } from "../../../_utils/utils";
import QuizWelcome from "../../../Landing Components/questionaire-components/quiz/welcome";
import QuizQuestion from "../../../Landing Components/questionaire-components/quiz/question";
import QuizResult from "../../../Landing Components/questionaire-components/quiz/result";
import { QuizContent } from "./consts";
import { Wrapper } from "./style";

const QuizSection = forwardRef(
  (
    {
      title,
      subtitle,
      endTitle,
      endDescription,
      imageUrl,
      imageComponent,
      questions,
      secondsPerQuestion,
      numberOfCredits,
      startQuizText = "Start quiz",
      nextText = "Next",
      giveUpText = "Give up",
      questionNoText = "Question",
      continueText = "Continue",
      endQuizText = "End quiz",
      onStartQuiz = () => {},
      onSelectAnswer = () => {},
      onGiveUp = () => {},
      onNext = () => {},
      onContinue = () => {},
      onEndQuiz = () => {},
    },
    ref
  ) => {
    const [step, setStep] = useState(QuizContent.START_QUIZ);
    const [questionNo, setQuestionNo] = useState(1);
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

    const results = useRef([]);
    const wonCredits = useRef(0);

    const handleStartQuiz = () => {
      setStep(QuizContent.QUIZ);
      setQuestion(
        // questions?.find((question) => question?.questionNo === questionNo)
        question?.at?.(+questionNo)
      );
      onStartQuiz?.();
    };

    const handleSelectAnswer = (answer, index) => {
      selectedAnswerIndex.current = index;

      setSelectedAnswer(answer);
      onSelectAnswer?.();
    };

    const handleGiveUp = () => {
      setStep(QuizContent.START_QUIZ);
      setQuestionNo(1);
      setSelectedAnswer(null);
      setSelectedAnswerIndex(null);

      onGiveUp?.();
    };

    const handleNext = () => {
      // let isCorrect = selectedAnswer === question?.correctAnswer;
      const isCorrect = selectedAnswerIndex === question?.correctAnswerIndex;

      if (isCorrect) {
        setStep(QuizContent.CORRECT_ANSWER);
        wonCredits.current += numberOfCredits || question?.numberOfCredits;
      } else if (questionNo === questions?.length) {
        setStep(QuizContent.START_QUIZ);
        setQuestionNo(1);
        setSelectedAnswer(null);
        setSelectedAnswerIndex(null);
      } else {
        setQuestionNo(questionNo + 1);
        setQuestion(
          // questions?.find((question) => question?.questionNo === questionNo + 1)
          questions?.at?.(+questionNo + 1)
        );
        setSelectedAnswer(null);
        setSelectedAnswerIndex(null);
      }

      results.current = [
        ...results.current,
        {
          question,
          selectedAnswer,
          isCorrect,
        },
      ];

      onNext?.();
    };

    const handleContinue = () => {
      if (questionNo === questions?.length) {
        setStep(QuizContent.START_QUIZ);
        setQuestionNo(1);
      } else {
        setStep(QuizContent.QUIZ);
        setQuestionNo(questionNo + 1);
        setQuestion(
          // questions?.find((question) => question?.questionNo === questionNo + 1)
          questions?.at?.(+questionNo + 1)
        );
      }

      setSelectedAnswer(null);
      setSelectedAnswerIndex(null);

      onContinue?.(wonCredits?.current);
    };

    const handleEndQuiz = () => {
      setStep(QuizContent.START_QUIZ);
      setQuestionNo(1);
      setSelectedAnswer(null);
      setSelectedAnswerIndex(null);

      onEndQuiz?.();
    };

    return (
      <Wrapper ref={ref}>
        <div className="wrapper__outlet">
          {step === QuizContent.START_QUIZ && (
            <QuizWelcome
              title={title}
              description={subtitle}
              startQuizText={startQuizText}
              onStartQuiz={handleStartQuiz}
            />
          )}
          {step === QuizContent.QUIZ && question && (
            <QuizQuestion
              key={`quiz-question__${questionNo}`}
              questionNoText={questionNoText}
              questionNo={questionNo}
              totalQuestions={questions?.length || 0}
              text={question?.questionText}
              options={question?.options}
              secondsPerQuestion={
                secondsPerQuestion || question?.secondsPerQuestion
              }
              correctAnswerIndex={question?.correctAnswerIndex}
              selectedAnswer={selectedAnswer}
              nextText={nextText}
              giveUpText={giveUpText}
              nextDisabled={!isDefined(selectedAnswer)}
              onSelectAnswer={handleSelectAnswer}
              onGiveUp={handleGiveUp}
              onNext={handleNext}
              selectedAnswerIndex={selectedAnswerIndex}
            />
          )}
          {step === QuizContent.CORRECT_ANSWER && (
            <QuizResult
              title={endTitle}
              description={formatString(
                endDescription,
                numberOfCredits || question?.numberOfCredits
              )}
              continueText={continueText}
              endQuizText={endQuizText}
              onContinue={handleContinue}
              onEndQuiz={handleEndQuiz}
            />
          )}
        </div>
        {isDefined(imageComponent) ? (
          imageComponent
        ) : (
          <img src={imageUrl} className="wrapper__image" />
        )}
      </Wrapper>
    );
  }
);

export default QuizSection;
