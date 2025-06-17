import styled from "@emotion/styled";

import {
  truncateTextInRows,
  linearGradientAnimation,
} from "../../../_utils/utils";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 0.75rem;
  position: relative;
  max-height: 28.75rem;

  & .wrapper__overlay {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      border-radius: 0.75rem;
      left: 0;
      top: 0;
      width: 100%;
      height: 99%;
      max-height: 28.75rem;
      background: ${(p) => p?.overlay};
    }
  }

  & .wrapper__image {
    border-radius: 0.75rem;
  }

  & .wrapper__image--skeleton {
    width: 100%;
    border-radius: 0.75rem;
    background-color: ${linearGradientAnimation("-90deg")};
  }

  & .wrapper__text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    position: absolute;
    top: 0;
    left: 0;

    & .text__title {
      color: var(--white);
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.5rem;
      ${truncateTextInRows(2)}
    }

    & .text__description {
      color: var(--white);
      font-size: 1.375rem;
      font-style: normal;
      font-weight: 600;
      line-height: 1.75rem;
      ${truncateTextInRows(2)}
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
  }

  & .text__action {
    background: var(--white);
    color: var(--black);
    position: absolute;
    bottom: 1rem;
    left: 1rem;

    &:hover {
      background: var(--primary-500, #f59e0b);
      color: var(--white);
    }
  }

  & .text__action--skeleton {
    background-color: ${linearGradientAnimation("-90deg")};
    height: 2rem;
    width: 9rem;
    position: absolute;
    bottom: 1rem;
    left: 1rem;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    max-height: 100%;

    & .wrapper__overlay {
      &::after {
        max-height: 100%;
      }
    }

    & .wrapper__text {
      top: 1rem;
      left: 1rem;
    }

    & .text__action {
      bottom: 2rem;
      left: 2rem;
    }
  }
`;
