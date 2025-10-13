import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const TagsContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  align-content: center;

  & .tags__item {
    color: var(--gray-900, #0c1520);
    background: var(--gray-100, #f3f6fb);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.25rem;
    letter-spacing: -0.0056rem;
    padding: 0.5rem 0.75rem;

    &.active {
      color: var(--white, #fff);
      background: var(--gray-900, #0c1520);
      font-weight: 500;

      &:hover {
        color: var(--white, #fff);
        background: var(--gray-900, #0c1520);
      }
    }

    &:hover {
      background: var(--gray-200, #e4e9f0);
    }

    &:focus {
      outline: none;
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;

    -webkit-overflow-scrolling: touch;
    ::-webkit-scrollbar {
      -webkit-appearance: none;
    }
    -ms-overflow-style: none;
    /* Internet Explorer 10+ */
    scrollbar-width: none;
    /* Firefox */

    &::-webkit-scrollbar {
      display: none;
      /* Safari and Chrome */
    }
  }
`;

export const ItemsContainer = styled.div`
  display: flex;
  gap: 1.25rem;
  width: 100%;

  & .section__column {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    width: 100%;
  }

  & .section__show-more {
    color: var(--neutral-600, #0f2a46);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem;
    letter-spacing: -0.0056rem;

    &:focus {
      outline: none;
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    flex-direction: column;
  }
`;

export const ItemContainer = styled.div`
  width: 100%;
  height: fit-content;
  background: var(--white, #fff);
  border: 1px solid var(--gray-100, #f3f6fb);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 0.75rem;

  &:hover {
    cursor: pointer;
  }

  &.expanded {
    border: 1px solid #ff7621;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.16),
      0 1px 4px 0 rgba(255, 118, 33, 0.5) inset;
  }

  & .card__heading {
    display: flex;
    justify-content: space-between;
    width: 100%;

    & .card__title {
      color: var(--neutral-600, #0f2a46);
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.5rem;
    }

    & .card__icon {
      color: var(--neutral-600, #0f2a46);
    }
  }

  & .card__description {
    color: var(--neutral-400, #47607b);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.25rem;
    letter-spacing: 0.0156rem;
  }

  & .card__impression {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    & .imppression__question {
      color: var(--gray-500, #7a8594);
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1rem;
      letter-spacing: 0.0313rem;
    }

    & .impression__actions {
      display: flex;
      gap: 0.5rem;

      button {
        color: var(--gray-600, #676e79);

        &:focus {
          outline: none;
        }
      }
    }

    &.feedback {
      gap: 0.25rem;
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    & .card__impression {
      justify-content: space-between;

      &.feedback {
        justify-content: flex-start;
      }
    }
  }
`;
