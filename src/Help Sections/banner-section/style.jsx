import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../_utils/consts";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  & .section__heading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    text-align: center;

    & .section__title {
      color: var(--gray-900, #0c1520);
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 600;
      line-height: 2rem;
    }

    & .section__description {
      color: var(--gray-500, #7a8594);
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.5rem;
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    & .section__heading {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      text-align: center;

      & .section__title {
        color: var(--gray-900, #0c1520);
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.5rem;
      }

      & .section__description {
        color: var(--gray-500, #7a8594);
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.25rem;
        letter-spacing: 0.0156rem;
      }
    }

    & .section__image {
      width: 100%;
      height: auto;
    }
  }
`;
