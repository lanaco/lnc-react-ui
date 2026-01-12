import styled from "@emotion/styled";
import {
  linearGradientAnimation,
  truncateTextInRows,
} from "../../../_utils/utils";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  position: relative;
  border-radius: 0.75rem;
  overflow: hidden;
  cursor: pointer;
  background: linear-gradient(
    178deg,
    rgba(0, 0, 0, 0) 1.5%,
    rgba(0, 0, 0, 0.16) 8.95%,
    #000 98.39%
  );

  & .text-block {
    padding: 0.75rem;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: absolute;
    bottom: 0rem;
    left: 0rem;
  }
  & .img-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    background: linear-gradient(
      178deg,
      rgba(0, 0, 0, 0) 1.5%,
      rgba(0, 0, 0, 0.16) 8.95%,
      #000 98.39%
    );
  }

  & img {
    width: 100%;
    aspect-ratio: 1 / 1; /* defining the aspect ratio of the image */
    object-fit: cover; /* making sure the image isn't distorted */
    border-radius: 0.75rem;
    mix-blend-mode: multiply;
  }

  & .fallback-image {
    mix-blend-mode: multiply;
  }

  font-size: 0.875rem;
  font-weight: 500;
  & .price-chip {
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0 0.38rem;
    min-height: 1.25rem;
    max-height: 1.25rem;
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 62.4375rem;
    z-index: 1;
    background-color: var(--white, #fff);
    color: var(--gray-950, #14161a);
  }
  & .title-simple-product-card {
    z-index: 1;
    color: var(--white, #fff);
    transition: all 0.2s ease;
    ${truncateTextInRows(2)}
  }

  &:hover {
    & .title-simple-product-card {
      z-index: 1;
    }
  }
`;
