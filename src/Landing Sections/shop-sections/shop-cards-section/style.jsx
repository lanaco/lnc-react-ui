import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;

  & .wrapper__heading {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

    & .wrapper__title {
      display: flex;
      justify-content: space-between;

      & .title__text {
        color: var(--gray-950, #14161a);
        text-align: center;
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 600;
        line-height: 2rem;
        letter-spacing: -0.47px;

        display: flex;
        align-items: center;
        gap: 0.5rem;

        & i {
          font-size: 1.5rem;
          color: var(--primary-500, #f59e0b);
        }
      }

      & .title__action {
        color: var(--gray-950, #14161a);
        background: var(--neutral-9504, rgba(20, 22, 26, 0.04));
        white-space: nowrap;

        &:hover {
          background: var(--neutral-9504, rgba(20, 22, 26, 0.12));
        }

        &:focus {
          outline: none;
        }
      }
    }

    & .wrapper__subtitle {
      color: var(---gray-600, #676e79);
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.25rem;
      letter-spacing: 0.25px;
    }
  }

  & .wrapper__cards {
    display: grid;
    grid-template-columns: ${(p) => `repeat(${p?.limitCards}, minmax(0, 1fr))`};
    gap: 1.25rem;
    justify-items: center;
    align-items: center;
    width: 100%;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    & .wrapper__heading {
      & .wrapper__title {
        & .title__action {
          display: none;
        }
      }
    }

    & .wrapper__cards {
      grid-template-columns: ${(p) =>
        `repeat(${p?.limitCardsForMobile}, minmax(0, 1fr))`};
      gap: 1rem;
    }
  }

  @media (max-width: 400px) {
    & .wrapper__cards {
      grid-template-columns: repeat(1, minmax(0, 1fr));
      gap: 1rem;
    }
  }
`;
