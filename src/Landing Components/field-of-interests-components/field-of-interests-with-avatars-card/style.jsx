import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";
import { linearGradientAnimation } from "../../../_utils/utils";

export const SkeletonWrapper = styled.div`
  width: 100%;
  height: 11.625rem;
  border-radius: 0.75rem;
  background: ${linearGradientAnimation("-90deg")};
`;

export const AvatarWrapper = styled.div`
  width: 100%;
  height: auto;
  border-radius: 999px;

  &:hover {
    cursor: pointer;
  }

  & .wrapper__image {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 999px;
    max-height: 9.875rem;
  }

  &.active {
    border: var(--yellow-600, #d97706);
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    & .wrapper__image {
      height: auto;
    }
  }
`;

export const AvatarSkeletonWrapper = styled.div`
  width: 9.875rem;
  height: 9.875rem;
  border-radius: 999px;
  background: ${linearGradientAnimation("-90deg")};

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    width: 4.5rem;
    height: 4.5rem;
  }
`;
