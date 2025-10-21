import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;

  & .section__title {
    color: var(--gray-950, #14161a);
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2rem;
    letter-spacing: -0.0294rem;
  }

  & .section__items {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
  }

  & .section__item {
    background: lightblue;
    height: 24rem;
    transition: width 0.5s ease;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    flex: 1;

    &:hover {
      flex: 2;
      transition: width 0.5s ease;
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    & .section__title {
      font-size: 1.375rem;
      line-height: 1.75rem;
    }

    & .section__items {
      flex-direction: column;
    }
  }
`;
