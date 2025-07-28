import styled from "@emotion/styled";

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  position: relative;
  margin-bottom: 0.5rem;
  margin-top: -0.5rem;
  padding-bottom: 1rem;

  &::after {
    content: "";
    position: absolute;
    left: -1.5rem;
    right: -1.5rem;
    bottom: 0;
    height: 0.0625rem;
    background: var(--neutral-95008, rgba(20, 22, 26, 0.08));
    z-index: 1;
  }

  & .header__title {
    color: var(--gray-950, #14161a);
    text-align: center;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.5rem;
    width: 100%;
  }

  & .header__action {
    position: absolute;
    right: 0;
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-self: stretch;
  padding: 0.5rem;
  border-top: 0.0625rem solid var(--neutral-95008, rgba(20, 22, 26, 0.08));

  & .footer__action {
    color: var(--gray-950-beta, #14161a);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem;
    letter-spacing: -0.0056rem;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  align-self: stretch;
  padding-top: 0.5rem;

  & .loan-calculator__right {
    max-width: 22rem;

    & .loan-calculator__summary {
      display: flex;
      padding: 1.25rem;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.25rem;
      flex: 1 0 0;
      border-radius: 0.75rem;
      border: 0.0625rem solid var(--neutral-95008, rgba(20, 22, 26, 0.08));
      background: var(--neutral-95004, rgba(20, 22, 26, 0.04));

      & .summary__hint {
        color: var(--gray-600, #676e79);
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1rem;
        letter-spacing: 0.025rem;
      }

      & .summary__separator {
        height: 1px;
        align-self: stretch;
        background: var(--neutral-95008, rgba(20, 22, 26, 0.08));
      }

      & .summary__down {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        align-self: stretch;

        & .summary__title-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          align-self: stretch;

          & .summary__title {
            color: var(--gray-950, #14161a);
            font-size: 0.875rem;
            font-style: normal;
            font-weight: 400;
            line-height: 1.25rem;
            letter-spacing: 0.0156rem;

            &.strong {
              font-weight: 600;
              letter-spacing: 0.0063rem;
            }
          }
        }
      }

      & .summary__up {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        align-self: stretch;

        & .summary__title-wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.125rem;

          & .summary__title {
            color: var(--gray-950, #14161a);
            font-size: 1rem;
            font-style: normal;
            font-weight: 600;
            line-height: 1.5rem;
            letter-spacing: 0.0063rem;

            &.large {
              font-size: 1.375rem;
              font-style: normal;
              font-weight: 600;
              line-height: 1.75rem;
            }
          }
        }
      }
    }
  }

  & .loan-calculator__left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;

    & .loan-calculator__submit {
      width: 100%;
    }

    & .loan-calculator__range-inputs {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.5rem;
      align-self: stretch;

      & .loan-calculator__range-input {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
        align-self: stretch;

        & .range-input__hint {
          color: var(--gray-500, #868c98);
          font-size: 0.75rem;
          font-style: normal;
          font-weight: 400;
          line-height: 1rem;
          letter-spacing: 0.025rem;

          &.center {
            display: flex;
            justify-content: space-between;
            align-items: center;
            align-self: stretch;
          }
        }

        & .range-input__form-field {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.75rem;
          align-self: stretch;

          & .range-input__label-field {
            display: flex;
            align-items: center;
            align-self: stretch;
            justify-content: space-between;
            & .range-input__label {
              color: var(--gray-950, #14161a);
              font-size: 0.875rem;
              font-style: normal;
              font-weight: 500;
              line-height: 1.25rem;
              letter-spacing: -0.0056rem;
            }

            & .range-input__text {
              max-width: 100px;
              width: 100%;
            }
          }

          & .range-input__ranger-wrapper {
            display: flex;
            flex-direction: column;
            width: 100%;
          }
        }
      }
    }
  }
`;
