import styled from "@emotion/styled";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";
import {
  truncateText,
  truncateTextInRows,
  linearGradientAnimation,
  getBorderRadiusValueWithUnits,
} from "../../../_utils/utils";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;
  overflow: hidden;
  width: 100%;

  & .seller {
    text-transform: uppercase;
    ${truncateText()}
    color: var(--gray-500);
    font-size: 0.625rem;
    font-weight: 400;
  }

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

  & .wrapper-card-3 {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;

    & > div {
      & > div {
        width: 100% !important;
      }
    }
  }

  & .tag {
    height: 1.5rem;
    gap: 0.25rem;
    padding: 0.25rem 0.375rem;
    border-radius: 0.375rem;
    background: #f9fafb;
    border: 1px solid var(--gray-95012, #14161a1f);
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 1rem;
    letter-spacing: 0.025rem;
    color: var(--gray-950, #14161a);
    white-space: nowrap;
    flex: 0 0 auto;

    & i {
      color: var(--yellow-500, #f59e0b);
    }
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
    color: var(--gray-950, #14161a);

    &.new-price {
      color: var(--danger-600, #e11d48);
    }

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
    width: 100%;
    height: 11rem;
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

  & .tags-popover__trigger {
    display: flex;
    gap: 0.25rem;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    overflow: visible;

    & .wrapper-card-3 {
      flex-wrap: nowrap;
      justify-content: flex-start;
      overflow-x: scroll;
      width: 8.875rem !important;

      -webkit-overflow-scrolling: touch;
      ::-webkit-scrollbar {
        -webkit-appearance: none;
      }
      -ms-overflow-style: none;
      /* Internet Explorer 10+ */
      scrollbar-width: none;
      /* Firefox */

      &::-webkit-scrollbar {
        display: none;
        /* Safari and Chrome */
      }

      & > div {
        & > div {
          width: 8.875rem !important;
        }
      }
    }

    & .tags-popover__trigger {
      overflow-x: scroll;
      justify-content: flex-start;
      width: 100%;

      -webkit-overflow-scrolling: touch;
      ::-webkit-scrollbar {
        -webkit-appearance: none;
      }
      -ms-overflow-style: none;
      /* Internet Explorer 10+ */
      scrollbar-width: none;
      /* Firefox */

      &::-webkit-scrollbar {
        display: none;
        /* Safari and Chrome */
      }
    }

    & .price-text {
      font-size: 0.875rem;
      font-weight: 600;

      & .full-price {
        display: none;
      }
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
  border: 1px solid #0c15201f;

  & .bookmarking-btn {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    z-index: 1;

    display: none;

    display: flex;
    align-items: center;
    justify-content: center;

    & button {
      width: 2.25rem;
      height: 2.25rem;
      border-radius: ${(p) => getBorderRadiusValueWithUnits(p.theme, "curved")};
      border: 1px solid var(--gray-95008);
      background-color: white;
      color: var(--gray-950);
      transition: transform 0.2s ease;

      &:hover {
        transform: scale(1.05);
      }

      i {
        color: #14161a;
        font-size: 1.1rem;
        line-height: 1;
      }
    }
  }

  &:hover {
    & .bookmarking-btn {
      display: flex;
    }
  }

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

    & .bookmarking-btn {
      display: flex;
    }
  }
`;

export const TagsPopoverContent = styled.div`
  background: var(--white, #fff);
  z-index: 1;

  border: 1px solid var(--gray-200, #dddfe4);
  border-radius: 0.5rem;
  line-height: 1rem;
  position: absolute;
  padding: 0.5rem 0.75rem;
  top: 0.5rem;
  left: 25%;
  transform: translateX(-50%);
  min-width: 13rem;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border-style: solid;
    border-width: 0.625rem;
  }

  &::after {
    top: -1.1875rem;
    border-color: transparent transparent var(--white, #fff) transparent;
  }

  &::before {
    top: -1.25rem;
    border-color: transparent transparent var(--gray-200, #dddfe4) transparent;
  }

  & .tags-popover__content {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    gap: 0.375rem;
    font-size: 0.75rem;
    font-weight: 400;

    & .tags-popover__name {
      color: var(--gray-600, #676e79);
    }

    & .tags-popover__value {
      color: var(--gray-950, #14161a);
    }
  }
`;
