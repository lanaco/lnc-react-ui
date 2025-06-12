import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";
import { linearGradientAnimation } from "../../../_utils/utils";

export const SkeletonWrapper = styled.div`
  width: 11.625rem;
  height: 11.625rem;
  border-radius: 0.75rem;
  background: ${linearGradientAnimation("-90deg")};
`;

export const AvatarWrapper = styled.div`
  width: 9.875rem;
  height: 9.875rem;
  border-radius: 999px;

  & .wrapper__image {
    width: 9.875rem;
    height: 9.875rem;
    border-radius: 999px;
  }

  &.active {
    border: var(--yellow-600, #d97706);
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    width: 4.5rem;
    height: 4.5rem;

    & .wrapper__image {
      width: 4.5rem;
      height: 4.5rem;
      border-radius: 999px;
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
