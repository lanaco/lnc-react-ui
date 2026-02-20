import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const Container = styled.div`
  display: flex;
  height: 100%;
  max-height: 19rem;
  padding: 2rem;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
  background: ${(p) => (p?.imageUrl ? `url("${p?.imageUrl}")` : "white")};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 1.25rem;
  gap: 2rem;

  & .section__text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    align-self: stretch;
    max-width: 50rem;

    & .section__title {
      color: var(--white, #fff);
      font-weight: 600;
      font-size: 2rem;
      leading-trim: none;
      line-height: 2.5rem;
      letter-spacing: 0%;
    }

    & .section__description {
      color: var(--white, #fff);
      font-weight: 400;
      font-size: 0.875rem;
      leading-trim: none;
      line-height: 1.25rem;
      letter-spacing: 0.0156rem;
    }
  }

  & .section__items {
    display: grid;
    grid-template-columns: ${() => `repeat(2, minmax(0, auto))`};
    row-gap: 0.75rem;
    column-gap: 3rem;

    & .section__item {
      display: flex;
      gap: 0.5rem;

      & .item__text {
        color: var(--white, #fff);
        font-weight: 400;
        font-size: 0.75rem;
        leading-trim: none;
        line-height: 1rem;
        letter-spacing: 0.025rem;
      }
    }
  }

  & .section__action {
    background: var(--white, #fff);
    color: var(--gray-950, #14161a);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem;

    &:hover {
      color: var(--gray-700, #4e555f);
    }

    &:focus {
      outline: none;
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    max-height: 100%;
    padding: 1.5rem;

    & .section__text {
      max-width: 100%;

      & .section__title {
        font-size: 1.375rem;
        line-height: 1.75rem;
      }
    }

    & .section__items {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      & .section__item {
        display: flex;
        gap: 0.5rem;
      }
    }
  }
`;
