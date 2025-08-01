import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";
import {
  linearGradientAnimation,
  truncateTextInRows,
} from "../../../_utils/utils";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 0.75rem;
  border: 1px solid var(--neutral-9508, rgba(20, 22, 26, 0.08));
  background: var(--Lanaco-Gray-white, #fff);

  &:hover {
    cursor: pointer;
  }

  /* drop-shadow-sm */
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);

  & .wrapper__image {
    width: 100%;
    object-fit: cover;
    height: auto;
    max-height: 19.5rem;
    border-radius: 0.75rem 0.75rem 0 0;
  }

  & .wrapper__content {
    display: flex;
    padding: 1rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
    align-self: stretch;

    & .wrapper__title {
      color: var(--gray-950, #14161a);
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.5rem;
      ${truncateTextInRows(2)}
      transition: var(--transition, all 0.2s ease);
    }
  }

  &:hover {
    cursor: pointer;

    & .wrapper__content {
      & .wrapper__title {
        color: var(--primary-500, #e87722);
      }
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    background: transparent;
    border: none;
    box-shadow: none;
    gap: 0.75rem;

    & .wrapper__image {
      border-radius: 999px;
      aspect-ratio: 1 / 1;
    }

    & .wrapper__content {
      align-items: center;
      padding: 0;
      text-align: center;

      & .wrapper__title {
        font-size: 0.875rem;
        line-height: 1.25rem;
      }
    }
  }
`;

export const SkeletonWrapper = styled.div`
  width: 100%;
  height: 11.625rem;
  border-radius: 0.75rem;
  background: ${linearGradientAnimation("-90deg")};

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    width: 5rem;
    height: 5rem;
    border-radius: 999px;
  }
`;

export const TagWrapper = styled.div`
  display: flex;
  padding: 0 0.5rem 0 0;
  align-items: center;
  justify-content: center;
  background: var(--white, #fff);
  border: 1px solid var(--neutral-95012, rgba(20, 22, 26, 0.12));
  border-radius: 999px;
  height: 2.5rem;

  &:hover {
    cursor: pointer;
  }

  & .wrapper__icon {
    font-size: 1.5rem;
    color: var(--gray-950, #14161a);
    border-radius: 999px;
    width: 2.5rem;
    height: 2.5rem;

    & i {
      width: auto;
    }
  }

  & .wrapper__text {
    color: var(--gray-950, #14161a);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem;
    letter-spacing: -0.09px;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    & .wrapper__text {
      white-space: nowrap;
    }
  }
`;

export const TagSkeletonWrapper = styled.div`
  width: 7rem;
  height: 3rem;
  border-radius: 999px;
  background: ${linearGradientAnimation("-90deg")};
`;
