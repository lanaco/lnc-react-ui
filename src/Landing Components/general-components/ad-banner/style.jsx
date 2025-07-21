import styled from "@emotion/styled";

import { MOBILE_SIZE_PX } from "../../../_utils/consts";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 60.625rem;
  max-height: 5.625rem;

  & .wrapper__image {
    width: 100%;
    height: 100%;
    max-width: 60.625rem;
    max-height: 5.625rem;
  }

  &:hover {
    cursor: pointer;
  }

  @media (max-width: ${MOBILE_SIZE_PX + "px"}) {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    aspect-ratio: 1 / 1;

    & .wrapper__image {
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
      aspect-ratio: 1 / 1;
    }
  }
`;
