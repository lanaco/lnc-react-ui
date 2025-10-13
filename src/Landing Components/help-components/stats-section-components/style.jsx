import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";
import { truncateTextInRows } from "../../../_utils/utils";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;

  & .section__card {
    display: flex;
    padding: 2rem 1.25rem;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    border-radius: 0.75rem;
    border: 1px solid var(--gray-200, #e4e9f0);
    background: var(--white, #fff);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    max-width: 14.625rem;
    width: 100%;

    & .section__image {
      max-width: 3.5rem;
      max-height: 3.5rem;
      width: 100%;
      height: auto;
      aspect-ratio: 1 / 1;
    }

    & .section__title {
      color: var(--gray-900, #0c1520);
      text-align: center;
      font-size: 1.375rem;
      font-style: normal;
      font-weight: 600;
      line-height: 1.75rem;
    }

    & .section__description {
      color: var(--gray-600, #5a6573);
      text-align: center;
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1rem;
      letter-spacing: 0.025rem;
      ${truncateTextInRows(2)}
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;

    & .section__card {
      padding: 1rem;

      & .section__image {
        max-width: 2.5rem;
        max-height: 2.5rem;
      }

      & .section__title {
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.5rem;
      }
    }
  }
`;
