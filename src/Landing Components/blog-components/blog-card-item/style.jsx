import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";
import { truncateTextInRows } from "../../../_utils/utils";

export const Wrapper = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
  gap: 1.25rem;
  border-radius: 1.25rem;
  align-items: stretch;
  border: 1px solid var(--neutral-9508, rgba(20, 22, 26, 0.08));
  background: var(--white, #fff);
  min-height: 9.5rem;
  position: relative;
  width: 100%;

  & .mobile-only {
    display: none;
  }

  &:hover {
    cursor: pointer;
  }

  & .wrapper__image {
    width: 100%;
    object-fit: cover;
    height: auto;
    max-height: 9.5rem;
    max-width: 17.75rem;
    border-radius: 0.75rem;
  }

  & .wrapper__content {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    & .wrapper__subcontent {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
      width: 100%;

      & .wrapper__title {
        color: var(--gray-950, #14161a);
        font-size: 1rem;
        font-style: normal;
        font-weight: 600;
        line-height: 1.5rem;
        letter-spacing: 0.1px;
        ${truncateTextInRows(3)}
      }

      & .wrapper__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;

        & .wrapper__tag {
          font-size: 0.75rem;
          font-style: normal;
          font-weight: 500;
          line-height: 1rem;
          letter-spacing: 0.5px;
          padding: 0.125rem 0.5rem;
          justify-content: center;
          align-items: center;
          gap: 0.25rem;
          height: 1.25rem;
          border: 1px solid;
        }
      }
    }

    & .wrapper__info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      & .info__content {
        display: flex;
        align-items: center;

        &:first-of-type {
          flex-grow: 1;
          gap: 1rem;
        }

        & .info__text {
          display: flex;
          gap: 0.5rem;
          color: var(--gray-600, #676e79);
          font-size: 0.75rem;
          font-style: normal;
          font-weight: 400;
          line-height: 1rem;
          letter-spacing: 0.4px;

          & i {
            color: var(--gray-300, #bcc4cf);
          }
        }
      }
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    flex-direction: column;
    padding: 0;
    background: transparent;
    border: none;

    & .wrapper__image {
      max-width: 100%;
    }

    & .desktop-only {
      display: none !important;
    }

    & .mobile-only {
      display: block;
    }

    & .wrapper__subcontent {
      order: 1;
    }

    & .wrapper__tags-action {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
    }

    & .wrapper__tags {
      flex: 1;
    }

    & .wrapper__content {
      gap: 1rem;

      & .wrapper__info {
        gap: 0.5rem;
        justify-content: space-between;
        width: 100%;
        order: 0;

        & .info__content {
          align-items: flex-start;
          justify-content: space-between;
          width: 100%;
        }
      }
    }
  }
`;
