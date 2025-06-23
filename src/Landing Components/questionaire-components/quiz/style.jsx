import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const WelcomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  flex: 1 0 0;

  & .wrapper__content {
    display: flex;
    flex-direction: column;

    & .wrapper__title {
      color: var(--gray-950, #14161a);
      font-size: 1.75rem;
      font-style: normal;
      font-weight: 600;
      line-height: 2.25rem;
      letter-spacing: -0.59px;
    }

    & .wrapper__description {
      color: var(--gray-950, #14161a);
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.5rem;
      letter-spacing: -0.18px;
    }
  }

  & .wrapper__action {
    background: var(--gray-950, #14161a);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem;
    letter-spacing: -0.09px;
    padding: 0.625rem 0.75rem;

    &:hover {
      color: var(--white, #fff);
      background: var(---gray-600, #676e79);
    }

    &:focus {
      outline: none;
      background: var(--gray-950, #14161a);
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    & .wrapper__title {
      font-size: 1.375rem;
      line-height: 1.75rem;
    }

    & .wrapper__description {
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
  }
`;

export const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  align-self: stretch;

  & .wrapper__headline {
    display: flex;
    align-items: flex-start;
    justify-items: space-between;
    gap: 32px;
    width: 100%;

    & .wrapper__question-no {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 0.75rem;
      width: 100%;

      & .question-no__text {
        color: var(--gray-950, #14161a);
        font-size: 1.375rem;
        font-style: normal;
        font-weight: 600;
        line-height: 1.75rem;
      }

      & .question-no__progress-bar {
        height: 0.25rem;
        & > div {
          background: var(--yellow-600, #d97706);
        }
      }
    }

    & .wrapper__timer {
      position: relative;
      width: 3.75rem;
      height: 3.75rem;
      background-color: #f0f0f0;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      & .timer__display {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;

        & .timer__text {
          color: var(--red-600, #e11d48);
          font-size: 0.75rem;
          font-style: normal;
          font-weight: 500;
          line-height: 1rem;
          letter-spacing: 0.5px;
        }
      }
    }
  }

  & .wrapper__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2.5rem;
    width: 100%;

    & .wrapper__item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.25rem;
      align-self: stretch;

      & .wrapper__text {
        color: var(--gray-950, #14161a);
        font-size: 1rem;
        font-style: normal;
        font-weight: 600;
        line-height: 1.5rem;
        letter-spacing: 0.1px;
      }

      & .wrapper__answers {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        align-self: stretch;

        & .wrapper__answer {
          display: flex;
          padding: 1rem 0.75rem;
          align-items: flex-start;
          justify-content: space-between;
          border-radius: 0.75rem;
          border: 1px solid var(--neutral-95012, rgba(20, 22, 26, 0.12));
          color: var(--gray-950, #14161a);
          font-size: 0.875rem;
          font-style: normal;
          font-weight: 500;
          line-height: 1.25rem;
          letter-spacing: -0.09px;
          width: 100%;

          &:hover {
            cursor: pointer;
          }

          &.active {
            border: 2px solid var(--yellow-600, #d97706);
          }

          & .wrapper__icon {
            color: var(--yellow-600, #d97706);
          }
        }
      }
    }

    & .wrapper__actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      align-items: center;
      align-self: stretch;
      width: 100%;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem;
      letter-spacing: -0.09px;

      & .wrapper__action {
        padding: 0.625rem 0.75rem;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.25rem;
        letter-spacing: -0.09px;
        min-width: 5rem;

        &.action__give-up {
          background: transparent;
          color: var(--gray-950, #14161a);

          &:hover {
            background: var(--neutral-9504, rgba(20, 22, 26, 0.12));
          }

          &:focus {
            outline: none;
            background: transparent;
          }
        }

        &.action__next {
          background: var(--gray-950, #14161a);

          &:hover {
            background: var(---gray-600, #676e79);
          }

          &:focus {
            outline: none;
            background: var(--gray-950, #14161a);
          }

          &:disabled {
            color: var(--white, #fff);
            background: var(--neutral-9504, rgba(20, 22, 26, 0.12));
          }
        }
      }
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    & .wrapper__content {
      & .wrapper__item {
        & .wrapper__answers {
          flex-direction: column;
        }
      }
    }
  }
`;

export const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;

  & .wrapper__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    align-self: stretch;

    & .wrapper__info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
      align-self: stretch;
      color: var(--gray-950, #14161a);

      align-items: center;

      & .wrapper__title {
        font-size: 1.75rem;
        font-style: normal;
        font-weight: 600;
        line-height: 2.25rem;
      }

      & .wrapper__description {
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.5rem;
      }
    }
  }

  & .wrapper__actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem;
    letter-spacing: -0.09px;

    & .wrapper__action {
      padding: 0.625rem 0.75rem;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem;
      letter-spacing: -0.09px;
      min-width: 22rem;
      width: 100%;

      &.action__end-quiz {
        background: transparent;
        color: var(--gray-950, #14161a);

        &:hover {
          background: var(--neutral-9504, rgba(20, 22, 26, 0.12));
        }

        &:focus {
          outline: none;
          background: transparent;
        }
      }

      &.action__continue {
        background: var(--gray-950, #14161a);

        &:hover {
          background: var(---gray-600, #676e79);
        }

        &:focus {
          outline: none;
          background: var(--gray-950, #14161a);
        }
      }
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    width: 100%;

    & .wrapper__actions {
      & .wrapper__action {
        width: 100%;
        min-width: 100%;
      }
    }
  }
`;
