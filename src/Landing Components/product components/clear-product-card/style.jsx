import styled from "@emotion/styled";
import { down } from "../../../_utils/breakpoints";
import {
  truncateTextInRows,
} from "../../../_utils/utils";


export const Wrapper = styled.a`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;
  text-decoration: none;
  color: var(--gray-950);

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

  @media ${down("S")} {
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
