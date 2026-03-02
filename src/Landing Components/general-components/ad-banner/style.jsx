import styled from "@emotion/styled";

import { down } from "../../../_utils/breakpoints";

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

  @media ${down("S")} {
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
