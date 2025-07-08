import styled from "@emotion/styled";

import { truncateTextInRows } from "../../../_utils/utils";

export const Wrapper = styled.div`
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
        ${truncateTextInRows(3)}
      }

      & .wrapper__tags {
        display: flex;
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
      }
    }
  }

  @media (max-width: 400px) {
    flex-direction: column;

    & .wrapper__content {
      gap: 1rem;

      & .wrapper__info {
        gap: 0.5rem;
        flex-direction: column;
      }
    }
  }
`;
