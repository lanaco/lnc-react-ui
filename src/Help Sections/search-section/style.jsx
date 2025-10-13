import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../_utils/consts";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & .section__left {
    display: flex;
    flex-direction: column;
    gap: 2rem;

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
      gap: 1.25rem;

      & .section__suggested {
        color: var(--neutral-900, #0c1520);
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1rem;
        letter-spacing: 0.025rem;
      }
    }
  }

  & .section__right {
    & video {
      border-radius: 1rem;
      overflow: hidden;
      object-fit: cover;
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    flex-direction: column;
    gap: 1.5rem;

    & .section__left {
      width: 100%;
      text-align: center;

      & .section__suggested {
        display: none;
      }
    }

    & .section__text-input {
      width: 100%;
    }
  }
`;
