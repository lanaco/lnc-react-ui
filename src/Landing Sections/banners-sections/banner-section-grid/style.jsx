import styled from "@emotion/styled";
import { down } from "../../../_utils/breakpoints";

// Mobile-only: horizontally scrollable row of clickable image cards with the
// title/button overlaid on the image (see design). Rendered only on mobile,
// so no media query is needed here.
export const MobileScrollWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  & .banner-grid-card {
    position: relative;
    flex: 0 0 auto;
    width: 78%;
    max-width: 22rem;
    aspect-ratio: 4 / 3;
    border-radius: 0.75rem;
    overflow: hidden;
    cursor: pointer;
    text-decoration: none;
    display: block;
  }

  & .banner-grid-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  & .banner-grid-card__overlay {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.75) 0%,
      rgba(0, 0, 0, 0.35) 45%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  & .banner-grid-card__title {
    color: #fff;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.375rem;
  }

  & .banner-grid-card__action {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    color: #fff;
    font-size: 0.875rem;
    font-weight: 500;

    & .banner-grid-card__arrow {
      flex: 0 0 auto;
    }
  }
`;

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;

  & .text-item {
    max-height: ${(p) => p.height};
    min-height: ${(p) => p.height};
    max-width: 27rem;
    margin: auto;
  }

  & img {
    object-fit: cover;
    width: 100%;
    max-height: ${(p) => p.height};
    min-height: ${(p) => p.height};
  }

  & .img-1 {
    border-radius: 0.75rem 0.75rem 0.75rem 0;
  }

  & .img-2 {
    border-radius: 0.75rem 0rem 0.75rem 0.75rem;
  }

  @media ${down("M")} {
    padding: 0;

    & .text-item {
      padding: 1rem;
    }
  }

  @media ${down("S")} {
    grid-template-columns: repeat(1, 1fr);
    gap: 1.5rem;

    & .img-item {
      width: 100%;
      min-height: 11.25rem;
      max-height: 11.25rem;
    }

    & .img-1,
    .img-2 {
      border-radius: 0.75rem;
    }

    & .text-item {
      min-height: unset;
      max-height: unset;
    }
  }
`;
