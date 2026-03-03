import styled from "@emotion/styled";

import { down } from "../../../_utils/breakpoints";

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

  & .wrapper__tags__external {
    width: 100%;
  }

  & .wrapper__tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    gap: 2rem;
  }

  & .wrapper__cards {
    display: grid;
    grid-template-columns: ${(p) =>
      `repeat(${p?.limitCards}, minmax(12.5rem, 1fr))`};
    grid-auto-rows: 0.625rem;
    gap: 0.625rem;
    width: 100%;
    position: relative;

    & .wrapper__card {
      overflow: hidden;
    }
  }

  @media ${down("M")} {
    & .wrapper__tags {
      gap: 0.75rem;
    }

    & .wrapper__cards {
      grid-template-columns: repeat(2, minmax(12.5rem, 1fr));
    }
  }

  @media ${down("S")} {
    gap: 1rem;

    & .wrapper__cards {
      grid-template-columns: ${(p) =>
        `repeat(${p?.limitCardsForMobile}, minmax(0, 1fr))`};
    }
  }
`;
