import styled from "@emotion/styled";
import { down, only } from "../../../_utils/breakpoints";
import { mobileHorizontalScroll } from "../../../_utils/utils";
import {
  DARK_BACKGROUND,
  detailedCardDarkOverrides,
  hiddenScrollbar,
} from "../_shared";

const cardMax = (count, gap) => `calc((100% - ${count - 1} * ${gap}) / ${count})`;

export const GridWrapper = styled.div`
  --h-padding: ${(p) => (p.darkMode ? "1.25rem" : "3rem")};
  --card-gap: ${(p) => (p.darkMode ? "1.5rem" : "2.97rem")};

  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  box-sizing: border-box;
  padding: 1.75rem var(--h-padding);
  border: 1.5px solid
    ${(p) => (p.darkMode ? "transparent" : "var(--danger-600, #e11d48)")};
  background-color: ${(p) =>
    p.darkMode ? DARK_BACKGROUND : "var(--danger-50, #fff1f2)"};
  border-radius: 0.75rem;

  ${(p) => (p.darkMode ? detailedCardDarkOverrides : "")}

  & .urgent-tag {
    position: absolute;
    left: 1rem;
    top: -0.75rem;
    min-height: 1.5rem;
    max-height: 1.5rem;
    border-radius: 0.375rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.25rem;
    gap: 0.12rem;
    font-weight: 500;
    font-size: 0.875rem;
    color: var(--white, #fff);
    background-color: var(--danger-600, #e11d48);
  }

  /* auto-fit + a computed max track width (same as the web) so fewer items
     than \`limit\` stay packed instead of stretching / leaving gaps. */
  & .urgent-products__grid {
    display: grid;
    grid-template-columns: ${(p) =>
      `repeat(auto-fit, minmax(0, ${cardMax(p.limit || 5, "var(--card-gap)")}))`};
    justify-content: flex-start;
    gap: var(--card-gap);
  }

  /* scrollHorizontal: breaks out of the side padding so the scroll buttons
     sit on the border, like the web. */
  & .urgent-products__viewport {
    margin-inline: calc(-1 * var(--h-padding));
    width: calc(100% + 2 * var(--h-padding));
  }

  & .urgent-products__scroll-row {
    display: flex;
    flex-wrap: nowrap;
    gap: var(--card-gap);
    padding-left: var(--h-padding);
    scroll-behavior: smooth;
    ${hiddenScrollbar}

    & > .product-card {
      flex: 0 0 ${(p) => cardMax(p.limit || 5, "var(--card-gap)")};
      min-width: 0;
    }
  }

  & .product-card {
    animation-duration: 0.2s;
    animation-name: animate-fade;
    animation-delay: 0.2s;
    animation-fill-mode: backwards;
    transition: all 0.25s ease;

    @keyframes animate-fade {
      0% {
        transform: scale(0.9);
        -webkit-transform: scale(0.9);
      }
      100% {
        transform: scale(1);
        -webkit-transform: scale(1);
      }
    }
  }

  @media ${only("M")} {
    --h-padding: 2rem;
    --card-gap: 1.5rem;
    padding: 2rem;

    & .urgent-products__grid {
      grid-template-columns: repeat(
        auto-fit,
        minmax(0, ${cardMax(3, "1.5rem")})
      );
    }

    & .urgent-products__scroll-row > .product-card {
      flex-basis: ${cardMax(3, "1.5rem")};
    }
  }

  /* Mobile: every card in one horizontal scroll row. The row is a separate
     element (.urgent-products__mobile-row) so overflow-x does not clip the
     absolutely positioned .urgent-tag on the wrapper. */
  @media ${down("S")} {
    padding: 2rem 1.25rem;
    gap: 1.19rem;

    & .urgent-products__mobile-row {
      ${mobileHorizontalScroll("8.875rem")}
    }

    & .product-card {
      & img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;
