import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";
import { truncateTextInRows } from "../../../_utils/utils";
import { linearGradientAnimation } from "../../../_utils/utils";

export const Wrapper = styled.div`
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
    margin-top: auto;
  }

  & img {
    max-width: 6rem;
    min-width: 6rem;
    min-height: 6rem;
    max-height: 6rem;
    border-radius: 0.75rem;
    object-fit: cover;
  }

  & .skeleton-img {
    max-width: 6rem;
    min-width: 6rem;
    min-height: 6rem;
    max-height: 6rem;
    border-radius: 0.75rem;
    background-color: ${linearGradientAnimation("-90deg")};
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
    font-weight: 600;
    font-size: 1.375rem;
  }

  & .skeleton-title {
    height: 1.75rem;
    width: 80%;
    background-color: ${linearGradientAnimation("-90deg")};
  }

  & .text-wr {
    font-weight: 400;
    font-size: 0.875rem;
    flex: 1;
    color: var(--gray-700, #4e555f);
    ${truncateTextInRows(3)}
  }
`;
