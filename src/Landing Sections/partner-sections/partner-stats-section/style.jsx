import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";
import { truncateTextInRows } from "../../../_utils/utils";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  align-self: stretch;

  & .section__text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    align-self: stretch;
    max-width: 50rem;

    & .section__title {
      color: var(--gray-900, #0c1520);
      font-size: 2rem;
      font-style: normal;
      font-weight: 600;
      line-height: 2.5rem;
      ${truncateTextInRows(2)}
    }

    & .section__description {
      color: var(--gray-700, #424b56);
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.25rem;
      letter-spacing: 0.0156rem;
      ${truncateTextInRows(2)}
    }
  }

  & .section__items {
    display: flex;

    & .section__item {
      border-left: 4px solid #ffa36a;
      height: 3rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      flex: 1 0 0;
      min-width: 12.5rem;
      padding-left: 0.75rem;

      & .item__title {
        color: var(--gray-900, #0c1520);
        font-size: 1.375rem;
        font-style: normal;
        font-weight: 600;
        line-height: 1.75rem;
      }

      & .item__description {
        color: var(--gray-600, #5a6573);
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.25rem;
      }
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    gap: 1.25rem;

    & .section__text {
      & .section__title {
        font-size: 1.375rem;
        line-height: 1.75rem;
      }

      & .section__description {
        ${truncateTextInRows(5)}
      }
    }

    & .section__items {
      & .section__item {
        height: 3.5rem;
        min-width: auto;

        & .item__title {
          font-size: 1rem;
          line-height: 1.5rem;
          letter-spacing: 0.0063rem;
        }

        & .item__description {
          font-size: 12px;
          line-height: 1rem;
          letter-spacing: 0.0313rem;
        }
      }
    }
  }
`;
