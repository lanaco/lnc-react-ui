import styled from "@emotion/styled";
import { down } from "../../../_utils/breakpoints";
import { mobileHorizontalScroll } from "../../../_utils/utils";

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: ${(p) => `repeat(${p.limit},  minmax(0, 1fr))`};
  gap: 1.25rem;

  /* Items beyond "limit" are only shown in the mobile scroll row. */
  & > .blog-card--extra {
    display: none;
  }

  @media ${down("M")} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  /* Mobile: horizontal scroll row instead of a stacked grid. */
  @media ${down("S")} {
    ${mobileHorizontalScroll("18rem")}

    & > .blog-card--extra {
      display: flex;
    }
  }
`;

export const FilterPills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;

  & .filter-pill {
    display: inline-flex;
    align-items: center;
    min-height: 2.5rem;
    padding: 0 1rem;
    border-radius: 999px;
    border: none;
    background: var(--gray-100, #f3f6fb);
    color: var(--gray-950, #14161a);
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: 2px solid var(--gray-400, #96a2b2);
      outline-offset: 2px;
    }
  }

  & .filter-pill.active {
    background: var(--gray-950, #14161a);
    color: var(--white, #fff);
  }
`;
