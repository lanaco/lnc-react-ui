import styled from "@emotion/styled";

import { down } from "../../_utils/breakpoints";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6rem;

  & .section__left {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    min-width: 0;

    &.search {
      gap: 0.75rem;
    }

    & .section__title {
      color: var(--gray-900, #0c1520);
      font-size: 1.75rem;
      font-style: normal;
      font-weight: 600;
      line-height: 2.25rem;
      letter-spacing: -0.0369rem;
    }

    & .section__text-input {
      border-radius: 999px;
      height: 3rem;
      min-height: 3rem;
      border: 1px solid var(--gray-200, #e4e9f0);
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      outline: none;

      & input::placeholder {
        color: var(--gray-500, #7a8594);
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.25rem;
        letter-spacing: 0.0156rem;
      }

      & .section__prefix {
        color: var(--gray-500, #7a8594);
      }
    }

    & .section__description {
      color: var(--gray-500, #7a8594);
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.5rem;
      letter-spacing: -0.0112rem;
    }

    & .section__tags {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;

      & .section__suggested {
        color: var(--neutral-900, #0c1520);
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1rem;
        letter-spacing: 0.025rem;
        margin-right: 0.75rem;
      }
    }
  }

  & .section__right {
    flex-shrink: 0;
    max-width: 100%;

    & video {
      border-radius: 1rem;
      overflow: hidden;
      object-fit: cover;
    }
  }

  @media ${down("S")} {
    flex-direction: column;
    gap: 1rem;

    & .section__left {
      width: 100%;
      text-align: center;
      align-items: center;

      & .section__tags {
        width: 100%;
        justify-content: center;
      }

      & .section__suggested {
        display: none;
      }
    }

    & .section__text-input {
      width: 100%;
    }

    & .section__right {
      width: 100%;
    }
  }
`;
