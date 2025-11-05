import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const Container = styled.div`
  display: flex;
  height: 28.75rem;
  padding: 2.25rem;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  flex: 1;
  flex-shrink: 0;
  background: ${(p) => p?.backgroundColor}, url("${(p) => p?.backgroundImage}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 0.75rem;
  transition: flex 0.3s ease;

  &:hover {
    flex: 2;
  }

  & .section__text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    align-self: stretch;

    & .section__title {
      color: var(--white, #fff);
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.5rem;
    }

    & .section__description {
      color: var(--white, #fff);
      font-size: 1.375rem;
      font-style: normal;
      font-weight: 600;
      line-height: 1.75rem;
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
    padding: 2rem;
    min-height: 17.5rem;
    width: 100%;

    &:hover {
      flex: 1;
    }

    & .section__text {
      gap: 0.5rem;

      & .section__title {
        font-size: 0.875rem;
        line-height: 1.25rem;
      }

      & .section__description {
        font-size: 1rem;
        line-height: 1.5rem;
      }
    }
  }
`;
