import styled from "@emotion/styled";
import { down } from "../../../_utils/breakpoints";
import { mobileHorizontalScroll } from "../../../_utils/utils";

export const RegularTitleSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  & .regular-title {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: space-between;
    font-size: 1.5rem;
    font-weight: 600;
    & .regular-title-text {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    & i {
      font-size: 1.5rem;
      color: var(--primary-500, #f59e0b);
    }
  }

  & .section__title {
    margin: 0;
    color: var(--gray-950, #14161a);
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2rem;
    letter-spacing: -0.0294rem;
  }

  @media ${down("S")} {
    & .regular-title {
      font-size: 1.375rem;

      &.center {
        justify-content: center;
      }
    }

    & .section__title {
      font-size: 1.375rem;
      line-height: 1.75rem;
    }
  }
`;

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: 15rem 15rem;
  gap: 1.25rem;
  height: 30rem;
  max-height: 30rem;

  /* Mobile: one horizontal scroll row of 11rem cards (web parity). */
  @media ${down("S")} {
    ${mobileHorizontalScroll("11rem")}
    width: 100%;
    height: auto;
    max-height: none;
    /* overflow-x: auto also clips vertically - keep room for the shadow. */
    padding-block: 0.25rem 0.75rem;
  }
`;
