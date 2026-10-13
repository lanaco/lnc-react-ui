import styled from "@emotion/styled";
import { down } from "../../../_utils/breakpoints";
import { DARK_BACKGROUND, hiddenScrollbar } from "../_shared";

const GAP = "1.25rem";

const cardBasis = (count, gap = GAP) =>
  `calc((100% - ${count - 1} * ${gap}) / ${count})`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  box-sizing: border-box;

  ${(p) =>
    p.darkMode
      ? `
    background: ${DARK_BACKGROUND};
    border-radius: 0.75rem;
    padding: 1.25rem;
  `
      : ""}

  & .simple-products__row {
    display: flex;
    gap: ${GAP};
    scroll-behavior: smooth;
    ${hiddenScrollbar}
  }

  & .simple-products__row > .simple-product-card,
  & .simple-products__row > .end-cta {
    flex: 0 0 ${(p) => cardBasis(p.limit || 6)};
    min-width: 0;
  }

  @media ${down("M")} {
    & .simple-products__row > .simple-product-card,
    & .simple-products__row > .end-cta {
      flex-basis: ${cardBasis(4)};
    }
  }

  @media ${down("S")} {
    ${(p) => (p.darkMode ? "padding: 1rem;" : "")}

    & .simple-products__row {
      gap: 1rem;
      scroll-snap-type: x mandatory;
    }

    & .simple-products__row > .simple-product-card {
      flex: 0 0 auto;
      width: 10.5rem;
      min-width: 10.5rem;
      scroll-snap-align: start;
    }

    & .simple-products__row > .end-cta {
      flex: 0 0 auto;
    }
  }
`;

// Kept for backward compatibility (was the old grid wrapper export).
export const GridWrapper = Section;
