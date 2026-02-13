import styled from "@emotion/styled";

import { truncateTextInRows } from "../../../_utils/utils";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const Container = styled.div`
  display: flex;
  align-items: center;

  border-radius: 0.75rem;
  border: 1px solid var(--gray-95008);

  background: ${(p) => p?.backgroundColor};

  /* drop-shadow */
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px 0px rgba(0, 0, 0, 0.06);

  & .section__left {
    width: 100%;

    & .section__image {
      height: 100%;

      & img {
        height: 100%;
        max-height: 11.25rem;
        border-top-left-radius: 0.75rem;
        border-bottom-left-radius: 0.75rem;
      }
    }
  }

  & .section__right {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 2rem;
    padding: 2rem;

    & .section__text {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      & .section__title {
        ${truncateTextInRows(3)}
        color: #000;
        font-weight: 600;
        font-size: 1.75rem;
        leading-trim: none;
        line-height: 2.25rem;
        letter-spacing: 0%;
        max-height: 7rem;
      }

      & .section__description {
        ${truncateTextInRows(2)}
        color: var(--gray-600, #676e79);
        font-weight: 500;
        font-size: 0.875rem;
        leading-trim: none;
        line-height: 1.25rem;
        letter-spacing: 0;
        max-height: 2.5rem;
      }
    }

    & .section__action {
      font-weight: 500;
      font-size: 0.875rem;
      leading-trim: none;
      line-height: 1.25rem;
      letter-spacing: -0.0056rem;
      white-space: nowrap;

      background: var(--gray-950, #14161a);
      color: var(--white, #fff);

      &:hover {
        background: var(--gray-700, #4e555f);
      }

      &:focus {
        outline: none;
      }
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    flex-direction: column;

    & .section__left {
      & .section__image {
        & img {
          width: 100%;
          height: 100%;
          max-height: 100%;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
      }
    }

    & .section__right {
      flex-direction: column;
    }
  }
`;
