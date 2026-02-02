import styled from "@emotion/styled";

import { truncateTextInRows } from "../../../_utils/utils";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";


export const Wrapper = styled.a`
  text-decoration: none;
  color: var(--gray-950);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 0.75rem;
  border: 1px solid var(--neutral-9508, rgba(20, 22, 26, 0.08));
  background: var(--Lanaco-Gray-white, #fff);

  /* drop-shadow-sm */
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);

  & .wrapper__image {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    height: 100%;
    max-height: 10.375rem;
    border-radius: 0.75rem 0.75rem 0 0;
  }

  & .wrapper__content {
    display: flex;
    padding: 0.75rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    align-self: stretch;
    transition: var(--transition, all 0.2s ease);

    & .wrapper__title {
      transition: var(--transition, all 0.2s ease);
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
  cursor: pointer;
`;

export const TagWrapper = styled.div`
  display: flex;
  padding: 0 0.75rem 0 0.75rem;
  align-items: center;
  justify-content: center;
  background: var(--neutral-95004, rgba(20, 22, 26, 0.04));
  border-radius: 999px;
  min-width: 2.75rem;
  min-height: 2.75rem;

  &:hover {
    cursor: pointer;
    background: var(--neutral-95008, rgba(20, 22, 26, 0.08));
  }

  & .wrapper__icon {
    font-size: 1.75rem;
    color: var(--gray-950, #14161a);
    border-radius: 999px;
    margin-left: -0.5rem;

    & i {
      width: auto;

      &::after {
        margin-left: 0;
      }
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
    background: ${(p) => p?.activeColor || "var(--yellow-600, #d97706)"};

    & .wrapper__icon {
      color: var(--white, #fff);
    }

    & .wrapper__text {
      color: var(--white, #fff);
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    min-width: fit-content;
  }
`;
