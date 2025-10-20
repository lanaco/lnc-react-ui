import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../_utils/consts";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  color: var(--gray-950, #14161a);
  justify-content: center;

  & button {
    width: fit-content;
  }

  & .block-group {
    display: flex;
    flex-direction: column;
  }

  & .txt-block-subtitle {
    font-size: 0.75rem;
    font-weight: 400;
    color: var(--gray-500, #868c98);
  }
  & .txt-block-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--gray-950, #14161a);
  }
  & .txt-block-description {
    font-size: 0.875rem;
    font-weight: 400;
    color: var(--gray-700, #4e555f);
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    align-items: start;
    justify-content: start;
    & .txt-block-title {
      font-size: 1.375rem;
    }
  }
`;
