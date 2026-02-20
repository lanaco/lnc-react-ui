import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  & .section__slider {
    position: relative;
  }

  & .slider__gradient {
    position: absolute;
    width: 7.5rem;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    opacity: 0.4;
    top: 0;

    &.left {
      left: 0;
      background: linear-gradient(to left, transparent, white);
    }

    &.right {
      right: 0;
      background: linear-gradient(to right, transparent, white);
    }
  }

  .slider__container {
    width: 100%;
  }

  .slider__item {
    padding-right: 1rem;
  }

  & .section__item {
    width: 100%;
    height: 100%;
    max-height: 3.75rem;
    border-radius: 0.5rem;
    border: 1px solid var(--gray-200, #e4e9f0);
    overflow: hidden;

    & img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      filter: grayscale(100%);
      transition: filter 0.3s ease;

      &:hover {
        filter: grayscale(0%);
      }
    }

    &:hover {
      cursor: pointer;
    }
  }
`;
