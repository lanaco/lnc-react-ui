import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";
import {
  linearGradientAnimation,
  truncateTextInRows,
} from "../../../_utils/utils";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;

  & img {
    width: 100%;
    aspect-ratio: 1 / 1; /* defining the aspect ratio of the image */
    object-fit: cover; /* making sure the image isn't distorted */
    border-radius: 0.75rem;
  }

  & .card-title {
    font-size: 0.875rem;
    font-weight: 600;
    ${truncateTextInRows(2)}
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    & img {
      width: 8.875rem;
      height: 8.875rem;
      min-width: 8.875rem;
      min-height: 8.875rem;
      min-width: 8.875rem;
      min-height: 8.875rem;
      object-fit: cover;
    }
  }
`;
