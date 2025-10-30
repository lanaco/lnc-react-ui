import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  align-self: stretch;

  & button {
    &:focus {
      outline: none;
    }
  }

  & .landing__main-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;

    border-right: 1px solid var(--gray-200, #dddfe4);
    padding-right: 2rem;

    & .pagination {
      padding: 1.25rem 0;
    }

    & .main-content__title {
      color: var(--gray-950, #14161a);
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 600;
      line-height: 2rem;
    }

    & .tags__item {
      &:not(.active) {
        background: var(--neutral-9504, rgba(20, 22, 26, 0.04));
      }
    }

    & .main-content__items {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;

      & .main-content__divider {
        content: "";
        display: block;
        height: 1px;
        width: 100%;
        background: var(--gray-200, #dddfe4);
      }

      & .blog-card-item {
        background: transparent;
        border: none;
        padding: 0;
      }
    }

    & .main-content__actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-self: stretch;
      width: 100%;

      & .main-content__search {
        border-radius: 999px;
        height: 2.5rem;
        min-height: 2.5rem;
        max-width: 23.75rem;
        width: 100%;

        border: 1px solid var(--gray-200, #e4e9f0);
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        outline: none;

        & input::placeholder {
          color: var(--gray-500, #7a8594);
          font-size: 0.875rem;
          font-style: normal;
          font-weight: 400;
          line-height: 1.25rem;
          letter-spacing: 0.0156rem;
        }

        & .main-content__search-prefix {
          color: var(--gray-500, #7a8594);
        }
      }

      & .main-content__sort-by {
        & button {
          border-radius: 999px;
          color: var(--gray-950, #14161a);
          background: var(--neutral-95004, rgba(20, 22, 26, 0.04));
          font-size: 0.875rem;
          font-style: normal;
          font-weight: 500;
          line-height: 1.25rem;
          letter-spacing: -0.0056rem;
        }
      }
    }
  }

  & .landing__side-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    align-self: stretch;

    & .side-content__title {
      color: var(--gray-950, #14161a);
      font-size: 1rem;
      font-style: normal;
      font-weight: 600;
      line-height: 1.5rem;
    }

    & .side-content__link {
      color: var(--gray-950, #14161a);
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1rem;

      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }

    & .side-content__items {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.25rem;
      align-self: stretch;

      & .side-content__item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        align-self: stretch;

        &:hover {
          cursor: pointer;
        }

        & .item__image {
          width: 100%;
          max-width: 6rem;
          height: 100%;
          max-height: 3.75rem;
          object-fit: cover;
          border-radius: 0.375rem;
        }

        & .item__content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.25rem;

          & .item__title {
            color: var(--gray-950, #14161a);
            font-size: 0.875rem;
            font-style: normal;
            font-weight: 500;
            line-height: 1.25rem;
          }

          & .item__description {
            color: var(--gray-600, #676e79);
            font-size: 0.75rem;
            font-style: normal;
            font-weight: 400;
            line-height: 1rem;
          }
        }
      }
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    flex-direction: column;

    & .landing__main-content {
      width: 100%;
      padding-right: 0;
      border-right: none;

      & .main-content__actions {
        gap: 0.5rem;
      }

      & .main-content__items {
        & .main-content__divider {
          display: none;
        }

        & .separated {
          gap: 1.25rem;

          & > div:not(:last-of-type)::after {
            display: none;
          }
        }

        & .blog-product-cards-section {
          border-radius: 0;
        }
      }

      & .pagination {
        justify-content: center;

        & .pagination__per-page {
          display: none;
        }
      }
    }

    & .landing__side-content {
      display: none;
    }
  }
`;
