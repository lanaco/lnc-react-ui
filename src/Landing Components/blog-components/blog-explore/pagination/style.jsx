import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  width: 100%;

  & .pagination__per-page {
    & button {
      border-radius: 8px;
      border: 1px solid var(--neutral-95012, rgba(20, 22, 26, 0.12));
      background: transparent;
      color: var(---gray-950, #14161a);
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem;
    }
  }

  & .pagination__pages {
    display: flex;
    align-items: center;
    border-radius: 0.375rem;

    & .pagination__page {
      display: flex;
      width: 2.5rem;
      height: 2.25rem;
      padding: 0.5rem 1rem;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-top: 1px solid var(--neutral-95012, rgba(20, 22, 26, 0.12));
      border-right: 1px solid var(--neutral-95012, rgba(20, 22, 26, 0.12));
      border-bottom: 1px solid var(--neutral-95012, rgba(20, 22, 26, 0.12));
      color: var(--gray-600, #676e79);
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem;

      &:hover {
        cursor: pointer;
        background: var(--gray-200, #e4e9f0);
      }

      &.active {
        border: 1px solid var(--teal-500, #009ea8);
        background: var(--teal-50, #f4fdff);
        color: var(--teal-500, #009ea8);
      }

      &.disabled {
        cursor: unset;
        border: 1px solid var(--neutral-95012, rgba(20, 22, 26, 0.12));
        opacity: 0.4;

        &:hover {
          background: transparent;
        }
      }

      &.ellipsis {
        cursor: unset;

        &:hover {
          background: transparent;
        }
      }

      &:first-of-type {
        border-radius: 0.5rem 0 0 0.5rem;
        border-left: 1px solid var(--neutral-95012, rgba(20, 22, 26, 0.12));
      }

      &:last-of-type {
        border-radius: 0 0.5rem 0.5rem 0;
      }
    }
  }
`;
