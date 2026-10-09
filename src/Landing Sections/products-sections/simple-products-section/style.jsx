import styled from "@emotion/styled";
import { down } from "../../../_utils/breakpoints";
import { mobileHorizontalScroll } from "../../../_utils/utils";

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1.25rem;

  & .text-block-v1 {
    grid-column: 1 / 4;
    max-width: 27rem;
    margin: auto;
  }

  /* Tablet (768–1024px) – text 3/4 left, 1 card top-right, 4 equal product cols below */
  @media ${down("M")} {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;

    & .text-block-v1 {
      grid-column: 1 / 4;
      grid-row: 1;
      max-width: unset;
      margin: 0;
      align-self: start;
    }

    & .simple-product-card:nth-of-type(1) {
      grid-column: 4;
      grid-row: 1;
    }

    & .simple-product-card:nth-of-type(n + 2) {
      grid-column: span 1;
      grid-row: auto;
    }
  }

  /* Mobile (≤767px) – title full width above, horizontal scroll row of
     products below. The cards are wrapped in .simple-products__mobile-row
     (rendered only on mobile) so the text block does not scroll with them. */
  @media ${down("S")} {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    & .text-block-v1 {
      max-width: unset;
      margin: 0;
    }

    & .simple-products__mobile-row {
      ${mobileHorizontalScroll("10.5rem")}
    }
  }
`;
