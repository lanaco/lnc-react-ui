import styled from "@emotion/styled";
import { down } from "../../../_utils/breakpoints";

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

  /* Mobile (≤767px) – title full width above, 2-col product grid below */
  @media ${down("S")} {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    & .text-block-v1 {
      grid-column: 1 / -1;
      grid-row: 1;
      max-width: unset;
      margin: 0 0 1rem 0;
      align-self: stretch;
    }

    & .simple-product-card:nth-of-type(1),
    & .simple-product-card:nth-of-type(n + 2) {
      grid-column: auto;
      grid-row: auto;
      max-width: unset;
      min-width: unset;
      width: unset;
    }
  }

  /* Small phones (≤480px) – single column */
  @media ${down("XS")} {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;
