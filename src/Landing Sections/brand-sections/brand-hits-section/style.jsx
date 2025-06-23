import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;

  & img {
    border-radius: 0.75rem;
  }

  & .wrapper__heading {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    width: 100%;

    & .wrapper__title {
      color: var(--gray-950, #14161a);
      text-align: center;
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 600;
      line-height: 2rem;
      letter-spacing: -0.47px;
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

  & .wrapper__content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    align-self: stretch;

    & .wrapper__item {
      max-width: 7.5rem;
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    & .wrapper__content {
      align-content: center;
      gap: 1rem;
      flex-wrap: wrap;

      & .wrapper__item {
        max-width: 4 0.5rem;
      }
    }
  }
`;
