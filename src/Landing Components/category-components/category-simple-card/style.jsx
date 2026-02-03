import styled from "@emotion/styled";
import { truncateTextInRows } from "../../../_utils/utils";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";


export const CardWrapper = styled.a`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-950, #14161a);
  min-height: 12.25rem;
  max-height: 12.25rem;
  border-radius: 0.75rem;
  border: 1px solid var(--gray-95008, rgba(20, 22, 26, 0.08));
  background: var(--white, #fff);
  cursor: pointer;

  transition: var(--transition);

  /* drop-shadow-sm */
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  & .card-content {
    padding: 0.75rem;
    ${truncateTextInRows(2)}
  }

  & .card-content-2 {
    ${truncateTextInRows(2)}
  }

  & img {
    width: 100%;
    object-fit: cover;
    min-height: 8.25rem;
    max-height: 8.25rem;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    min-width: 8.75rem;
    max-width: 8.75rem;

    & .img,
    .skeleton-img {
      min-height: 5.375rem;
      max-height: 5.375rem;
    }
  }
`;
