import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";
import { truncateText, truncateTextInRows } from "../../../_utils/utils";

export const Gradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 1;

  background: -moz-linear-gradient(
    top,
    rgba(35, 42, 33, 0.45) 0%,
    rgba(35, 42, 33, 0.45) 100%
  );
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, rgba(35, 42, 33, 0.45)),
    color-stop(100%, rgba(35, 42, 33, 0.45))
  );
  background: -webkit-linear-gradient(
    top,
    rgba(35, 42, 33, 0.45) 0%,
    rgba(35, 42, 33, 0.45) 100%
  );
  background: -o-linear-gradient(
    top,
    rgba(35, 42, 33, 0.45) 0%,
    rgba(35, 42, 33, 0.45) 100%
  );
  background: -ms-linear-gradient(
    top,
    rgba(35, 42, 33, 0.45) 0%,
    rgba(35, 42, 33, 0.45) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(35, 42, 33, 0.45) 0%,
    rgba(35, 42, 33, 0.45) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a6000000', endColorstr='#00000000',GradientType=0 );
  border-radius: 0.75rem;
  z-index: 2;
`;

export const Container = styled.a`
  text-decoration: none;
  color: var(--gray-950);
  cursor: pointer;
  position: relative;
  border-radius: 0.75rem;
  position: relative;
  width: 100%;
  min-width: 10rem;
  height: 11.875rem;

  &:hover .quattro-card__gradient {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  & img {
    width: 100%;
    height: 100%;
    border-radius: 0.75rem;
    object-fit: cover;
  }
  & .quattro-card__text {
    z-index: 3;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    color: var(--white, #fff);
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: center;
    text-align: center;

    & .quattro-card__title {
      font-size: 1.25rem;
      font-style: normal;
      font-weight: 600;
      line-height: 1.75rem;
      ${truncateText()}
    }

    & .quattro-card__description {
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.25rem;
      ${truncateTextInRows(2)}
    }
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    width: 100%;

    img {
      object-fit: fill;
    }

    & .quattro-card__title {
      font-size: 1rem;
      font-weight: 700;
      width: 100%;
    }

    & .quattro-card__description {
      display: block;
    }
  }
`;
