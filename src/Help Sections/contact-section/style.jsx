import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../_utils/consts";

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2.5rem;

  & .section__card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 0.75rem;
    border: 1px solid var(--gray-200, #e4e9f0);
    background: var(--white, #fff);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

    & .card__image {
      border-top-left-radius: 0.75rem;
      border-top-right-radius: 0.75rem;
      max-width: 23.5rem;
      max-height: 18rem;
    }

    & .card__content {
      display: flex;
      padding: 2rem 1.25rem;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.5rem;

      & .card__tile {
        display: flex;
        align-items: flex-start;
        gap: 1rem;

        & .tile__image {
          display: flex;
          width: 2.5rem;
          height: 2.5rem;
          padding: 0.5rem;
          align-items: center;
          aspect-ratio: 1 / 1;
          border-radius: 999px;
          background: var(--primary-100, #dcf4f9);
          color: var(--primary-400, #27b4be);

          & i {
            &::before {
              margin-left: 0.1rem;
            }
          }
        }

        & .tile__content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.25rem;

          & .tile__title {
            color: var(--gray-900, #0c1520);
            font-size: 1rem;
            font-style: normal;
            font-weight: 500;
            line-height: 1.5rem;
          }

          & .tile__items {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;

            & .tile__item {
              color: var(--gray-900, #0c1520);
              font-size: 0.875rem;
              font-style: normal;
              font-weight: 400;
              line-height: 1.25rem;
              letter-spacing: 0.0156rem;
            }
          }
        }
      }
    }
  }

  & .section__form {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    & .form__title {
      color: var(--gray-900, #0c1520);
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 600;
      line-height: 2rem;
    }

    & .form__description {
      color: var(--gray-500, #7a8594);
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.5rem;
    }

    & .form__fields {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.25rem;

      & .form__field {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        width: 100%;

        &.right {
          justify-content: flex-end;
        }

        & .field__wrapper {
          display: flex;
          flex-direction: column;
          width: 100%;

          & .field__hint {
            color: var(--gray-400, #96a2b2);
            font-size: 0.75rem;
            font-style: normal;
            font-weight: 400;
            line-height: 1rem;
            letter-spacing: 0.01px;
            align-self: flex-end;
          }

          & .field__checkbox-input {
            & input {
              &:focus ~ .checkmark {
                outline: none;
              }

              &:checked ~ .checkmark {
                background: var(--primary-500, #ff7621);
                border: 1px solid var(--primary-400, #ff914d);
              }
            }

            & .checkbox-label {
              color: var(--gray-900, #0c1520);
              font-size: 0.875rem;
              font-style: normal;
              font-weight: 400;
              line-height: 1.25rem;
              letter-spacing: -0.09px;

              & a {
                font-weight: 500;
                color: var(--gray-900, #0c1520);

                &:hover {
                  color: var(--gray-900, #0c1520);
                }
              }
            }
          }
        }

        & .field__text-input {
          height: 2.75rem;
          min-height: 2.75rem;
          border-radius: 0.75rem;
          border: 1px solid var(--gray-200, #e4e9f0);
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          width: 100%;
          outline: none;

          &.text-area {
            height: 100%;
            min-height: 100%;
            border: none;
            box-shadow: none;
          }

          & input::placeholder {
            color: var(--gray-500, #7a8594);
            font-size: 0.875rem;
            font-style: normal;
            font-weight: 400;
            line-height: 1.25rem;
            letter-spacing: 0.0156rem;
          }

          & textarea {
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

            &::placeholder {
              color: var(--gray-500, #7a8594);
              font-size: 0.875rem;
              font-style: normal;
              font-weight: 400;
              line-height: 1.25rem;
              letter-spacing: 0.0156rem;
            }

            &:focus {
              outline: none;
            }
          }
        }

        & button {
          min-width: 9rem;
          padding: 0.5rem;
          color: var(--white, #fff);
          font-size: 0.875rem;
          font-style: normal;
          font-weight: 600;
          line-height: 1.25rem;
          letter-spacing: 0.1px;

          background: var(
            --Linear-button,
            linear-gradient(0deg, #ff7621 0%, #ff9706 100%)
          );

          &:hover {
            background: var(
              --Linear-button-switched,
              linear-gradient(0deg, #ff9706 0%, #ff7621 100%)
            );
          }

          &:focus {
            outline: none;
          }
        }
      }
    }
  }

  & .section__divider {
    width: 100%;
    height: 1px;
    background: var(--gray-200, #e4e9f0);
    display: none;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    flex-direction: column;

    & .section__divider {
      order: 1;
      display: block;
    }

    & .section__card {
      width: 100%;
      border: none;
      background: transparent;
      box-shadow: none;
      order: 2;

      & .card__image {
        display: none;
      }

      & .card__content {
        padding: 0;
      }
    }

    & .section__form {
      order: 0;

      & .form__title {
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.5rem;
      }

      & .form__description {
        color: var(--gray-500, #7a8594);
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.25rem;
      }

      & .form__fields {
        & .form__field {
          flex-direction: column;
        }

        & button {
          width: 100%;
        }
      }
    }
  }
`;
