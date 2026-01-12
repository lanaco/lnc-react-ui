import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";

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
