import styled from "@emotion/styled";
import { down } from "../../../_utils/breakpoints";

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

  @media ${down("S")} {
    & .regular-title {
      font-size: 1.375rem;

      &.center {
        justify-content: center;
      }
    }
  }
`;

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: ${() => `repeat(12,  minmax(0, 1fr))`};

  grid-template-rows: 15rem 15rem;
  grid-column-gap: 1.25rem;
  grid-row-gap: 1.25rem;
  height: 30rem;
  max-height: 30rem;

  @media ${down("M")} {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  @media ${down("S")} {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    width: 100%;
    height: 100%;
    max-height: 100%;
  }
`;
