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
      welcomeTitle,
      welcomeDescription,
      endTitle,
      endDescription,
      image,
      imageComponent,
      questions,
      secondsPerQuestion,
      numOfCredits,
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

    const results = useRef([]);
    const wonCredits = useRef(0);

    const handleStartQuiz = () => {
      setStep(QuizContent.QUIZ);
      setQuestion(
        questions?.find((question) => question?.questionNo === questionNo)
      );
      onStartQuiz?.();
    };

    const handleSelectAnswer = (answer) => {
      setSelectedAnswer(answer);
      onSelectAnswer?.();
    };

    const handleGiveUp = () => {
      setStep(QuizContent.START_QUIZ);
      setQuestionNo(1);
      setSelectedAnswer(null);

      onGiveUp?.();
    };

    const handleNext = () => {
      let isCorrect = selectedAnswer?.uuid === question?.correntAnswer;

      if (isCorrect) {
        setStep(QuizContent.CORRECT_ANSWER);
        wonCredits.current += numOfCredits || question?.numOfCredits;
      } else {
        setQuestionNo(questionNo + 1);
        setQuestion(
          questions?.find((question) => question?.questionNo === questionNo + 1)
        );
        setSelectedAnswer(null);
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
          questions?.find((question) => question?.questionNo === questionNo + 1)
        );
      }

      setSelectedAnswer(null);

      onContinue?.();
    };

    const handleEndQuiz = () => {
      setStep(QuizContent.START_QUIZ);
      setQuestionNo(1);
      setSelectedAnswer(null);

      onEndQuiz?.();
    };

    return (
      <Wrapper>
        <div className="wrapper__outlet">
          {step === QuizContent.START_QUIZ && (
            <QuizWelcome
              title={welcomeTitle}
              description={welcomeDescription}
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
              text={question?.text}
              answers={question?.answers}
              secondsPerQuestion={
                secondsPerQuestion || question?.secondsPerQuestion
              }
              selectedAnswer={selectedAnswer}
              nextText={nextText}
              giveUpText={giveUpText}
              nextDisabled={!isDefined(selectedAnswer)}
              onSelectAnswer={handleSelectAnswer}
              onGiveUp={handleGiveUp}
              onNext={handleNext}
            />
          )}
          {step === QuizContent.CORRECT_ANSWER && (
            <QuizResult
              title={endTitle}
              description={formatString(
                endDescription,
                numOfCredits || question?.numOfCredits
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
          <img src={image} className="wrapper__image" />
        )}
      </Wrapper>
    );
  }
);

export default QuizSection;
