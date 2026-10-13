import styled from "@emotion/styled";

import { down } from "../../../_utils/breakpoints";
import { truncateTextInRows } from "../../../_utils/utils";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  align-self: stretch;

  & .section__text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    align-self: stretch;
    max-width: 50rem;

    & .section__title {
      margin: 0;
      color: var(--gray-900, #0c1520);
      font-size: 2rem;
      font-style: normal;
      font-weight: 600;
      line-height: 2.5rem;
      ${truncateTextInRows(2)}
    }

    & .section__description {
      color: var(--gray-700, #424b56);
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.25rem;
      letter-spacing: 0.0156rem;
      ${truncateTextInRows(2)}
    }
  }

  & .section__items {
    display: flex;
    align-items: stretch;
    align-self: stretch;
    border: 1px solid var(--gray-200, #e4e9f0);
    border-radius: 0.75rem;
    padding: 0.5rem 1.25rem;
  }

  & .section__item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1 1 0;
    min-width: 0;
    padding: 0 1.25rem;

    &:first-of-type {
      padding-left: 0;
    }

    &:last-of-type {
      padding-right: 0;
    }

    /* short divider centered in the gap between items */
    &:not(:last-of-type)::after {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 2.25rem;
      background: var(--gray-200, #e4e9f0);
    }
  }

  & .item__icon-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 999px;
    background: #fff1e9;
    color: #ff7621;
    font-size: 1.5rem;
  }

  & .item__text {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  & .item__title {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: var(--gray-900, #0c1520);
    font-size: 1.375rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.75rem;
  }

  /* desktop shows the icon only in the circle; mobile shows it inline */
  & .item__title .item__icon-inline {
    display: none;
  }

  & .item__description {
    color: var(--gray-500, #7a8594);
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1rem;
    letter-spacing: 0.025rem;
  }

  @media ${down("S")} {
    gap: 1.25rem;

    & .section__text {
      & .section__title {
        font-size: 1.375rem;
        line-height: 1.75rem;
      }

      & .section__description {
        ${truncateTextInRows(5)}
      }
    }

    /* borderless 2x2 grid */
    & .section__items {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      border: none;
      padding: 0;
    }

    & .section__item {
      padding: 0;

      &:first-of-type,
      &:last-of-type {
        padding: 0;
      }

      /* only left-column items get a divider */
      &:nth-of-type(even)::after {
        display: none;
      }
    }

    & .item__icon-circle {
      display: none;
    }

    & .item__title .item__icon-inline {
      display: inline-flex;
      font-size: 1rem;
      color: var(--gray-900, #0c1520);
    }

    & .item__title {
      font-size: 1rem;
      line-height: 1.5rem;
      letter-spacing: 0.0063rem;
    }

    & .item__description {
      font-size: 0.75rem;
      line-height: 1rem;
      letter-spacing: 0.025rem;
    }
  }
`;
