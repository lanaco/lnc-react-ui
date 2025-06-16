import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";
import { truncateTextInRows } from "../../../_utils/utils";
import { linearGradientAnimation } from "../../../_utils/utils";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px 0px rgba(0, 0, 0, 0.06);
  background-color: var(--white);
  border-radius: 0.75rem;
  border: 1px solid var(--gray-95008);
  overflow: hidden;
  gap: 0.75rem;
  padding: 1rem;
  min-height: 10.375rem;
  max-height: 10.375rem;

  & img {
    max-width: 3.3125rem;
    min-width: 3.3125rem;
    min-height: 3.3125rem;
    max-height: 3.3125rem;
    border-radius: 0.75rem;
    object-fit: cover;
  }

  & .skeleton-img {
    max-width: 3.3125rem;
    min-width: 3.3125rem;
    min-height: 3.3125rem;
    max-height: 3.3125rem;
    border-radius: 0.75rem;
    background-color: ${linearGradientAnimation("-90deg")};
  }

  & a {
    margin-top: auto;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--gray-950, #14161a);

  & .text-wr-title {
    font-weight: 600;
    font-size: 1rem;
  }

  & .skeleton-title {
    height: 1.5rem;
    width: 80%;
    background-color: ${linearGradientAnimation("-90deg")};
  }

  & .skeleton-action {
    height: 1.25rem;
    width: 20%;
    background-color: ${linearGradientAnimation("-90deg")};
  }

  & .text-wr {
    font-weight: 400;
    font-size: 0.875rem;
    color: var(--gray-700, #4e555f);
    ${truncateTextInRows(3)}
  }
`;
