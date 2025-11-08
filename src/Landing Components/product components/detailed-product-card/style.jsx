import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";
import {
  truncateText,
  truncateTextInRows,
  linearGradientAnimation,
} from "../../../_utils/utils";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;

  & .wrapper-card-1 {
    display: flex;
    flex-direction: column;
    gap: 0.38rem;
  }

  & .wrapper-card-2 {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  & .card-title {
    font-size: 0.875rem;
    font-weight: 600;
    ${truncateTextInRows(2)}
  }

  & .price-text {
    font-size: 1rem;
    font-weight: 600;
    ${truncateText(2)}
    display: flex;
    align-items: end;
    gap: 0.5rem;
    & .full-price {
      text-decoration: line-through;
      font-size: 0.75rem;
      font-weight: 400;
      padding-bottom: 0.125rem;
      color: var(--gray-600, #676e79);
    }
  }

  & .location-text {
    font-size: 0.75rem;
    font-weight: 400;
    color: var(--gray-600, #676e79);
    ${truncateText(2)}
  }

  & .tags-wrapper {
    display: flex;
    gap: 0.5rem;
  }

  & .skeleton-img {
    background-color: ${linearGradientAnimation("-90deg")};
    border-radius: 0.75rem;
    border: 1px solid white;
  }

  & .skeleton-title {
    background-color: ${linearGradientAnimation("-90deg")};
    width: 100%;
    height: 2.5rem;
  }

  & .skeleton-tags {
    background-color: ${linearGradientAnimation("-90deg")};
    width: 80%;
    height: 1.5rem;
  }

  & .skeleton-price {
    background-color: ${linearGradientAnimation("-90deg")};
    width: 50%;
    height: 2.5rem;
  }

  & .skeleton-sponsored {
    background-color: ${linearGradientAnimation("-90deg")};
    width: 50%;
    height: 1rem;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    & .price-text {
      font-size: 0.875rem;
      font-weight: 600;
    }
  }

  &:hover .product-image-wrapper img {
    transform: scale(1.1);
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 0.75rem;
  width: 100%;
  aspect-ratio: 1 / 1;

  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.75rem;
    transition: var(--transition, all 0.3s ease);
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    & img {
      width: 8.875rem;
      height: 8.875rem;
      min-width: 8.875rem;
      min-height: 8.875rem;
      object-fit: cover;
    }
  }
`;
