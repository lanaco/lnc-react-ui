import styled from "@emotion/styled";
import { down, only } from "../../../_utils/breakpoints";

const GAP = "2rem";

const cardMax = (count, gap = GAP) =>
  `calc((100% - ${count - 1} * ${gap}) / ${count})`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;

  & .section__heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }

  & .section__title {
    margin: 0;
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

  & .section__options {
    & button {
      &:focus {
        outline: none;
        outline-offset: 0;
      }
    }
  }

  /* auto-fit + a computed max track width (same as the web): fewer items than
     \`limit\` stay packed at their normal width instead of stretching. */
  & .section__items {
    display: grid;
    grid-template-columns: ${(p) =>
      `repeat(auto-fit, minmax(0, ${cardMax(p.limit || 4)}))`};
    justify-content: flex-start;
    gap: ${GAP};
  }

  @media ${only("M")} {
    & .section__items {
      grid-template-columns: repeat(auto-fit, minmax(0, ${cardMax(6)}));
    }
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

  @media ${down("S")} {
    gap: 1.25rem;

    & .section__title {
      font-size: 1.375rem;
      line-height: 1.75rem;
    }

    & .section__items {
      display: flex;
      gap: 1rem;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      -ms-overflow-style: none;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }

      & > .product-card {
        flex: 0 0 auto;
        width: 8.875rem;
        min-width: 8.875rem;
      }
    }

    /* Like the web: no load-more control on mobile, the row just scrolls. */
    & .section__show-more {
      display: none;
    }
  }
`;
