import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";

import { truncateTextInRows } from "../../../_utils/utils";

export const Wrapper =styled.a`
  text-decoration: none;
  color: var(--gray-950);
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px 0px rgba(0, 0, 0, 0.06);
  background-color: var(--white, #fff);
  border-radius: 0.75rem;
  border: 1px solid var(--gray-95008, #14161a14);
  overflow: hidden;
  min-height: 23rem;
  cursor: pointer;
  height: 100%;

  & .blog-card-content {
    display: flex;
    padding: 1rem;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    border-top: 1px solid var(--gray-95008, #14161a14);
    gap: 1.25rem;
  }

  & img {
    max-height: 12.5rem;
    min-height: 12.5rem;
    object-fit: cover;
    width: 100%;
  }

  & .tags-wr {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    max-height: 100%;
    min-height: 100%;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  color: var(--gray-950, #14161a);

  & .text-wr-title {
    font-weight: 600;
    font-size: 1rem;
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
