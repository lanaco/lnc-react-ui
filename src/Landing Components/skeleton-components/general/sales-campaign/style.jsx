import styled from "@emotion/styled";

import { down } from "../../../../_utils/breakpoints";
import { SkeletonAnimationContainer } from "../../style";

export const Container = styled(SkeletonAnimationContainer)`
  @media ${down("S")} {
    flex-direction: column;

    & .skeleton__square {
      width: 100%;
      height: 100%;
    }

    & > div {
      &:not(:first-of-type) {
        display: none;
      }
    }
  }
`;
