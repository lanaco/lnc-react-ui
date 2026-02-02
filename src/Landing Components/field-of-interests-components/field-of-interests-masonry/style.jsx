import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";
import { truncateTextInRows } from "../../../_utils/utils";


export const Wrapper = styled.a`
  text-decoration: none;
  color: var(--gray-950);
  display: flex;
  width: 100%;
  height: fit-content;
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

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    & .wrapper__content {
      & .wrapper__title {
        font-size: 0.875rem;
        line-height: 1.25rem;
      }

      & .wrapper__description {
        display: none;
      }
    }
  }
`;

export const TagWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  height: 100%;
  max-width: 8rem;
  min-width: 8rem;

  &:hover {
    cursor: pointer;
  }

  & .wrapper__icon {
    display: flex;
    width: 2.75rem;
    height: 2.75rem;
    padding: 0.5rem;
    align-items: center;
    font-size: 1.75rem;
    color: var(--gray-950, #14161a);
    background: var(--neutral-95004, rgba(20, 22, 26, 0.04));
    border-radius: 999px;

    &:hover {
      background: var(--neutral-95008, rgba(20, 22, 26, 0.08));
    }

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
    max-width: 8rem;
    ${truncateTextInRows(2)}
  }

  &.active {
    & .wrapper__icon {
      background: var(--gray-950, #14161a);
      color: var(--white, #fff);
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    max-width: unset;
    min-width: unset;
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;
    border-radius: 999px;
    background: var(--neutral-95004, rgba(20, 22, 26, 0.04));
    padding: 0 0.75rem;

    &.active {
      background: var(--gray-950, #14161a);
      & .wrapper__icon {
        background: transparent;
      }

      & .wrapper__text {
        color: var(--white, #fff);
      }
    }

    & .wrapper__icon {
      display: flex;
      width: 1.25rem;
      width: 1.25rem;
      padding: 0;
      align-items: center;
      font-size: 1.25rem;
      color: var(--gray-950, #14161a);
      background: transparent;
      border-radius: 0;
    }

    & .wrapper__text {
      font-size: 0.875rem;
      line-height: 1.25rem;
      white-space: nowrap;
      max-width: unset;
    }
  }
`;
