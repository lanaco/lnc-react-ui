import styled from "@emotion/styled";

import {
  truncateTextInRows,
  linearGradientAnimation,
} from "../../../_utils/utils";
import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;

  border-radius: 0.75rem;
  background: ${(p) => p?.overlay};
  cursor: pointer;

  & img {
    transition: var(--transition, all 0.3s ease);
    overflow: hidden;
  }
  overflow: hidden;

  &:hover {
    & img {
      transform: scale(1.1);
    }
  }

  & .content-wrapper {
    position: absolute;
    right: 0;
    top: 0;
    padding: 2.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;
    height: 100%;
    width: 100%;
  }

  & button {
    width: fit-content;
    color: var(--gray-950, #14161a);
    background: var(--white, #fff);

    &:hover {
      color: var(--gray-700, #4e555f);
      background: var(--white, #fff);
    }
  }

  & .content-text {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: var(--white, #fff);
    font-size: 1rem;
    font-weight: 500;

    & .content-text-title {
      font-weight: 600;
      ${truncateTextInRows(2)}
    }
  }

  & img {
    aspect-ratio: 1 / 1;
    mix-blend-mode: multiply;
    width: 100%;
    object-fit: cover;
  }

  & .img-skeleton {
    background-color: ${linearGradientAnimation("-90deg")};
    min-height: 28.75rem;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    & img,
    .img.skeleton {
      aspect-ratio: unset;
      min-height: 28.75rem;
      max-height: 28.75rem;
    }
  }
`;
