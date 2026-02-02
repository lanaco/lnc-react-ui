import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";
import { truncateTextInRows } from "../../../_utils/utils";


export const Wrapper = styled.a`
  text-decoration: none;
  color: var(--gray-950);
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 18.125rem;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px 0px rgba(0, 0, 0, 0.06);
  background-color: var(--white);
  border-radius: 0.75rem;
  border: 1px solid var(--gray-95008);
  overflow: hidden;
  gap: 1.5rem;
  padding: 2rem 1.25rem;
  min-height: 22.5rem;
  align-items: center;

  & button {
    width: fit-content;
    margin-top: 1.5rem;
    color: var(--gray-950, #14161a);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25rem;
    letter-spacing: -0.09px;
  }

  & img {
    max-width: 6rem;
    min-width: 6rem;
    min-height: 6rem;
    max-height: 6rem;
    border-radius: 0.75rem;
    object-fit: cover;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    max-width: unset;
  }
`;

export const TextWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--gray-950, #14161a);

  & .text-wr-title {
    text-align: center;
    font-size: 1.375rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.75rem;
  }

  & .text-wr {
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.25rem;
    letter-spacing: 0.0156rem;
    ${truncateTextInRows(3)}
  }
`;
