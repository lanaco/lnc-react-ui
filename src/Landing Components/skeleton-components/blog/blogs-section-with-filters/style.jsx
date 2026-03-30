import styled from "@emotion/styled";

import { down } from "../../../../_utils/breakpoints";
import { SkeletonAnimationColumnContainer } from "../../style";

export const Container = styled(SkeletonAnimationColumnContainer)`
  @media ${down("S")} {
    & .skeleton__tags {
      & > div {
        width: 100%;
      }
    }

    & .skeleton__cards {
      flex-direction: column;
    }
  }
`;
