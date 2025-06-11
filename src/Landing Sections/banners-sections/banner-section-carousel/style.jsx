import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const Wrapper = styled.div`
  position: relative;

  & .image-carousel {
    height: 20.625rem;

    & img {
      height: 20.625rem;
    }

    & .next,
    .previous {
      display: none;
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    & .image-carousel {
      & > div {
        border-radius: unset;
      }
      & img {
        border-radius: unset;
      }
    }
  }
`;

export const Block = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  border-radius: 0%.75rem;

  width: 100%;
  height: 100%;
  padding: 3rem 3rem 5.625rem 3rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;

  & button {
    width: fit-content;
  }

  & .text-area {
    max-width: 31.75rem;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    color: var(--white);

    & .title {
      font-weight: 700;
      font-size: 2rem;
      color: var(--white);
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    display: none;
  }
`;

export const Banner = styled.div`
  position: relative;
  border-radius: 0.75rem;

  & img {
    object-fit: cover;
    max-height: 20.625rem;
    border-radius: 0.75rem;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    border-radius: unset;

    & img {
      border-radius: unset;
    }
  }
`;

export const BannerOverlay = styled.div`
  border-radius: 0.75rem;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 3rem 0 3rem 3rem;

  background: linear-gradient(
    to top left,
    rgba(0, 0, 0, 0) 85%,
    rgba(0, 0, 0, 1) 100%
  );

  & .banner-content {
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
    width: 45%;
  }

  & .banner-content button {
    width: fit-content;
  }

  & .banner-text {
    text-align: left;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    color: var(--white);

    & .banner-title {
      font-weight: 700;
      font-size: 2rem;
      color: var(--white);
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    border-radius: unset;
    background: unset;

    & .banner-content {
      display: none;
    }
  }
`;
