import styled from "@emotion/styled";
import { truncateTextInRows } from "../../../_utils/utils";

// Gradient-scrim card (same as the web SimpleProductCard): the image fills a
// square box, a bottom scrim keeps the white price chip / title legible.
export const Wrapper = styled.a`
  text-decoration: none;
  color: var(--gray-950, #14161a);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  border-radius: 0.75rem;
  overflow: hidden;
  cursor: pointer;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: linear-gradient(
    178.16deg,
    rgba(0, 0, 0, 0) 1.5%,
    rgba(0, 0, 0, 0) 37.37%,
    #000000 98.39%
  );

  & .img-wrapper {
    position: absolute;
    inset: 0;
    z-index: 0;
    background: linear-gradient(
      178deg,
      rgba(0, 0, 0, 0) 1.5%,
      rgba(0, 0, 0, 0.16) 8.95%,
      #000 98.39%
    );
  }

  & .img-wrapper img {
    display: block;
    width: 100%;
    height: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 0.75rem;
    mix-blend-mode: multiply;
    border: 1px solid var(--gray-95008, #14161a14);
    box-sizing: border-box;
  }

  & .fallback-image {
    mix-blend-mode: multiply;
  }

  & .text-block {
    padding: 0.75rem;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
  }

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
    background-color: var(--white, #fff);
    color: var(--gray-950, #14161a);
    white-space: nowrap;
  }

  & .title-simple-product-card {
    z-index: 1;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--white, #fff);
    ${truncateTextInRows(2)}
  }
`;
