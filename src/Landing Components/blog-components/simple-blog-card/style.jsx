import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";
import { truncateTextInRows } from "../../../_utils/utils";
import { linearGradientAnimation } from "../../../_utils/utils";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px 0px rgba(0, 0, 0, 0.06);
  background-color: var(--white);
  border-radius: 0.75rem;
  border: 1px solid var(--gray-95008);
  overflow: hidden;
  max-height: 21.5625rem;
  min-height: 21.5625rem;
  cursor: pointer;

  &:hover {
    
  }

  & img {
    max-height: 12.5625rem;
    min-height: 12.5625rem;
    object-fit: cover;
    width: 100%;
  }

  & .skeleton-img {
    width: 100%;
    max-height: 12.5625rem;
    min-height: 12.5625rem;
    background-color: ${linearGradientAnimation("-90deg")};
  }

  & .action {
    padding: 0 1rem 1rem 1rem;
    margin-top: auto;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
  }
`;

export const TextWrapper = styled.div`
  padding: 1rem 1rem 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  color: var(--gray-950, #14161a);
  border-top: 1px solid var(--gray-95008);

  & .text-wr-title {
    font-weight: 600;
    font-size: 1rem;
  }

  & .text-wr {
    font-weight: 400;
    font-size: 0.875rem;
    flex: 1;
    color: var(--gray-700, #4e555f);
    ${truncateTextInRows(3)}
  }
`;
