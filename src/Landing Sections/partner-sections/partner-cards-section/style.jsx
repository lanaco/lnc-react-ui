import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";
import { truncateText, truncateTextInRows } from "../../../_utils/utils";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  border-radius: 1.25rem;
  padding: 2rem;
  background: #f4f6fb;

  & .section__text {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    & .section__title {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      gap: 1rem;

      & span {
        font-weight: 600;
        font-size: 1.5rem;
        leading-trim: none;
        line-height: 2rem;
        letter-spacing: 0%;
        text-align: center;
        color: var(--gray-900, #0c1520);
        ${truncateText()}
      }

      &::after {
        content: "";
        flex: 1;
        height: 0.0625rem;
        background-color: var(--gray-200, #e4e9f0);
      }

      &::before {
        content: "";
        flex: 1;
        height: 0.0625rem;
        background-color: var(--gray-200, #e4e9f0);
      }
    }

    & .section__description {
      font-weight: 400;
      font-size: 0.875rem;
      leading-trim: none;
      line-height: 1.25rem;
      letter-spacing: 0.0156rem;
      text-align: center;
      color: var(--gray-700, #424b56);
      ${truncateTextInRows(2)}
    }
  }

  & .section__items {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1.5rem;

    & .section__item {
      width: 100%;
      height: 100%;
      max-width: 16.25rem;
      max-height: 7.5rem;
      border-radius: 0.5rem;
      border: 1px solid var(--gray-200, #e4e9f0);
      overflow: hidden;

      & img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        filter: grayscale(100%);
        transition: filter 0.3s ease;

        &:hover {
          filter: grayscale(0%);
        }
      }

      &:hover {
        cursor: pointer;
      }
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    padding: 1rem;

    & .section__text {
      & .section__title {
        font-size: 1.25rem;
        line-height: 1.75rem;
      }
    }

    & .section__items {
      display: grid;
      grid-template-columns: ${() => `repeat(2, minmax(0, auto))`};
      justify-items: center;
      gap: 1rem;

      & .section__trigger {
        width: 100% !important;
      }

      & .section__item {
        max-width: 100%;
        max-height: 5rem;
      }
    }
  }
`;

export const PopoverContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 16.25rem;
  max-height: 12.5rem;
  border-radius: 0.75rem;
  padding: 1.25rem;
  background: var(--gray-200, #e4e9f0);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);

  font-weight: 400;
  font-size: 0.75rem;
  leading-trim: none;
  line-height: 1rem;
  letter-spacing: 0.025rem;
  color: var(--gray-900, #0c1520);
`;
