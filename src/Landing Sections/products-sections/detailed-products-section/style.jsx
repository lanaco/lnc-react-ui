import styled from "@emotion/styled";
import { down, only } from "../../../_utils/breakpoints";
import {
  DARK_BACKGROUND,
  detailedCardDarkOverrides,
  hiddenScrollbar,
} from "../_shared";

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
    ${detailedCardDarkOverrides}
  `
      : ""}

  & .section__options {
    & button {
      &:focus {
        outline: none;
        outline-offset: 0;
      }
    }
  }

  & .detailed-products__row {
    display: flex;
    gap: ${GAP};
    scroll-behavior: smooth;
    ${hiddenScrollbar}
  }

  & .detailed-products__row > .product-card,
  & .detailed-products__row > .end-cta {
    flex: 0 0 ${(p) => cardBasis(p.limit || 4)};
    min-width: 0;
  }

  @media ${only("M")} {
    & .detailed-products__row > .product-card,
    & .detailed-products__row > .end-cta {
      flex-basis: ${cardBasis(6)};
    }
  }

  @media ${down("S")} {
    ${(p) => (p.darkMode ? "padding: 1rem;" : "")}

    & .detailed-products__row {
      gap: 1rem;
    }

    & .detailed-products__row > .product-card {
      flex: 0 0 auto;
      width: 8.875rem;
      min-width: 8.875rem;
    }

    & .detailed-products__row > .end-cta {
      flex: 0 0 auto;
    }
  }
`;

// Kept for backward compatibility (was the old grid wrapper export).
export const GridWrapper = Section;
