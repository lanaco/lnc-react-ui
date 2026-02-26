import styled from "@emotion/styled";

import { down } from "../../../_utils/breakpoints";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;

  & .section__title {
    color: var(--gray-950, #14161a);
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2rem;
    letter-spacing: -0.0294rem;
  }

  & .section__items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    width: 100%;
  }

  @media ${down("M")} {
    & .section__items {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media ${down("S")} {
    & .section__title {
      font-size: 1.375rem;
      line-height: 1.75rem;
    }

    & .section__items {
      grid-template-columns: 1fr;
    }
  }
`;
