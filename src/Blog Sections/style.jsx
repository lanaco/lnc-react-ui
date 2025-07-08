import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../_utils/consts";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  align-self: stretch;

  & .wrapper__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
  }

  & .wrapper__action {
    border: 1px solid var(--neutral-95012, rgba(20, 22, 26, 0.12));
    color: var(--gray-950, #14161a);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem;
    letter-spacing: -0.09px;
  }

  &.highlight {
    border-radius: 1rem;
    border: 2px solid var(--yellow-500, #f59e0b);
    background: var(--yellow-50, #fffbeb);
    padding: 0.75rem;
    width: fit-content;

    & .wrapper__action {
      border: none;
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    & .wrapper__grid {
      grid-template-columns: repeat(2, 1fr);
    }

    & .wrapper__action {
      border: none;
    }

    & .simple-product-card {
      max-width: unset;
      min-width: unset;
      width: unset;
    }
  }
`;
