import styled from "@emotion/styled";
import { down } from "../../../_utils/breakpoints";

// Mirrors the web's Banner.astro (.hero*) styles.
export const Container = styled.div`
  position: relative;
  width: 100%;

  & .hero__slider {
    position: relative;
    border-radius: 18px;
    overflow: hidden;

    &:hover .hero__btn {
      opacity: 1;
      visibility: visible;
    }
  }

  & .hero__viewport {
    overflow: hidden;
  }

  & .hero__track {
    display: flex;
    transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform;
    max-height: 22.5rem;
    touch-action: pan-y;

    &.is-dragging {
      transition: none;
    }
  }

  & .hero__slider.is-single .hero__track {
    touch-action: auto;
  }

  & .hero__slide {
    position: relative;
    width: 100%;
    min-height: clamp(220px, 32vw, 420px);
    flex: 0 0 100%;
    max-height: 22.5rem;
    user-select: none;
    cursor: pointer;
    overflow: hidden;
  }

  & .hero__picture {
    display: contents;
  }

  & .hero__img,
  & .hero__slide > img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    max-height: 22.5rem;
    pointer-events: none;
    user-select: none;
    -webkit-user-drag: none;
  }

  & .hero__btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 999px;
    border: 0;
    color: var(--gray-950, #14161a);
    line-height: 1;
    cursor: pointer;
    width: 3rem;
    height: 3rem;
    background: #ffffffcc;
    box-shadow:
      rgba(20, 22, 26, 0.08) 1px 1px 4px 0px,
      rgba(20, 22, 26, 0.16) 0px 2px 16px 0px;
    backdrop-filter: blur(1.25rem);
    font-size: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 100;
    padding: 0 0 0.25rem 0;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease;
    z-index: 2;

    &:hover {
      background: #ffffff80;
    }
  }

  & .hero__btn--prev {
    left: 10px;
  }

  & .hero__btn--next {
    right: 10px;
  }

  & .hero__btn-icon,
  & .hero__dots {
    display: none;
  }

  & .hero__overlay {
    position: absolute;
    inset: 0;
    border-radius: 18px;
    display: flex;
    align-items: stretch;
    padding: 3rem;
    background: linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) 55%,
      rgba(0, 0, 0, 0.75) 100%
    );
    pointer-events: none;
  }

  & .hero__overlay-inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
    max-width: 60%;
    transform: translateY(20px);
  }

  & .hero__text {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  & .hero__title {
    color: var(--white, #fff);
    font-weight: 700;
    font-size: 2rem;
    line-height: 1.2;
  }

  & .hero__desc {
    color: var(--white, #fff);
    font-size: 1rem;
    line-height: 1.5;
  }

  & .hero__cta {
    pointer-events: auto;
    align-self: flex-start;
    background: var(--white, #fff);
    color: var(--gray-950, #14161a);
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    padding: 0.625rem 1rem;
    border: 0;
    border-radius: 999px;
    text-decoration: none;
    width: fit-content;
    cursor: pointer;
  }

  @media ${down("M")} {
    & .hero__slide {
      min-height: clamp(190px, 29vw, 390px);
    }

    & .hero__overlay {
      padding: 2rem;
    }

    & .hero__overlay-inner {
      max-width: 75%;
    }

    & .hero__title {
      font-size: 1.5rem;
    }
  }

  @media ${down("S")} {
    & .hero__slider {
      border-radius: 0;
    }

    & .hero__track {
      max-height: none;
    }

    /* Figma (Home / mobile): one full-width slide at a time, 375x200 */
    & .hero__slide {
      flex: 0 0 100%;
      min-height: 0;
      max-height: none;
      aspect-ratio: 375 / 200;
    }

    & .hero__img,
    & .hero__slide > img {
      max-height: none;
    }

    /* small arrow pair pinned bottom-right, always visible */
    & .hero__btn {
      top: auto;
      bottom: 0.5rem;
      transform: none;
      width: 1.75rem;
      height: 1.75rem;
      padding: 0.375rem;
      opacity: 1;
      visibility: visible;
      box-shadow:
        rgba(20, 22, 26, 0.08) 1px 1px 2px 0px,
        rgba(20, 22, 26, 0.16) 0px 2px 8px 0px;
    }

    & .hero__btn--prev {
      left: auto;
      right: 2.75rem;
    }

    & .hero__btn--next {
      right: 0.5rem;
    }

    & .hero__btn-glyph {
      display: none;
    }

    & .hero__btn-icon {
      display: block;
      width: 1rem;
      height: 1rem;
      flex-shrink: 0;
    }

    & .hero__dots {
      position: absolute;
      left: 50%;
      bottom: 0.5rem;
      transform: translateX(-50%);
      display: flex;
      gap: 0.5rem;
      z-index: 2;
    }

    & .hero__dot {
      width: 0.5rem;
      height: 0.5rem;
      padding: 0;
      border: 0;
      border-radius: 50%;
      background: var(--gray-400, #96a2b2);
      cursor: pointer;

      &[aria-selected="true"] {
        background: #e86b1e;
      }
    }

    /* Figma: text + CTA top-left, darkened from the left edge to ~half */
    & .hero__overlay {
      border-radius: 0;
      padding: 1rem 1rem 1.5rem;
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.75) 0%,
        rgba(0, 0, 0, 0) 51%
      );
    }

    & .hero__overlay-inner {
      max-width: 100%;
      gap: 0.75rem;
      transform: none;
      justify-content: flex-start;
    }

    & .hero__title {
      font-size: 1.375rem;
      line-height: 1.625rem;
    }

    & .hero__desc {
      font-size: 0.8125rem;
    }

    & .hero__cta {
      background: linear-gradient(to top, #ff7621, #ff9706);
      color: var(--white, #fff);
      font-size: 0.875rem;
      font-weight: 600;
      line-height: 1.25rem;
      letter-spacing: 0.1px;
      padding: 0.375rem 0.75rem 0.375rem 0.875rem;
      border-radius: 0.5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    & .hero__track {
      transition: none;
    }
  }
`;
