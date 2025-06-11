import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const GridWrapper = styled.div`
  padding: 1.75rem 3rem;
  display: grid;
  grid-template-columns: ${(p) => `repeat(${p.limit || 5},  minmax(0, 1fr))`};

  gap: 2.97rem;

  border: 1.5px solid var(--danger-600, #e11d48);
  background-color: var(--danger-50, #fff1f2);
  position: relative;
  border-radius: 0.75rem;
  position: relative;

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

  & .show-more {
    grid-column: 1 / 3;
  }

  & .product-card {
    max-width: ${(p) =>
      `calc(${100 / p.desktopCols}% - ${
        ((p.desktopCols - 1) * p.columnGapRem) / p.desktopCols
      }rem)`};

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

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    grid-template-columns: repeat(2, 1fr);
    padding: 2rem 1.25rem;
    gap: 1.19rem;

    & .urgent-tag {
    }

    & .img-wrapper {
    }
  }
`;
