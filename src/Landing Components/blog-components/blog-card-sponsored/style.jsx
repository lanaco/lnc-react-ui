import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";
import { truncateTextInRows } from "../../../_utils/utils";
import { Link } from "react-router-dom";

export const Wrapper = styled(Link)`
  text-decoration: none;
  color: var(--gray-950);
  display: flex;
  padding: 1rem;
  align-items: center;
  gap: 1.25rem;
  border-radius: 1.25rem;
  align-items: stretch;
  border: ${(p) =>
    p?.isSponsored
      ? "2px solid var(--yellow-500, #f59e0b)"
      : "1px solid var(--neutral-9508, rgba(20, 22, 26, 0.08))"};
  background: var(--white, #fff);
  min-height: 10.5rem;
  position: relative;
  width: 100%;

  &:hover {
    cursor: pointer;
  }

  & .wrapper__sponsored {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    background: var(--yellow-500, #f59e0b);
    height: 2rem;
    width: 2rem;
    border-radius: 999px;

    & span {
      margin-top: 2px;
    }

    & i {
      color: var(--white, #fff);
    }
  }

  & .wrapper__image {
    width: 100%;
    object-fit: cover;
    height: auto;
    max-width: 12.5rem;
    min-width: 12.5rem;
    max-height: 9rem;
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

      & .wrapper__title {
        color: var(--gray-950, #14161a);
        font-size: 1rem;
        font-style: normal;
        font-weight: 600;
        line-height: 1.5rem;
        letter-spacing: 0.1px;
        ${truncateTextInRows(2)}
      }

      & .wrapper__tags {
        display: flex;
        gap: 0.25rem;
        flex-wrap: wrap;
      }
    }

    & .wrapper__info {
      display: flex;
      justify-content: space-between;
      width: 100%;

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

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    flex-direction: column;
    padding: 0;

    & .wrapper__image {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      max-width: 100%;
      min-width: 100%;
    }

    & .wrapper__content {
      gap: 1rem;
      padding: 0 1rem 1rem 1rem;

      & .wrapper__subcontent {
        order: 1;
      }

      & .wrapper__info {
        gap: 0.5rem;
        justify-content: space-between;
        order: 0;
      }
    }
  }
`;
