import styled from "styled-components";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  align-self: stretch;

  & .feedback__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    & .feedback__title {
      color: var(--gray-950, #14161a);
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 600;
      line-height: 2rem;
    }

    & .feedback__description {
      color: var(--gray-600, #676e79);
      text-align: center;
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.5rem;
    }
  }

  & .feedback__action {
    color: var(--gray-950, #14161a);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem;
    letter-spacing: -0.09px;
    background: var(--neutral-95004, rgba(20, 22, 26, 0.04));

    &:hover {
      color: var(--gray-950, #14161a);
      background: var(--neutral-95008, rgba(20, 22, 26, 0.08));
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    text-align: center;
  }
`;
