import styled from "@emotion/styled";
import { truncateText, truncateTextInRows } from "../../../_utils/utils";

export const ExternalWrapper = styled.div`
  padding-top: 5rem;
  overflow: hidden;
`;

export const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4.5rem 1.25rem 2rem 1.25rem;
  gap: 1.25rem;
  min-height: 13.9375rem;
  max-height: 13.9375rem;
  width: 100%;

  border-radius: 0.75rem;
  border: 1px solid var(--gray-95008);
  background: var(--white);

  /* drop-shadow */
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px 0px rgba(0, 0, 0, 0.06);

  & .cont {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 400;
    color: var(--gray-700, #4e555f);

    & .cont-title {
      font-size: 1.375rem;
      font-weight: 600;
      color: var(--gray-950, #14161a);
      ${truncateText()}
    }

    & .cont-text {
      ${truncateTextInRows(2)}
    }
  }

  & img {
    position: absolute;
    top: -3.125rem;
    left: 1.25rem;
    object-fit: cover;
    min-width: 6.25rem;
    max-width: 6.25rem;
    min-height: 6.25rem;
    max-height: 6.25rem;
    border-radius: 0.75rem;
    border: 1px solid var(--gray-95008);

    /* drop-shadow-lg */
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1),
      0px 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;
