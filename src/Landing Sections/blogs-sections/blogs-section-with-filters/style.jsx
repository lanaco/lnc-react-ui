import styled from "@emotion/styled";
import { down } from "../../../_utils/breakpoints";
import { mobileHorizontalScroll } from "../../../_utils/utils";

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: ${(p) => `repeat(${p.limit},  minmax(0, 1fr))`};
  gap: 1.25rem;

  @media ${down("M")} {
    grid-template-columns: repeat(2, 1fr);
  }

  /* Mobile: horizontal scroll row instead of a stacked grid. */
  @media ${down("S")} {
    ${mobileHorizontalScroll("17.5rem")}
  }
`;
