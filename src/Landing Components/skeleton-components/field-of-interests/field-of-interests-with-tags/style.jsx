import styled from "@emotion/styled";

import { down } from "../../../../_utils/breakpoints";
import { SkeletonAnimationContainer } from "../../style";

export const Container = styled(SkeletonAnimationContainer)`
  &.skeleton__tags {
    max-width: 50rem;
  }

  @media ${down("S")} {
    &.skeleton__tags {
      overflow-x: hidden;
    }
  }
`;
