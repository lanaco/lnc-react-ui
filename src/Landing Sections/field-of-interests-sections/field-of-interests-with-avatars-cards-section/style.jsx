import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  & .wrapper__heading {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;

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

  & .wrapper__avatars {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 2rem;
    align-self: stretch;
    flex-wrap: wrap;
  }

  & .wrapper__cards {
    display: flex;
    max-width: 76rem;
    height: auto;
    align-items: center;
    gap: 1.25rem;
    flex-shrink: 0;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    & .wrapper__avatars {
      justify-content: space-between;
      gap: 1rem;
    }

    & .wrapper__cards {
      justify-content: center;
      align-content: center;
      gap: 1rem;
      align-self: stretch;
      flex-wrap: wrap;

      & > div {
        max-width: 10rem;
        max-height: 10rem;
      }
    }
  }
`;
