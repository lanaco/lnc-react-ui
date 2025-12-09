import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  & .section__heading {
    display: flex;
    justify-content: space-between;
  }

  & .section__title {
    color: var(--gray-950, #14161a);
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 2rem;
    letter-spacing: -0.0294rem;

    & i {
      font-size: 1.5rem;
      color: var(--primary-500, #f59e0b);
    }
  }

  & .section__items {
    display: grid;
    grid-template-columns: ${(p) => `repeat(${p.limit},  minmax(0, 1fr))`};
    gap: 2rem;
  }

  & .section__show-more {
    color: var(--neutral-600, #0f2a46);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem;
    letter-spacing: -0.0056rem;
    width: 100%;
    max-width: 100%;
    align-self: center;

    &:focus {
      outline: none;
    }
  }

  & .section__view-all {
    white-space: nowrap;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    & .section__items {
      display: flex;
      gap: 1rem;
      overflow-x: auto;

      -webkit-overflow-scrolling: touch;
      ::-webkit-scrollbar {
        -webkit-appearance: none;
      }
      -ms-overflow-style: none;
      /* Internet Explorer 10+ */
      scrollbar-width: none;
      /* Firefox */

      &::-webkit-scrollbar {
        display: none;
        /* Safari and Chrome */
      }
    }
  }
`;
