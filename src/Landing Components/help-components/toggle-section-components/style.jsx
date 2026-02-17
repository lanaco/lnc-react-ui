import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const OptionsContainer = styled.div`
  display: flex;

  border: 1px solid var(--gray-200, #e4e9f0);
  border-radius: 999px;

  & .options__item {
    display: flex;
    padding: 0.5rem 2rem;
    align-items: center;
    gap: 6px;

    color: var(--neutral-600, #0f2a46);
    background: var(--gray-100, #f3f6fb);
    border: 1px solid var(--gray-200, #e4e9f0);
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.5rem;

    &:first-of-type {
      padding-right: 3rem;
    }

    &:last-of-type {
      padding-left: 3rem;
    }

    &.active {
      color: var(--white, #fff);
      background: var(--neutral-600, #0f2a46);
      font-weight: 500;

      &:hover {
        color: var(--white, #fff);
        background: var(--neutral-600, #0f2a46);
      }

      &:first-of-type {
        margin-right: -1.5rem;
        padding-right: 2rem;
        z-index: 1;
      }

      &:last-of-type {
        margin-left: -1.5rem;
        padding-left: 2rem;
        z-index: 1;
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

    & .options__item {
      width: 100%;
    }
  }
`;

export const ItemsContainer = styled.div`
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-items: stretch;
  width: 100%;

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

    & .learn-more {
      display: none;
    }
  }
`;

export const ItemContainer = styled.a`
  text-decoration: none;
  color: var(--gray-950);
  display: flex;
  padding: 2rem 1.25rem 1.25rem 1.25rem;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid var(--gray-200, #e4e9f0);
  background: var(--white, #fff);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 17.5rem;

  &:hover {
    cursor: pointer;
  }

  & .card__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;

    & .card__image {
      max-width: 3.5rem;
      max-height: 3.5rem;
      width: 100%;
      height: 100%;
      aspect-ratio: 1 / 1;
    }

    & .card__text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;

      & .card__title {
        color: var(--gray-900, #0c1520);
        text-align: center;
        font-size: 1.125rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.5rem;
      }

      & .card__divider {
        height: 1px;
        width: 100%;
        background: var(--gray-200, #e4e9f0);
      }

      & .card__description {
        color: var(--gray-600, #5a6573);
        text-align: center;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.25rem;
        letter-spacing: 0.0156rem;
      }
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    max-width: 100%;
    flex-direction: row;
    padding: 1rem;

    & .card__content {
      flex-direction: row;
      align-items: flex-start;

      & .card__image {
        max-width: 2.5rem;
        max-height: 2.5rem;
      }

      & .card__text {
        align-items: flex-start;
        gap: 0.625rem;

        & .card__divider {
          display: none;
        }

        & .card__title {
          text-align: left;
          font-size: 1rem;
        }

        & .card__description {
          text-align: left;
        }
      }
    }
  }
`;
