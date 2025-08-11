import styled from "@emotion/styled";

import {
  linearGradientAnimation,
  truncateTextInRows,
} from "../../../_utils/utils";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1.25rem;
  border: 1px solid var(--neutral-9508, rgba(20, 22, 26, 0.08));
  background: var(--Lanaco-Gray-white, #fff);
  width: 100%;
  height: 100%;
  justify-content: space-between;
  /* drop-shadow-sm */
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);

  &:hover {
    cursor: pointer;
  }

  & .wrapper__content {
    display: flex;
    padding: 1.25rem;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    align-self: strech;

    & .wrapper__image {
      object-fit: cover;
      aspect-ratio: 1 / 1;
      max-height: 4rem;
      border-radius: 999px;
    }
  }

  & .wrapper__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.375rem;

    & .wrapper__title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--gray-950, #14161a);
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.5rem;
      letter-spacing: -0.0112rem;
      ${truncateTextInRows(2)}
      text-align: center;
    }

    & .wrapper__subtitle {
      color: var(--gray-600, #676e79);
      text-align: center;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.25rem;
      letter-spacing: -0.0056rem;
      ${truncateTextInRows(2)}
    }

    & .wrapper__badges {
    }

    & .wrapper__rating {
      display: flex;
      align-items: center;
      gap: 0.25rem;

      & .wrapper__star {
        & i {
          color: var(--warning-500);
        }

        & .gold-star {
          & i {
            color: var(--gray-500);
          }
        }
      }

      & .wrapper__review-count {
        color: var(--gray-600, #676e79);
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1rem;
        letter-spacing: 0.01px;
      }
    }
  }

  & .wrapper__products {
    display: flex;
    align-items: flex-start;
    column-gap: 1px;
    width: 100%;

    & .wrapper__product {
      overflow: hidden;
      cursor: pointer;
      width: 100%;
      max-height: 5.75rem;

      &:first-child {
        border-radius: 0 0 0 1.25rem;
      }

      &:last-child {
        border-radius: 0 0 1.25rem 0;
      }

      & .product__image {
        width: 100%;
        aspect-ratio: 1 / 1;
        height: calc(100% / 3);
        max-height: 5.75rem;
        object-fit: cover;
      }
    }
  }
`;

export const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 0;
  border-radius: 1.25rem;
  border: 1px solid var(--neutral-9508, rgba(20, 22, 26, 0.08));
  background: var(--Lanaco-Gray-white, #fff);
  width: 100%;

  /* drop-shadow-sm */
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);

  & .wrapper__content {
    display: flex;
    padding: 1.25rem;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    align-self: strech;
    width: 100%;

    & .wrapper__image {
      width: 4rem;
      height: 4rem;
      border-radius: 999px;
      background-color: ${linearGradientAnimation("-90deg")};
    }
  }

  & .wrapper__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.375rem;
    width: 100%;

    & .wrapper__info-item {
      background-color: ${linearGradientAnimation("-90deg")};
      height: 1rem;
      width: 100%;
    }
  }
`;
