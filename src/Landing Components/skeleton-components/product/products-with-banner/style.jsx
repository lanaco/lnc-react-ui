import styled from "@emotion/styled";

import { down } from "../../../../_utils/breakpoints";
import { SkeletonAnimationColumnContainer } from "../../style";

export const Container = styled(SkeletonAnimationColumnContainer)`
  @media ${down("S")} {
    & .skeleton__banner {
      height: 100%;
      aspect-ratio: 1 / 1;
    }
  }
`;
