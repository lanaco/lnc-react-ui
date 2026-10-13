import styled from "@emotion/styled";

import { down } from "../../../_utils/breakpoints";

// Keep in sync with WebFrontend SimpleGeneralCategoryCardsSection.astro
const mediaAspectRatio = (columns, isOverlay) => {
  if (isOverlay) return "1.3 / 1";
  if (columns === 4) return "2.2 / 1";
  if (columns === 6) return "1.5 / 1";
  if (columns === 7) return "1.25 / 1";
  return "3 / 1";
};

export const CategoryCardsWrapper = styled("section", {
  shouldForwardProp: (prop) => prop !== "columns" && prop !== "isOverlay",
})`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  & .cat-cards__title {
    margin: 0;
    color: var(--gray-950, #14161a);
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.75rem;
  }

  & .cat-cards__grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: ${(p) => `repeat(${p.columns}, minmax(0, 1fr))`};
  }

  & .cat-card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    overflow: hidden;
    border-radius: ${(p) => (p.isOverlay ? "0.75rem" : "0.5rem")};
    border: 1px solid var(--gray-95008, rgba(20, 22, 26, 0.08));
    background: var(--white, #fff);
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
    color: var(--gray-950, #14161a);
    text-decoration: none;
    cursor: pointer;
    transition: box-shadow 0.2s ease;
  }

  & .cat-card:hover {
    box-shadow: 0px 4px 12px 0px rgba(20, 22, 26, 0.12);
  }

  & .cat-card__media {
    display: block;
    width: 100%;
    aspect-ratio: ${(p) => mediaAspectRatio(p.columns, p.isOverlay)};
    overflow: hidden;
  }

  & .cat-card__media > * {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  & .cat-card__img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  & .cat-card:hover .cat-card__img {
    transform: scale(1.04);
  }

  & .cat-card__media .cat-card__img--mobile {
    display: none;
  }

  & .cat-card__label {
    padding: 0.625rem 0.75rem;
    font-size: 0.8125rem;
    font-weight: 500;
    line-height: 1.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ${(p) =>
    p.isOverlay
      ? `
    & .cat-card__label {
      position: absolute;
      left: 0.5rem;
      bottom: 0.5rem;
      max-width: calc(100% - 1rem);
      padding: 0.375rem 0.75rem;
      border-radius: 0.5rem;
      background: var(--white, #fff);
      box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.08);
    }
  `
      : ""}

  /* mobile: one horizontal scroll row of 8.5rem cards */
  @media ${down("S")} {
    & .cat-cards__grid {
      display: flex;
      gap: 0.75rem;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    & .cat-cards__grid::-webkit-scrollbar {
      display: none;
    }

    & .cat-card {
      flex: 0 0 8.5rem;
      scroll-snap-align: start;
    }

    & .cat-card__media {
      aspect-ratio: 4 / 3;
    }

    & .cat-card__media .cat-card__img--desktop {
      display: none;
    }

    & .cat-card__media .cat-card__img--mobile {
      display: block;
    }
  }
`;
