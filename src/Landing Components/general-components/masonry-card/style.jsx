import styled from "@emotion/styled";

import {
  linearGradientAnimation,
  truncateTextInRows,
} from "../../../_utils/utils";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 0.75rem;
  position: relative;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  text-decoration: none;

  grid-column: ${(p) => p.position?.columnStart || "1"} /
    ${(p) => p.position?.columnEnd || "6"};
  grid-row: ${(p) => p.position?.rowStart || "1"} /
    ${(p) => p.position?.rowEnd || "1"};

  background: ${(p) =>
    p.backgroundColor ||
    `linear-gradient(
    178deg,
    rgba(0, 0, 0, 0) 1.5%,
    rgba(0, 0, 0, 0.16) 8.95%,
    #000 98.39%
  )`};

  & .wrapper__image {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 0.75rem;
    mix-blend-mode: multiply;
  }

  & .wrapper__image--skeleton {
    width: 24.5rem;
    height: 30rem;
    border-radius: 0.75rem;
    background-color: ${linearGradientAnimation("-90deg")};
  }

  & .wrapper__text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    position: absolute;
    bottom: 0;
    left: 0;
    gap: 0.75rem;

    & .text__title {
      transition: var(--transiton, all 0.2s ease);
      color: var(--white, #ffffff);
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.5rem;
      ${truncateTextInRows(2)}
    }

    & .text__tag {
      background-color: var(--warning-600, #d97706);
      color: var(--white, #ffffff);
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem;
      padding: 0.25rem 0.5rem;

      border-radius: 0.375rem;
      background: var(--warning-600, #d97706);
    }

    & .text__description {
      color: var(--white);
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.25rem;
      ${truncateTextInRows(2)}
    }

    & .text__action {
      background: var(--white);
      color: var(--black);

      &:hover {
        background: var(--primary-500, #f59e0b);
        color: var(--white);
      }
    }

    & .text__title--skeleton {
      background-color: ${linearGradientAnimation("-90deg")};
      height: 1rem;
      width: 9rem;
    }

    & .text__description--skeleton {
      background-color: ${linearGradientAnimation("-90deg")};
      height: 1rem;
      width: 12rem;
    }

    & .text__action--skeleton {
      background-color: ${linearGradientAnimation("-90deg")};
      height: 2rem;
      width: 9rem;
    }
  }
  cursor: pointer;

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    & .wrapper__image {
      height: 100%;
      max-height: 14.5rem;
    }
  }
`;
