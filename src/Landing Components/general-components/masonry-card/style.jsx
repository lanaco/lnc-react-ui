import styled from "@emotion/styled";

import {
  linearGradientAnimation,
  truncateTextInRows,
} from "../../../_utils/utils";
import { down } from "../../../_utils/breakpoints";

export const Wrapper = styled.a`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 0.75rem;
  position: relative;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  text-decoration: none;
  overflow: hidden;

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

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 0.5rem;
    width: 100%;
    background: ${(p) => p.borderColor || `transparent`};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }

  &:hover::after {
    transform: scaleX(1); /* ide na 100% */
  }

  

  & .wrapper__image {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 0.75rem;
    mix-blend-mode: multiply;
    transition: var(--transiton, all 0.2s ease);

    &:hover {
      transform: scale(1.2);
    }
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
      background-color: var(--white, #fff);
      color: var(--neutral-600, #0f2a46);
      border: 1px solid var(--gray-200, #e4e9f0);
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
        0 1px 2px 0 rgba(0, 0, 0, 0.06);
      transition: var(--transiton, all 0.2s ease);

      &:hover {
        background-color: var(--gray-200, #e4e9f0);
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

  @media ${down("S")} {
    & .wrapper__image {
      height: 100%;
      max-height: 14.5rem;
    }
  }
`;
