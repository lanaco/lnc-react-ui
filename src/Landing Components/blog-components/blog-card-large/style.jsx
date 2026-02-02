import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";
import { truncateTextInRows } from "../../../_utils/utils";

export const Wrapper = styled.a`
  text-decoration: none;
  color: var(--gray-950);
  display: flex;
  width: 100%;
  gap: 1.25rem;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px 0px rgba(0, 0, 0, 0.06);
  background-color: var(--white);
  border-radius: 0.75rem;
  border: 1px solid var(--gray-95008);
  overflow: hidden;
  max-height: 11.25rem;
  min-height: 11.25rem;

  &:hover {
    cursor: pointer;
  }

  & img {
    max-height: 11.25rem;
    min-height: 11.25rem;
    min-width: 11.25rem;
    max-width: 11.25rem;
    object-fit: cover;
    width: 100%;
    border-radius: 0.75rem 0 0 0.75rem;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    padding: 1rem;
    column-gap: 1.5rem;
    row-gap: 1rem;
    display: grid;
    grid-template-columns: repeat(2, auto);
    max-height: 100%;
    min-height: 100%;
    & .action {
      grid-column: 1 / 3;
    }

    & img {
      max-height: 7.75rem;
      min-height: 7.75rem;
      min-width: 7.75rem;
      max-width: 7.75rem;
      border-radius: 0.75rem;
    }

    & button {
      width: 100%;
      margin-top: auto;
    }
  }
`;

export const TextWrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  color: var(--gray-950, #14161a);

  & .text-wr-title {
    font-weight: 600;
    font-size: 1.25rem;
  }

  & .text-wr {
    font-weight: 400;
    font-size: 0.875rem;
    color: var(--gray-700, #4e555f);
    ${truncateTextInRows(3)}
  }

  & button {
    width: fit-content;
    margin-top: auto;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    padding: 0;
  }
`;
