import styled from "@emotion/styled";

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
    aspect-ratio: 1 / 1;
    object-fit: cover;
    height: auto;
    border-radius: 0.75rem 0.75rem 0 0;
  }

  & .wrapper__content {
    display: flex;
    padding: 0.75rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    align-self: stretch;

    & .wrapper__title {
      color: var(--gray-950, #14161a);
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.5rem;
      ${truncateTextInRows(2)}
    }

    & .wrapper__description {
      color: var(--gray-600, #676e79);
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1rem;
      letter-spacing: 0.025rem;
      ${truncateTextInRows(2)}
    }
  }
`;

export const SkeletonWrapper = styled.div`
  width: 100%;
  height: 11.625rem;
  border-radius: 0.75rem;
  background: ${linearGradientAnimation("-90deg")};
`;

export const TagWrapper = styled.div`
  display: flex;
  padding: 0 0.5rem 0 0;
  align-items: center;
  justify-content: center;
  background: var(--neutral-9504, rgba(20, 22, 26, 0.04));
  border-radius: 999px;

  &:hover {
    cursor: pointer;
  }

  & .wrapper__icon {
    font-size: 1.75rem;
    color: var(--gray-950, #14161a);
    border-radius: 999px;
    width: 2.75rem;
    height: 2.75rem;

    & i {
      width: auto;
    }
  }

  & .wrapper__text {
    color: var(--gray-950, #14161a);
    text-align: center;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem;
  }

  &.active {
    background: var(--yellow-600, #d97706);

    & .wrapper__icon {
      color: var(--white, #fff);
    }

    & .wrapper__text {
      color: var(--white, #fff);
    }
  }
`;

export const TagSkeletonWrapper = styled.div`
  width: 7rem;
  height: 3rem;
  border-radius: 999px;
  background: ${linearGradientAnimation("-90deg")};
`;
