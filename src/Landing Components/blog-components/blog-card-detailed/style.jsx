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
  background-color: var(--white, #fff);
  border-radius: 0.75rem;
  border: 1px solid var(--gray-95008, #14161a14);
  overflow: hidden;
  min-height: 21.5625rem;
  cursor: pointer;
  &:hover {
  }

  & img {
    max-height: 11.25rem;
    min-height: 11.25rem;
    object-fit: cover;
    width: 100%;
  }

  & .skeleton-img {
    width: 100%;
    max-height: 11.25rem;
    min-height: 11.25rem;
    background-color: ${linearGradientAnimation("-90deg")};
  }

  & .tags-wr {
    margin-top: auto;
    display: flex;
    flex-wrap: wrap;

    gap: 0.5rem;
    padding: 0 1rem 1rem 1rem;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    max-height: 100%;
    min-height: 100%;
  }
`;

export const TextWrapper = styled.div`
  padding: 1rem 1rem 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 0;
  color: var(--gray-950, #14161a);
  border-top: 1px solid var(--gray-95008, #14161a14);

  & .text-wr-title {
    font-weight: 600;
    font-size: 1rem;
  }

  & .info-wr-skeleton {
    background-color: ${linearGradientAnimation("-90deg")};
    height: 1rem;
    width: 100%;
  }

  & .skeleton-title {
    background-color: ${linearGradientAnimation("-90deg")};
    height: 1.5rem;
    width: 70%;
  }

  & .text-wr {
    font-weight: 400;
    font-size: 0.875rem;
    flex: 1;
    color: var(--gray-700, #4e555f);
    ${truncateTextInRows(2)}
  }

  & .info-wr {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    justify-content: space-between;
    color: var(--gray-600, #676e79);
    font-size: 0.75rem;
    font-weight: 400;
    padding-bottom: 0.75rem;
    & .mng {
      font-size: 0.875rem;
      color: var(--gray-300, #c4c8cf);
    }
  }

  & .info-wr-1 {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  & .info-wr-2 {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;
