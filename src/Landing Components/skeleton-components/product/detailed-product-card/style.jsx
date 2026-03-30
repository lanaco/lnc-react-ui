import styled from "@emotion/styled";

import { down } from "../../../../_utils/breakpoints";
import { SkeletonAnimationContainer } from "../../style";

export const Container = styled(SkeletonAnimationContainer)`
  @media ${down("S")} {
    & > div {
      &:nth-of-type(even) {
        display: none;
      }
    }
  }
`;
