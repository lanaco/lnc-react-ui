import styled from "@emotion/styled";

export const Container = styled.div`
  &:hover {
    cursor: pointer;

    & .react-multiple-carousel__arrow {
      visibility: visible;
    }
  }

  & .carousel-slider {
    align-items: center;
  }

  & .carousel-item {
    padding-right: 0;

    &:not(.react-multi-carousel-item--active) {
      & .section__card {
        height: 22.5rem;
      }
    }

    & .section__card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      flex: 1 0 0;
      align-self: stretch;
      border-radius: 0.75rem;
      width: 100%;
      height: 22.5rem;
      position: relative;
      overflow: hidden;

      & .section__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      & .card__content {
        position: absolute;
        top: 0;
        left: 0;
        padding: 3rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      & .card__text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
      }

      & .card__title {
        color: var(--white, #fff);
        font-size: 1.75rem;
        font-style: normal;
        font-weight: 600;
        line-height: 2.25rem;
      }

      & .card__description {
        color: var(--white, #fff);
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.5rem;
      }

      & .card__action {
        padding: 0.625rem 0.75rem;
        background: var(--white, #fff);
        color: var(--gray-950, #14161a);
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 500;
        line-height: 1.25rem;
        width: fit-content;
      }
    }
  }

  & .react-multiple-carousel__arrow {
    width: 3rem;
    height: 3rem;
    padding: 0.5rem;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 1px 1px 4px 0 rgba(20, 22, 26, 0.08),
      0 2px 16px 0 rgba(20, 22, 26, 0.16);
    backdrop-filter: blur(1.25rem);
    visibility: hidden;

    &::before {
      color: var(--gray-950, #14161a);
    }

    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  }

  & .react-multiple-carousel__arrow--left {
    left: 1rem;
  }

  & .react-multiple-carousel__arrow--right {
    right: 1rem;
  }

  @media (max-width: 464px) {
    & .carousel-container {
      min-height: 23.4375rem;
    }

    & .carousel-item {
      padding-right: 1rem;

      &:last-of-type {
        padding-left: 1rem;
        padding-right: 0;
      }

      &:nth-last-child(2) {
        padding-right: 0;
      }

      &:not(.react-multi-carousel-item--active) {
        & .section__card {
          height: 20.625rem;
        }
      }

      &.react-multi-carousel-item--active:not([data-index="0"]) {
        & .section__card {
          animation: scaleCarouselItem 500ms forwards;
        }
      }

      & .section__card {
        height: 23.4375rem;
        border-radius: 0.5rem;

        & .section__image {
          object-fit: fill;
        }

        & .card__content {
          display: none;
        }
      }
    }

    @keyframes scaleCarouselItem {
      from {
        height: 20.625rem;
      }

      top {
        height: 23.4375rem;
      }
    }
  }
`;
